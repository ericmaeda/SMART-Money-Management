import { TransactionType, TransactionStatus } from "../../../generated/prisma";

export interface CreateTransactionProps {
    user_id: string;
    account_id: string;
    category_id: string;
    amount: number;
    type: TransactionType;
    date: Date;
    description?: string;
    status?: TransactionStatus;
}

export interface TransactionPublicProps {
    id: string;
    user_id: string;
    account_id: string;
    category_id: string;
    amount: number;
    type: TransactionType;
    status: TransactionStatus;
    date: Date;
    description: string | null; 
    createdAt: Date;
}

export class TransactionEntity {
    constructor(
        private readonly _id: string,
        private readonly _user_id: string,
        private readonly _account_id: string,
        private readonly _category_id: string,
        private readonly _amount: number,
        private readonly _type: TransactionType,
        private readonly _description: string | null,
        private readonly _status: TransactionStatus,
        private readonly _date: Date,
        private readonly _createdAt: Date,
    ) {}

    // Getter
    get id(): string {
        return this._id;
    }

    get userId(): string {
        return this._user_id;
    }

    get accountId(): string {
        return this._account_id;
    }

    get categoryId(): string {
        return this._category_id;
    }

    get amount(): number {
        return this._amount;
    }

    get type(): TransactionType {
        return this._type;
    }

    get description(): string | null {
        return this._description;
    }
    
    get status(): TransactionStatus {
        return this._status;
    }
    get date(): Date {
        return this._date;
    }

    get createdAt(): Date {
        return this._createdAt;
    }


    // business rules
    isIncome(): boolean {
        return this._type === 'INCOME';
    }

    isExpense(): boolean {
        return this._type === 'EXPENSE';
    }

    isPending(): boolean {
        return this._status === 'PENDING';
    }

    canBeCancelled(): boolean {
        return this._status === 'PENDING';
    }

    // Action
    resolve(finalStatus: TransactionStatus): TransactionEntity {
        if (this._status !== 'PENDING') {
            throw new Error('Can only resolve PENDING transaction');
        }

        if (finalStatus === TransactionStatus.PENDING) {
            throw new Error('Cannot resolve to PENDING');
        }

        return new TransactionEntity(
            this._id,
            this._user_id,
            this._account_id,
            this._category_id,
            this._amount,
            this._type,
            this._description,
            finalStatus,
            this._date,
            this._createdAt
        );
    }

    //Output
    toPublic(): TransactionPublicProps {
        return {
            id: this._id,
            user_id: this._user_id,
            account_id: this._account_id,
            category_id: this._category_id,
            amount: this._amount,
            type: this._type,
            description: this._description,
            status: this._status,
            date: this._date,
            createdAt: this._createdAt
        };
    }

    // Factories
    static create(props: CreateTransactionProps, id: string, createdAt: Date) {
        if (props.amount <= 0) {
            throw new Error('Amount must be a positive value');
        }
        return new TransactionEntity(
            id,
            props.user_id,
            props.account_id,
            props.category_id,
            props.amount,
            props.type,
            props.description ?? null,
            props.status ?? TransactionStatus.PENDING,
            props.date,
            createdAt
        )
    }

    static reconstitute(props: TransactionPublicProps): TransactionEntity {
        return new TransactionEntity(
            props.id,
            props.user_id,
            props.account_id,
            props.category_id,
            props.amount,
            props.type,
            props.description,
            props.status,
            props.date,
            props.createdAt
        );
    }
}