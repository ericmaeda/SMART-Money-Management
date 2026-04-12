import { TransactionEntity, CreateTransactionProps, TransactionStatus, TransactionType } from "../entities/transaction.entity";

export interface UpdateTransactionProps {
  description?: string;
  status?: TransactionStatus;
}

export interface SumByCategoryFilter {
  userId: string;
  categoryId: string;
  month: string;           // format YYYY-MM
  type: TransactionType;
  status: TransactionStatus;
}

export interface ITransactionRepository {   
  findById(id: string): Promise<TransactionEntity | null>;
  findAllByUserId(userId: string): Promise<TransactionEntity[]>;
  save(entity: TransactionEntity): Promise<TransactionEntity>;
  update(id: string, data: UpdateTransactionProps): Promise<TransactionEntity>;
  delete(id: string): Promise<void>;
  sumByCategory(filter: SumByCategoryFilter): Promise<number>;
}

export const TRANSACTION_REPOSITORY = Symbol('TRANSACTION_REPOSITORY');