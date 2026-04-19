import { Injectable, Inject } from "@nestjs/common";
import { ACCOUNT_REPOSITORY, IAccountRepository } from "../../../../domain/repositories/account.repository.interface";
import { CreateAccountDto } from "../../dto/account/create-account.dto";
import { AccountEntity, AccountPublicProps } from "../../../../domain/entities/account.entity";
import { createId } from '@paralleldrive/cuid2';

@Injectable()
export class CreateAccountUseCase {
    constructor(
        @Inject(ACCOUNT_REPOSITORY)
        private readonly accountRepo: IAccountRepository
    ) {}

    async execute(dto: CreateAccountDto): Promise<AccountPublicProps> {
        const entity = AccountEntity.create(
            { 
                user_id: dto.user_id, 
                name: dto.name 
            },
            createId(),
            new Date()
        );

        const saved = await this.accountRepo.save(entity);

        return saved.toPublic();
    }
}