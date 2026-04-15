import { ForbiddenException, Inject, Injectable, NotFoundException } from "@nestjs/common";
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
        const user = await this.userRepo.findByEmail(dto.email);

        if (!user) {
            throw new NotFoundException(`User not found! Please do registration first`)
        }

        const passwordValidity = await bcrypt.compare(dto.password, user.password);

        if (!passwordValidity) {
            throw new ForbiddenException(`Username or password does not match!`)
        }

        const payload = {
            sub: user.id, 
            email: user.email
        };

        const accessToken = this.jwtService.sign(payload);

        return {
            accessToken,
            user: user.toPublic()
        }
    }
}