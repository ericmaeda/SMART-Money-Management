import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/infrastructure/auth/jwt.strategy';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt-auth.guard';
import { AuthController } from './auth.controller';
import { RegisterUseCase } from 'src/application/user/use-cases/auth/register.usecase';
import { LoginUseCase } from 'src/application/user/use-cases/auth/login.usecase';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { USER_REPOSITORY } from '../../domain/repositories/user.repository.interface';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: 60 * 60 * 24 * 7 },
    }),
  ],
  controllers: [AuthController],
  providers: [
    PrismaService,
    { provide: USER_REPOSITORY, useClass: UserRepository },
    RegisterUseCase,
    LoginUseCase,
    JwtStrategy,
    JwtAuthGuard,
  ],
  exports: [JwtAuthGuard, JwtStrategy], // di-export supaya bisa dipakai module lain
})
export class AuthModule {}