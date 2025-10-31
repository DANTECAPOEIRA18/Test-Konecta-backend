import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { AuthService } from '../../application/auth/auth.service';
import { UserAuthDto } from './dto/user-auth.dto';

@ApiTags('users')
@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly auth: AuthService) {}

  @Post('register')
  @ApiCreatedResponse({ description: 'User registered' })
  async register(@Body() dto: UserAuthDto) {
    const { user, access_token } = await this.auth.register(dto.username, dto.password);
    return { id: user.id, username: user.username, access_token };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'User logged in' })
  async login(@Body() dto: UserAuthDto) {
    const { user, access_token } = await this.auth.validateAndLogin(dto.username, dto.password);
    return { id: user.id, username: user.username, access_token };
  }
}
