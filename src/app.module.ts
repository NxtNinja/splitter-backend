import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
// import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [PrismaModule],
  //   providers: [
  //     {
  //       provide: APP_GUARD,
  //       useClass: AccessTokenGuard,
  //     },
  //   ],
})
export class AppModule {}
