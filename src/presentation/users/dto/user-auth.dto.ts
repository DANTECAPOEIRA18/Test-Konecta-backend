import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength } from 'class-validator';

export class UserAuthDto {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  username!: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  password!: string;
}
