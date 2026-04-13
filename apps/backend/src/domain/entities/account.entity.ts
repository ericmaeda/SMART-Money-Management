export interface CreateAccountProps {
    user_id: string;
    name: string;
}

export interface AccountPublicProps {
    id: string;
    name: string;
    balance: number;
    createdAt: Date;
}

export class AccountEntity {
    constructor(
        private readonly _id: string,
        private readonly _user_id: string,
        private readonly _name: string,
        private readonly _balance: number,
        private readonly _createdAt: Date
    ) {}

    // Getters
    get id() {
        return this._id;
    }

    get user_id() {
        return this._user_id;
    }

    get name() {
        return this._name;
    }

    get balance() {
        return this._balance;
    }

    get createdAt() {
        return this._createdAt;
    }

    // Business rules
    isSufficientBalance(amount: number): boolean {
        return this._balance >= amount;
    }

    canWithdraw(amount: number): boolean {
        return this.isSufficientBalance(amount) && amount > 0;
    }

    // Action
    credit(amount: number): AccountEntity {
        if (amount <= 0) {
            throw new Error('Credit amount must be positive')
        }
        return new AccountEntity(
            this._id,
            this._user_id,
            this._name,
            this._balance + amount,
            this._createdAt
        );
    }

    debit(amount: number): AccountEntity {
        if (amount <= 0) {
            throw new Error('Debit amount must be positive')
        }

        if (!this.canWithdraw(amount)) {
            throw new Error('Insufficient balance')
        }

        return new AccountEntity(
            this._id,
            this._user_id,
            this._name,
            this._balance - amount,
            this._createdAt
        );
    }

    // output
    toPublic(): AccountPublicProps {
        return {
            id: this._id,
            name: this._name,
            balance: this._balance,
            createdAt: this._createdAt
        }
    }

    // factories
    static create(props: CreateAccountProps, id: string, createdAt: Date): AccountEntity {
        if (!props.name.trim()) {
            throw new Error('Account name cannot be empty')
        }

        return new AccountEntity(
            id,
            props.user_id,
            props.name.trim(),
            0,
            createdAt
        );
    }

    static reconstitute(props: AccountPublicProps & { user_id: string }): AccountEntity {
        return new AccountEntity(
            props.id,
            props.user_id,
            props.name,
            props.balance,
            props.createdAt
        );
    }
}