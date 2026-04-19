import { Inject, Injectable } from "@nestjs/common";
import { BUDGET_REPOSITORY, IBudgetRepository } from "src/domain/repositories/budget.repository.interface";
import { DeleteBudgetDto } from "../../dto/budget/delete-budget.dto";

@Injectable()
export class DeleteBudgetUseCase {
    constructor(
        @Inject(BUDGET_REPOSITORY)
        private readonly budgetRepo: IBudgetRepository
    ) {}

    async execute(dto: DeleteBudgetDto) {
        
    }
}