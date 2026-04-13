import { BudgetEntity } from "../entities/budget.entity";

export interface UpdateBudgetProps {
    limitAmount?: number;
}

export interface IBudgetRepository {
    findById(id: string): Promise<BudgetEntity | null>;
    findAllByUserId(user_id: string): Promise<BudgetEntity[]>;
    findByUserCategoryMonth(user_id: string, category_id: string, month: string): Promise<BudgetEntity | null>;
    save(entity: BudgetEntity): Promise<BudgetEntity>;
    update(id: string, data: UpdateBudgetProps): Promise<BudgetEntity>;
    delete(id: string): Promise<void>;
}

export const BUDGET_REPOSITORY = Symbol('BUDGET_REPOSITORY');