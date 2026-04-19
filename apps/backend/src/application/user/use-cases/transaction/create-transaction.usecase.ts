import { Inject, Injectable } from "@nestjs/common";
import { ITransactionRepository, TRANSACTION_REPOSITORY } from "src/domain/repositories/transaction.repository.interface";

@Injectable()
export class CreateTransactionUseCase {
    constructor(
        @Inject(TRANSACTION_REPOSITORY)
        private readonly transactionRepo: ITransactionRepository
    ) {}

    async execute() {}
}