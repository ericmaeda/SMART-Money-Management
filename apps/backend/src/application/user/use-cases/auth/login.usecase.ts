import { ForbiddenException, Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { IUserRepository, USER_REPOSITORY } from "src/domain/repositories/user.repository.interface";
import { LoginDto } from "../../dto/auth/login.dto";
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginUseCase {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepo: IUserRepository,
        private readonly jwtService: JwtService
    ) {}

    async execute(dto: LoginDto) {
        const user = await this.userRepo.findById(dto.email);

        if (!user) {
            throw new UnauthorizedException(`Invalid credentials!`)
        }

        const isPasswordValid = await bcrypt.compare(dto.password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException(`Invalid credentials!`)
        }

        const accessToken = this.jwtService.sign({
            sub: user.id,
            email: user.email
        });

        return {
            user: user.toPublic(),
            accessToken
        };
    }
}