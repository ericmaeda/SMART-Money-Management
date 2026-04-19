export interface CreateBudgetDto {
    user_id: string;
    category_id: string;
    limitAmount: number;
    month: number;
}