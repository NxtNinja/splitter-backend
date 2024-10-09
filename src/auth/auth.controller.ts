import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthAuthDto, RegisterAuthDto } from './dto/create-auth.dto';
import { Response } from 'express';
import { Tokens } from 'src/utils/types';
import { Public } from './common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  async signup(
    @Body() createAuthDto: RegisterAuthDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Tokens> {
    const token = await this.authService.signup(createAuthDto);

    res.setHeader('set-cookie', [
      `session_token=${token.access_token}; HttpOnly; SameSite=lax`,
    ]);

    return token;
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginAuthDto: LoginAuthAuthDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Tokens> {
    const token = await this.authService.login(loginAuthDto);

    res.setHeader('set-cookie', [
      `session_token=${token.access_token}; HttpOnly; SameSite=lax`,
    ]);

    return token;
  }
}
