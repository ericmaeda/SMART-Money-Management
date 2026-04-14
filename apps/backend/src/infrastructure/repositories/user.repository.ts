import { Injectable, NotFoundException } from "@nestjs/common";
import { UserEntity } from "../../domain/entities/user.entity";
import { UpdateUserProps, IUserRepository } from "../../domain/repositories/user.repository.interface";
import { PrismaService } from "../database/prisma.service";
import { Prisma, User } from "../../../generated/prisma";

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    async findById(id: string): Promise<UserEntity | null> {
        const user = await this.prisma.user.findUnique({ where: { id } });

        if (!user) {
            return null;
        }

        return this.toEntity(user);
    }
    
    async findByEmail(email: string): Promise<UserEntity | null> {
        const user = await this.prisma.user.findUnique({ where: { email } });

        if (!user) {
            return null;
        }

        return this.toEntity(user);
    }

    async save(entity: UserEntity): Promise<UserEntity> {
        const user = await this.prisma.user.create({
            data: {
                id: entity.id,
                email: entity.email,
                name: entity.name,
                password: entity.password,
                createdAt: entity.createdAt
            },
        })

        return this.toEntity(user);
    }

    async update(id: string, data: UpdateUserProps): Promise<UserEntity> {
        const user = await this.prisma.user.update({
            where: { id: id },
            data: {
                name: data.name,
                password: data.password
            },
        });

        return this.toEntity(user);
    }

    async delete(id: string): Promise<void> {
        try {
            await this.prisma.user.delete({ where: { id: id } })
        }
        catch (e: any) {
            if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025') {
                throw new NotFoundException(`User with id ${id} not found`);
            }
            throw e;
        }
    }

    private toEntity(raw: User) {
        return UserEntity.reconstitute({
            id: raw.id,
            email: raw.email,
            name: raw.name,
            password: raw.password,
            createdAt: raw.createdAt
        });
    }
}
