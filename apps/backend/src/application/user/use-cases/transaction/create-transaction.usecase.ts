import { Inject, Injectable } from "@nestjs/common";
import { ITransactionRepository, TRANSACTION_REPOSITORY } from "src/domain/repositories/transaction.repository.interface";
import { CreateTransactionDto } from "../../dto/transaction/create-transaction.dto";
import { TransactionEntity, TransactionPublicProps } from "src/domain/entities/transaction.entity";
import { createId } from "@paralleldrive/cuid2";

@Injectable()
export class CreateTransactionUseCase {
    constructor(
        @Inject(TRANSACTION_REPOSITORY)
        private readonly transactionRepo: ITransactionRepository
    ) {}

    async execute(dto: CreateTransactionDto): Promise<TransactionPublicProps> {
        const entity = TransactionEntity.create(
            {
                user_id: dto.user_id,
                account_id: dto.account_id,
                category_id: dto.category_id,
                amount: dto.amount,
                type: dto.type,
                description: dto.description,
                status: dto.status,
                date: dto.date
            },
            createId(),
            new Date()
        );

        const saved = await this.transactionRepo.save(entity);

        return saved.toPublic();
    }
}