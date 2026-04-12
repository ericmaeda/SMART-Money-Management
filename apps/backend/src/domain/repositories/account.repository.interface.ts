import { AccountEntity } from "../entities/account.entity";

export interface UpdateAccountProps {
    name?: string;
}

export interface IAccountRepository {
    findById(id: string): Promise<AccountEntity | null>;
    findAllByUserId(userId: string): Promise<AccountEntity[]>;
    save(entity: AccountEntity): Promise<AccountEntity>;
    update(id: string, data: UpdateAccountProps): Promise<AccountEntity>;
    updateBalance(id: string, newBalance: number): Promise<AccountEntity>;
    delete(id: string): Promise<void>;
}

export const ACCOUNT_REPOSITORY = Symbol('ACCOUNT_REPOSITORY');