import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../../infrastructure/auth/jwt.strategy';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt-auth.guard';
import { AuthController } from './auth.controller';
import { RegisterUseCase } from '../../application/auth/use-cases/register.usecase';
import { LoginUseCase } from '../../application/auth/use-cases/login.usecase';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { UserPrismaRepository } from '../../infrastructure/repositories/user.prisma-repo';
import { USER_REPOSITORY } from '../../domain/repositories/user.repository.interface';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN ?? '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    PrismaService,
    { provide: USER_REPOSITORY, useClass: UserPrismaRepository },
    RegisterUseCase,
    LoginUseCase,
    JwtStrategy,
    JwtAuthGuard,
  ],
  exports: [JwtAuthGuard, JwtStrategy], // di-export supaya bisa dipakai module lain
})
export class AuthModule {}