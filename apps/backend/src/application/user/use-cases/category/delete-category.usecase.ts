import { ForbiddenException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CATEGORY_REPOSITORY, ICategoryRepository } from "src/domain/repositories/category.repository.interface";
import { DeleteCategoryDto } from "../../dto/category/delete-category.dto";

@Injectable()
export class DeleteCategoryUseCase {
    constructor(
        @Inject(CATEGORY_REPOSITORY)
        private readonly categoryRepo: ICategoryRepository
    ) {}

    async execute(dto: DeleteCategoryDto): Promise<void> {
        const category = await this.categoryRepo.findById(dto.category_id);

        if (!category) {
            throw new NotFoundException(`Category with id ${dto.category_id} not found!`);
        }

        if (category.id !== dto.category_id) {
            throw new ForbiddenException(`This category does not belong to you!`)
        }

        await this.categoryRepo.delete(dto.category_id);
    }
}