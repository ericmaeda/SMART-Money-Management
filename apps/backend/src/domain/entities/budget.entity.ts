export enum BudgetStatus {
    UNDER = 'UNDER',
    WARNING = 'WARNING',
    OVER = 'OVER'
}

export interface CreateBudgetProps {
    userId: string;
    categoryId: string;
    limitAmount: number;
    month: string; // format "YYYY-MM"
}

export interface BudgetPublicProps {
    id: string;
    categoryId: string;
    limitAmount: number;
    month: string;
    createdAt: Date;
}

export class BudgetEntity {
    constructor (
        private readonly _id: string,
        private readonly _userId: string,
        private readonly _categoryId: string,
        private readonly _limitAmount: number,
        private readonly _month: string,
        private readonly _createdAt: Date
    ) {}

    // Getters
    get id() {
        return this._id;
    }

    get userId() {
        return this._userId;
    }

    get categoryId() {
        return this._categoryId;
    }

    get limitAmount() {
        return this._limitAmount;
    }

    get month() {
        return this._month;
    }

    get createdAt() {
        return this._createdAt;
    }

    // Business rules
    remaining(totalSpent: number): number {
        return this._limitAmount - totalSpent;
    }

    getStatus(totalSpent: number): BudgetStatus {
        const ratio = totalSpent / this._limitAmount;
        if (ratio > 1) {
            return BudgetStatus.OVER;
        }
        if (ratio >= 0.8) {
            return BudgetStatus.WARNING;
        }
        return BudgetStatus.OVER;
    }

    isOver(totalSpent: number): boolean {
        return totalSpent > this._limitAmount;
    }

    isWarning(totalSpent: number): boolean {
        return this.getStatus(totalSpent) === BudgetStatus.WARNING;
    }

    // Output
    toPublic(): BudgetPublicProps {
        return {
            id: this._id,
            categoryId: this._categoryId,
            limitAmount: this._limitAmount,
            month: this._month,
            createdAt: this._createdAt
        };
    }

    toPublicWithSummary(totalSpent: number): BudgetPublicProps & {
        totalSpent: number;
        remaining: number;
        status: BudgetStatus;
    } {
        return {
            ...this.toPublic(),
            totalSpent,
            remaining: this.remaining(totalSpent),
            status: this.getStatus(totalSpent)
        };
    }

    static isValidMonth(month: string): boolean {
        return /^\d{4}-(0[1-9]|1[0-2])$/.test(month);
    }

    static isValidLimitAmount(amount: number): boolean {
        return amount > 0;
    }

    // Factories
    static create(props: CreateBudgetProps, id: string, createdAt: Date): BudgetEntity {
        if (!BudgetEntity.isValidMonth(props.month)) {
            throw new Error('Invalid month format. Expected YYYY-MM')
        }

        if (!BudgetEntity.isValidLimitAmount(props.limitAmount)) {
            throw new Error('Limit amount must be a positive value!')
        }

        return new BudgetEntity(
            id,
            props.userId,
            props.categoryId,
            props.limitAmount,
            props.month,
            createdAt
        );
    }

    static reconstitute(props: BudgetPublicProps & { userId: string }): BudgetEntity {
        return new BudgetEntity(
            props.id,
            props.userId,
            props.categoryId,
            props.limitAmount,
            props.month,
            props.createdAt
        );
    }
}