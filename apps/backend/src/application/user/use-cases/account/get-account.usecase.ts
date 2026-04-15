import { Inject, Injectable } from "@nestjs/common";
import { ACCOUNT_REPOSITORY, IAccountRepository } from "src/domain/repositories/account.repository.interface";
import { GetAccountDto } from "../../dto/account/get-account.dto";
import { AccountEntity, AccountPublicProps } from "src/domain/entities/account.entity";

@Injectable()
export class GetAccountUseCase {
    constructor(
        @Inject(ACCOUNT_REPOSITORY)
        private readonly accountRepo: IAccountRepository
    ) {}

    async execute(dto: GetAccountDto): Promise<AccountPublicProps[]> {
        const account = await this.accountRepo.findAllByUserId(dto.user_id);
        return account.map((a) => a.toPublic());
    }
}