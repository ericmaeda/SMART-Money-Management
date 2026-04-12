export interface CreateUserProps {
  email: string;
  name: string;
  password: string;
}

export interface UserPublicProps {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

export class UserEntity {
    constructor(
        private readonly _id: string,
        private readonly _email: string,
        private readonly _name: string,
        private readonly _password: string,
        private readonly _createdAt: Date,
    ) {}

    get id(): string {
        return this._id;
    }

    get email(): string {
        return this._email;
    }

    get name(): string {
        return this._name;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    // Business rule
    isValidEmail(): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this._email);
    }

    // Expose public data
    toPublic(): UserPublicProps {
        return {
        id: this._id,
        email: this._email,
        name: this._name,
        createdAt: this._createdAt,
        };
    }

  // Factory for NEW users
  static create(props: CreateUserProps, id: string, createdAt: Date): UserEntity {
    if (!props.email || !props.email.includes('@')) {
      throw new Error('Invalid email');
    }
    if (!props.name || props.name.trim().length === 0) {
      throw new Error('Name is required');
    }

    return new UserEntity(
      id,
      props.email.toLowerCase().trim(),
      props.name.trim(),
      props.password,
      createdAt,
    );
  }

    // Factory for EXISTING users (from DB)
    static reconstitute(props: {
        id: string;
        email: string;
        name: string;
        password: string;
        createdAt: Date;
    }): UserEntity {
        return new UserEntity(
        props.id,
        props.email,
        props.name,
        props.password,
        props.createdAt,
        );
    }
}