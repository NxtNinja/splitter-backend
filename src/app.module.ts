import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
// import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './auth/common/guards/access.guard';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
})
export class AppModule {}
