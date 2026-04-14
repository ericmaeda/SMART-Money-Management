import { NotFoundException } from "@nestjs/common";
import { Account, Prisma } from "../../../generated/prisma";
import { AccountEntity } from "../../domain/entities/account.entity";
import { IAccountRepository, UpdateAccountProps } from "../../domain/repositories/account.repository.interface";
import { PrismaService } from "../database/prisma.service";

export class AccountRepository implements IAccountRepository {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    async findById(id: string): Promise<AccountEntity | null> {
        const account = await this.prisma.account.findUnique({ where: { id } });

        if (!account) {
            return null;
        }

        return this.toEntity(account);
    }

    async findAllByUserId(user_id: string): Promise<AccountEntity[]> {
        const accounts = await this.prisma.account.findMany({ where: { user_id } });

        return accounts.map((a) => this.toEntity(a));
    }

    async save(entity: AccountEntity): Promise<AccountEntity> {
        const account = await this.prisma.account.create({
            data: {
                id: entity.id,
                user_id: entity.user_id,
                name: entity.name,
                balance: entity.balance,
                createdAt: entity.createdAt
            }
        });

        return this.toEntity(account);
    }

    async update(id: string, data: UpdateAccountProps): Promise<AccountEntity> {
        const account = await this.prisma.account.update({
            where: { id: id },
            data: {
                name: data.name
            }
        });

        return this.toEntity(account);
    }

    async updateBalance(id: string, newBalance: number): Promise<AccountEntity> {
        const account = await this.prisma.account.update({ 
            where: { id: id },
            data: {
                balance: newBalance
            } 
        });

        return this.toEntity(account);
    }

    async delete(id: string): Promise<void> {
        try {
            await this.prisma.account.delete({ where: { id: id } });
        } 
        catch (e: any) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2025') {
                    throw new NotFoundException(`Account with id ${id} not found`)
                }
            }
            throw e;
        }
    }

    private toEntity(raw: Account): AccountEntity {
        return AccountEntity.reconstitute({
            id: raw.id,
            user_id: raw.user_id,
            name: raw.name,
            balance: raw.balance,
            createdAt: raw.createdAt
        });
    }
}