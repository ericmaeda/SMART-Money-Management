import { Inject, Injectable } from "@nestjs/common";
import { BUDGET_REPOSITORY, IBudgetRepository } from "src/domain/repositories/budget.repository.interface";

@Injectable()
export class CreateBudgetUseCase {
    constructor(
        @Inject(BUDGET_REPOSITORY)
        private readonly budgetRepo: IBudgetRepository
    ) {}
}