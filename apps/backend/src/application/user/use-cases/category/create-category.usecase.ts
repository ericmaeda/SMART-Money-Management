import { Inject, Injectable } from "@nestjs/common";
import { CATEGORY_REPOSITORY, ICategoryRepository } from "src/domain/repositories/category.repository.interface";
import { CreateCategoryDto } from "../../dto/category/create-category.dto";
import { CategoryEntity, CategoryPublicProps } from "src/domain/entities/category.entity";
import { createId } from "@paralleldrive/cuid2";

@Injectable()
export class CreateCategoryUseCase {
    constructor(
        @Inject(CATEGORY_REPOSITORY)
        private readonly categoryRepo: ICategoryRepository
    ) {}

    async execute(dto: CreateCategoryDto): Promise<CategoryPublicProps> {
        const entity = CategoryEntity.create(
            {
                user_id: dto.user_id,
                name: dto.name,
                type: dto.type
            },
            createId(),
            new Date()
        );

        const saved = await this.categoryRepo.save(entity);

        return saved.toPublic();
    }
}