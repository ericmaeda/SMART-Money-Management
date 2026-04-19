import { Body, Controller, Post } from "@nestjs/common";
import { LoginDto } from "src/application/user/dto/auth/login.dto";
import { RegisterDto } from "src/application/user/dto/auth/register.dto";
import { LoginUseCase } from "src/application/user/use-cases/auth/login.usecase";
import { RegisterUseCase } from "src/application/user/use-cases/auth/register.usecase";


@Controller('auth')
export class AuthController {
    constructor(
        private readonly registerUseCase: RegisterUseCase,
        private readonly loginUseCase: LoginUseCase
    ) {}

    @Post('register')
    register(@Body() dto: RegisterDto) {
        return this.registerUseCase.execute(dto);
    }

    @Post('login')
    login(@Body() dto: LoginDto) {
        return this.loginUseCase.execute(dto);
    }
}