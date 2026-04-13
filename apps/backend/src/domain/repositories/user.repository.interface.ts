import { UserEntity } from "../entities/user.entity";

export interface UpdateUserProps {
  name?: string;
  password?: string;
}

export interface IUserRepository {
  findById(id: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
  save(entity: UserEntity): Promise<UserEntity>;
  update(id: string, data: UpdateUserProps): Promise<UserEntity>;
  delete(id: string): Promise<void>;
}

export const USER_REPOSITORY = Symbol('UserRepository');