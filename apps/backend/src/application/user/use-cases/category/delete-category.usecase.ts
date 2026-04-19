import { Inject, Injectable } from "@nestjs/common";
import { CATEGORY_REPOSITORY, ICategoryRepository } from "src/domain/repositories/category.repository.interface";
import { DeleteAccountDto } from "../../dto/account/delete-account.dto";

@Injectable()
export class DeleteCategoryUseCase {
    constructor(
        @Inject(CATEGORY_REPOSITORY)
        private readonly categoryRepo: ICategoryRepository
    ) {}

    async execute(dto: DeleteAccountDto) {
        
    }
}