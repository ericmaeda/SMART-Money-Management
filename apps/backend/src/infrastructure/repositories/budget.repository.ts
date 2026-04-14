import { NotFoundException } from "@nestjs/common";
import { BudgetEntity } from "../../domain/entities/budget.entity";
import { IBudgetRepository, UpdateBudgetProps } from "../../domain/repositories/budget.repository.interface";
import { PrismaService } from "../database/prisma.service";
import { Budget, Prisma } from "../../../generated/prisma";

export class BudgetRepository implements IBudgetRepository {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    async findById(id: string): Promise<BudgetEntity | null> {
        const budget = await this.prisma.budget.findUnique({ where: { id } });

        if (!budget) {
            return null;
        }

        return this.toEntity(budget);
    }

    async findAllByUserId(user_id: string): Promise<BudgetEntity[]> {
        const budgets = await this.prisma.budget.findMany({ where: {user_id: user_id} });
        
        return budgets.map((b) => this.toEntity(b));
    }

    async findByUserCategoryMonth(user_id: string, category_id: string, month: string): Promise<BudgetEntity | null> {
        const budget = await this.prisma.budget.findUnique({
            where: { 
                user_id_category_id_month: {
                    user_id: user_id,
                    category_id: category_id,
                    month: month
                }
            }
        });

        if (!budget) {
            return null;
        }

        return this.toEntity(budget);
    }

    async save(entity: BudgetEntity): Promise<BudgetEntity> {
        const budget = await this.prisma.budget.create({
            data: {
                id: entity.id,
                user_id: entity.user_id,
                category_id: entity.category_id,
                limitAmount: entity.limitAmount,
                month: entity.month,
                createdAt: entity.createdAt
            }
        });

        return this.toEntity(budget);
    }

    async update(id: string, data: UpdateBudgetProps): Promise<BudgetEntity> {
        const budget = await this.prisma.budget.update({
            where: { id: id },
            data: {
                limitAmount: data.limitAmount
            }
        });

        return this.toEntity(budget);
    }

    async delete(id: string): Promise<void> {
        try {
            await this.prisma.budget.delete({ where: { id: id } });
        }
        catch (e: any) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2025') {
                    throw new NotFoundException(`Budget with id ${id} not found`)
                }
            }
            throw e;
        }
    }

    private toEntity(raw: Budget): BudgetEntity {
        return BudgetEntity.reconstitute({
            id: raw.id,
            user_id: raw.user_id,
            category_id: raw.category_id,
            limitAmount: raw.limitAmount,
            month: raw.month,
            createdAt: raw.createdAt
        });
    }
}