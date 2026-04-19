import { Inject, Injectable } from "@nestjs/common";
import { ITransactionRepository, TRANSACTION_REPOSITORY } from "src/domain/repositories/transaction.repository.interface";
import { DeleteTransactionDto } from "../../dto/transaction/delete-transaction.dto";

@Injectable()
export class DeleteTransactionUseCase {
    constructor(
        @Inject(TRANSACTION_REPOSITORY)
        private readonly transactionRepo: ITransactionRepository
    ) {}

    async execute(dto: DeleteTransactionDto) {
        
    }
}