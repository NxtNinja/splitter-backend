import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthAuthDto, RegisterAuthDto } from './dto/create-auth.dto';
import { comparePasswords, hashPassword } from 'src/utils/bcrypt';
import { Tokens } from 'src/utils/types';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async getToken(userID: string, email: string): Promise<Tokens> {
    const access_token = await this.jwtService.signAsync(
      {
        sub: userID,
        email: email,
      },
      {
        secret: 'access_token_secret',
        expiresIn: 60 * 15,
      },
    );

    return {
      access_token: access_token,
    };
  }

  async signup(createAuthDto: RegisterAuthDto): Promise<Tokens> {
    const password = await hashPassword(createAuthDto.password); // hash password
    //create user
    const newuser = await this.prisma.user.create({
      data: {
        ...createAuthDto,
        password,
      },
    });

    return await this.getToken(newuser.id, newuser.email);
  }

  async login(loginAuthDto: LoginAuthAuthDto): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: loginAuthDto.email,
      },
    });
    if (!user) {
      throw new UnauthorizedException('Incorrect email');
    }
    const isPasswordCorrect = await comparePasswords(
      loginAuthDto.password,
      user.password,
    );

    console.log(isPasswordCorrect);

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Incorrect password');
    }
    return await this.getToken(user.id, user.email);
  }
}
