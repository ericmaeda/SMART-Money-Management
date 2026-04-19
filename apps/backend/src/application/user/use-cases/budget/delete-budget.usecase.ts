import { ForbiddenException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { BUDGET_REPOSITORY, IBudgetRepository } from "src/domain/repositories/budget.repository.interface";
import { DeleteBudgetDto } from "../../dto/budget/delete-budget.dto";

@Injectable()
export class DeleteBudgetUseCase {
    constructor(
        @Inject(BUDGET_REPOSITORY)
        private readonly budgetRepo: IBudgetRepository
    ) {}

    async execute(dto: DeleteBudgetDto): Promise<void> {
        const budget = await this.budgetRepo.findById(dto.budget_id);

        if (!budget) {
            throw new NotFoundException(`Budget with id ${dto.budget_id} not found!`)
        }

        if (budget.id !== dto.budget_id) {
            throw new ForbiddenException(`This budget does not belong to you!`)
        }

        await this.budgetRepo.delete(dto.budget_id);
    }
}