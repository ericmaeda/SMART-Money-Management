import { TransactionType } from "./transaction.entity";

export interface CreateCategoryProps {
    userId: string;
    name: string;
    type: TransactionType;
}

export interface CategoryPublicProps {
    id: string;
    name: string;
    type: TransactionType;
    createdAt: Date;
}

export class CategoryEntity {
    constructor(
        private readonly _id: string,
        private readonly _userId: string,
        private readonly _name: string,
        private readonly _type: TransactionType,
        private readonly _createdAt: Date
    ) {}


    // getter
    get id() {
        return this._id;
    }

    get userId() {
        return this._userId;
    }

    get name() {
        return this._name;
    }

    get type() {
        return this._type;
    }

    get createdAt() {
        return this._createdAt;
    }


    // business rules
    isIncome(): boolean {
        return this._type === 'INCOME';
    }

    isExpense(): boolean {
        return this._type ===  'EXPENSE';
    }

    canHaveBudget(): boolean {
        return this._type === TransactionType.EXPENSE;
    }


    //output
    toPublic(): CategoryPublicProps {
        return {
            id: this._id,
            name: this._name,
            type: this._type,
            createdAt: this._createdAt
        }
    }


    //factories
    static create(props: CreateCategoryProps, id: string, createdAt: Date): CreateCategoryProps {
        if (!props.name.trim()) {
            throw new Error('Category name cannot be empty!')
        }

        return new CategoryEntity(
            id,
            props.userId,
            props.name.trim(),
            props.type,
            createdAt
        );
    }

    static reconstitute(props: CategoryPublicProps & { userId: string }): CategoryEntity {
        return new CategoryEntity(
            props.id,
            props.userId,
            props.name,
            props.type,
            props.createdAt
        );
    }
}
