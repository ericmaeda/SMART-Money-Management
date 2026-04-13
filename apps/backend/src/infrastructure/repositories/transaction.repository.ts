import { NotFoundException } from "@nestjs/common";
import { Prisma, Transaction } from "../../../generated/prisma";
import { TransactionEntity } from "../../domain/entities/transaction.entity";
import { ITransactionRepository, SumByCategoryFilter, UpdateTransactionProps } from "../../domain/repositories/transaction.repository.interface";
import { PrismaService } from "../database/prisma.service";

export class TransactionRepository implements ITransactionRepository {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    async findById(id: string): Promise<TransactionEntity | null> {
        const transaction = await this.prisma.transaction.findUnique({ where: { id } });

        if (!transaction) {
            return null;
        }

        return TransactionEntity.reconstitute({
            id: transaction.id,
            user_id: transaction.user_id,
            account_id: transaction.account_id,
            category_id: transaction.category_id,
            amount: transaction.amount,
            type: transaction.type,
            status: transaction.status,
            date: transaction.date,
            description: transaction.description,
            createdAt: transaction.createdAt
        })
    }

    async findAllByUserId(userId: string): Promise<TransactionEntity[]> {
        const transactions = await this.prisma.transaction.findMany({ 
            where: { user_id: userId },
            orderBy: { date: 'desc' }
        });

        return transactions.map((t) => this.toEntity(t));
    }

    async save(entity: TransactionEntity): Promise<TransactionEntity> {
        const transaction = await this.prisma.transaction.create({
            data: {
                id: entity.id,
                user_id: entity.userId,
                account_id: entity.accountId,
                category_id: entity.categoryId,
                amount: entity.amount,
                type: entity.type,
                status: entity.status,
                date: entity.date,
                description: entity.description,
                createdAt: entity.createdAt
            }
        });

        return TransactionEntity.reconstitute({
            id: transaction.id,
            user_id: transaction.user_id,
            account_id: transaction.account_id,
            category_id: transaction.category_id,
            amount: transaction.amount,
            type: transaction.type,
            status: transaction.status,
            date: transaction.date,
            description: transaction.description,
            createdAt: transaction.createdAt
        })
    }

    async update(id: string, data: UpdateTransactionProps): Promise<TransactionEntity> {
        const transaction = await this.prisma.transaction.update({
            where: { id: id },
            data: {
                description: data.description,
                status: data.status
            }
        })

        return TransactionEntity.reconstitute({
            id: transaction.id,
            user_id: transaction.user_id,
            account_id: transaction.account_id,
            category_id: transaction.category_id,
            amount: transaction.amount,
            type: transaction.type,
            status: transaction.status,
            date: transaction.date,
            description: transaction.description,
            createdAt: transaction.createdAt
        });
    }

    async delete(id: string): Promise<void> {
        try {
            await this.prisma.transaction.delete({ where: { id: id } });
        }
        catch (e: any) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code == 'P2025') {
                    throw new NotFoundException(`Transaction with id ${id} not found`);
                }
            }
            throw e;
        }   
    }

    async sumByCategory(filter: SumByCategoryFilter): Promise<number> {
        const total = await this.prisma.transaction.aggregate({
            where: {
                user_id: filter.user_id,
                category_id: filter.category_id,
                type: filter.type,
                status: filter.status
            },
            _sum: { amount: true },
        });

        return total._sum.amount ?? 0;
    }

    private toEntity(raw: Transaction): TransactionEntity {
        return TransactionEntity.reconstitute({
            id: raw.id,
            user_id: raw.id,
            account_id: raw.account_id,
            category_id: raw.category_id,
            amount: raw.amount,
            type: raw.type,
            status: raw.status,
            description: raw.description,
            date: raw.date,
            createdAt: raw.createdAt
        })
    }
}