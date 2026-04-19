import { Inject, Injectable } from "@nestjs/common";
import { CATEGORY_REPOSITORY, ICategoryRepository } from "src/domain/repositories/category.repository.interface";
import { CreateAccountDto } from "../../dto/account/create-account.dto";

@Injectable()
export class CreateCategoryUseCase {
    constructor(
        @Inject(CATEGORY_REPOSITORY)
        private readonly categoryRepo: ICategoryRepository
    ) {}

    async execute(dto: CreateAccountDto) {
        
    }
}