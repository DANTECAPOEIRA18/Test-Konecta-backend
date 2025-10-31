import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../../application/auth/auth.service';
import { UserRepository } from '../../shared/infraestructure/typeorm/repositories/user.repo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrmEntity } from '../../shared/infraestructure/typeorm/entities/user.orm-entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserOrmEntity]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET || 'secret',
        signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '1d' },
      }),
    }),
  ],
  providers: [{ provide: 'IUserRepository', useClass: UserRepository }, AuthService],
  exports: ['IUserRepository', JwtModule, AuthService],
})
export class AuthModule {}
