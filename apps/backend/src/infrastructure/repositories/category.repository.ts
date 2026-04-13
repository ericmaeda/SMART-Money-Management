import { CategoryEntity } from "../../domain/entities/category.entity";
import { ICategoryRepository, UpdateCategoryProps } from "../../domain/repositories/category.repository.interface";
import { PrismaService } from "../database/prisma.service";
import { Budget, Category, Prisma } from "../../../generated/prisma";
import { NotFoundException } from "@nestjs/common";

export class CategoryRepository implements ICategoryRepository {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    async findById(id: string): Promise<CategoryEntity | null> {
        const category = await this.prisma.category.findUnique({ where: { id } });

        if (!category) {
            return null;
        }

        return CategoryEntity.reconstitute({
            id: category.id,
            user_id: category.user_id,
            name: category.name,
            type: category.type,
            createdAt: category.createdAt
        });
    }

    async findAllByUserId(user_id: string): Promise<CategoryEntity[]> {
        const categories = await this.prisma.category.findMany({ where: { user_id: user_id } })

        return categories.map((c) => this.toEntity(c));
    }

    async save(entity: CategoryEntity): Promise<CategoryEntity> {
        const category = await this.prisma.category.create({
            data: {
                id: entity.id,
                user_id: entity.user_id,
                name: entity.name,
                type: entity.type,
                createdAt: entity.createdAt
            }
        });

        return CategoryEntity.reconstitute({
            id: category.id,
            user_id: category.user_id,
            name: category.name,
            type: category.type,
            createdAt: category.createdAt
        });
    }

    async update(id: string, data: UpdateCategoryProps): Promise<CategoryEntity> {
        const category = await this.prisma.category.update({ 
            where: { id: id },
            data: {
                name: data.name
            }
         });

         return CategoryEntity.reconstitute({
            id: category.id,
            user_id: category.user_id,
            name: category.name,
            type: category.type,
            createdAt: category.createdAt
         });
    }

    async delete(id: string): Promise<void> {
        try {
            await this.prisma.category.delete({ where: { id: id } });
        }
        catch (e: any) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2025') {
                    throw new NotFoundException(`Category with id ${id} not found`)
                }
            }
            throw e;
        }
    }

    private toEntity(raw: Category): CategoryEntity {
        return CategoryEntity.reconstitute({
            id: raw.id,
            user_id: raw.user_id,
            name: raw.name,
            type: raw.type,
            createdAt: raw.createdAt
        });
    }
}