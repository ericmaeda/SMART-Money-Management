import { Inject, Injectable } from "@nestjs/common";
import { BUDGET_REPOSITORY, IBudgetRepository } from "src/domain/repositories/budget.repository.interface";
import { CreateBudgetDto } from "../../dto/budget/create-budget.dto";
import { BudgetEntity, BudgetPublicProps } from "src/domain/entities/budget.entity";
import { createId } from "@paralleldrive/cuid2";

@Injectable()
export class CreateBudgetUseCase {
    constructor(
        @Inject(BUDGET_REPOSITORY)
        private readonly budgetRepo: IBudgetRepository
    ) {}

    async execute(dto: CreateBudgetDto): Promise<BudgetPublicProps> {
        const entity = BudgetEntity.create(
            {
                user_id: dto.user_id,
                category_id: dto.category_id,
                limitAmount: dto.limitAmount,
                month: dto.month
            },
            createId(),
            new Date()
        );

        const saved = await this.budgetRepo.save(entity);

        return saved.toPublic();
    }
}