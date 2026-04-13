import { CategoryEntity } from "../entities/category.entity";

export interface UpdateCategoryProps {
    name?: string;
}

export interface ICategoryRepository {
    findById(id: string): Promise<CategoryEntity | null>;
    findAllByUserId(user_id: string): Promise<CategoryEntity[]>;
    save(entity: CategoryEntity): Promise<CategoryEntity>;
    update(id: string, data: UpdateCategoryProps): Promise<CategoryEntity>;
    delete(id: string): Promise<void>;
}

export const CATEGORY_REPOSITORY = Symbol('CATEGORY_REPOSITORY');