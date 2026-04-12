import { UserEntity, CreateUserProps } from "../entities/user.entity";

export interface IUpdateUserProps {
  name?: string;
  password?: string;
}

export interface IUserRepository {
  findById(id: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
  save(props: CreateUserProps, id: string, createdAt: Date): Promise<UserEntity>;
  update(id: string, data: IUpdateUserProps): Promise<UserEntity>;
}

export const USER_REPOSITORY = Symbol('UserRepository');