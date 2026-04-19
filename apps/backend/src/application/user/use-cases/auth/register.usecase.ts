import { Injectable, Inject, ConflictException } from "@nestjs/common";
import { ACCOUNT_REPOSITORY } from "src/domain/repositories/account.repository.interface";
import { IUserRepository } from "src/domain/repositories/user.repository.interface";
import { RegisterDto } from "../../dto/auth/register.dto";
import * as bcrypt from 'bcrypt';
import { UserEntity } from "src/domain/entities/user.entity";
import { hash } from "crypto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class RegisterUseCase {
    constructor(
        @Inject(ACCOUNT_REPOSITORY)
        private readonly userRepo: IUserRepository,
        private readonly jwtService: JwtService
    ) {}

    async execute(dto: RegisterDto) {
        const existingEmail = await this.userRepo.findByEmail(dto.email);
        if (existingEmail) {
            throw new ConflictException(`Email already registered!`)
        }

        const hashedPassword = await bcrypt.hash(dto.password, 10);

        const user = UserEntity.create(
            {
                email: dto.email,
                name: dto.name,
                password: hashedPassword
            },
            crypto.randomUUID(),
            new Date()
        );

        const saveUser = await this.userRepo.save(user);

        const accessToken = this.jwtService.sign({
            sub: saveUser.id,
            email: saveUser.email
        });

        return {
            user: saveUser.toPublic(),
            accessToken,
        };
    }
}