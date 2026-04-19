import { TransactionType } from "generated/prisma";
import { TransactionStatus } from "generated/prisma";

export interface CreateTransactionDto {
    user_id: string;
    account_id: string;
    category_id: string;
    amount: number;
    type: TransactionType
    description?: string;
    status?: TransactionStatus
    date: Date;
}