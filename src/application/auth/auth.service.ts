import { Inject, Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { IUserRepository } from '../../domain/users/user.repository';
import { User } from '../../domain/users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    @Inject('IUserRepository') private readonly users: IUserRepository,
  ) {}

  async register(username: string, password: string): Promise<{ user: User; access_token: string }> {
    const exists = await this.users.findByUsername(username);
    if (exists) throw new ConflictException('Username already taken');
    const hashed = await bcrypt.hash(password, 10);
    const user = await this.users.create({ username, password: hashed });
    return { user, access_token: await this.sign(user) };
  }

  async validateAndLogin(username: string, password: string): Promise<{ user: User; access_token: string }> {
    const user = await this.users.findByUsername(username);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw new UnauthorizedException('Invalid credentials');
    return { user, access_token: await this.sign(user) };
  }

  private async sign(user: User): Promise<string> {
    return this.jwt.signAsync({ sub: user.id, username: user.username });
  }
}
