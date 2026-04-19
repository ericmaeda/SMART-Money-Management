import { TransactionType } from "generated/prisma";

export interface CreateCategoryDto {
    user_id: string;
    name: string;
    type: TransactionType
}