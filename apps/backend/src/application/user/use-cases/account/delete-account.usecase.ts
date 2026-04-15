import { ForbiddenException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ACCOUNT_REPOSITORY, IAccountRepository } from "src/domain/repositories/account.repository.interface";
import { DeleteAccountDto } from "../../dto/account/delete-account.dto";
import { Prisma } from "generated/prisma";
import { NotFoundError } from "rxjs";

@Injectable()
export class DeleteAccountUseCase {
    constructor(
        @Inject(ACCOUNT_REPOSITORY)
        private readonly accountRepo: IAccountRepository
    ) {}

    async execute(dto: DeleteAccountDto): Promise<void> {
        const account = await this.accountRepo.findById(dto.account_id);

        if (!account) {
            throw new NotFoundException(`Account not found!`)
        }
        if (account.user_id !== dto.user_id) {
            throw new ForbiddenException(`This account does not belong to you!`)
        }

        await this.accountRepo.delete(dto.account_id);
    }
}