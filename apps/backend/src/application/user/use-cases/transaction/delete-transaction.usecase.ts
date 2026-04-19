import { ForbiddenException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ITransactionRepository, TRANSACTION_REPOSITORY } from "src/domain/repositories/transaction.repository.interface";
import { DeleteTransactionDto } from "../../dto/transaction/delete-transaction.dto";

@Injectable()
export class DeleteTransactionUseCase {
    constructor(
        @Inject(TRANSACTION_REPOSITORY)
        private readonly transactionRepo: ITransactionRepository
    ) {}

    async execute(dto: DeleteTransactionDto): Promise<void> {
        const transaction = await this.transactionRepo.findById(dto.transaction_id);

        if (!transaction) {
            throw new NotFoundException(`Transaction with id ${dto.transaction_id} not found!`);
        }

        if (transaction.id !== dto.transaction_id) {
            throw new ForbiddenException(`This transaction does not belong to you!`)
        }

        await this.transactionRepo.delete(dto.transaction_id);
    }
}