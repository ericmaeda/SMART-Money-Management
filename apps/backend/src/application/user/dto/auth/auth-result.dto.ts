import { UserPublicProps } from "src/domain/entities/user.entity";

export interface AuthResult {
    user: UserPublicProps;
    accessToken: string;
}