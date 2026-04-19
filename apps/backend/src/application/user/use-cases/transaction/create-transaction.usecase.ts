import { Inject, Injectable } from "@nestjs/common";
import { ITransactionRepository, TRANSACTION_REPOSITORY } from "src/domain/repositories/transaction.repository.interface";
import { CreateTransactionDto } from "../../dto/transaction/create-transaction.dto";

@Injectable()
export class CreateTransactionUseCase {
    constructor(
        @Inject(TRANSACTION_REPOSITORY)
        private readonly transactionRepo: ITransactionRepository
    ) {}

    async execute(dto: CreateTransactionDto) {
        
    }
}