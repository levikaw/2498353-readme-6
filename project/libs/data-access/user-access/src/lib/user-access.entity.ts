import { compare, genSalt, hash } from 'bcrypt';
import { BaseEntity, StorableEntity } from '@project/core';
import { SALT_ROUNDS } from './constants';
import { AuthUser } from './types/auth-user.interface';
import { UserRole } from '@prisma/client';

export class UserAccessEntity extends BaseEntity implements StorableEntity<AuthUser> {
  constructor(user: AuthUser) {
    super();

    this.id = user.id;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.notifiedAt = user.notifiedAt;

    this.email = user.email;
    this.avatar = user.avatar;
    this.passwordHash = user.passwordHash;
    this.role = user.role;
    this.login = user.login;
    this.refreshToken = user.refreshToken;
  }

  public email: string;
  public login: string;
  public avatar?: string;
  public role: UserRole;
  public passwordHash: string;
  public refreshToken: string;
  public notifiedAt?: Date;

  public toObject(): AuthUser {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      notifiedAt: this.notifiedAt,
      email: this.email,
      avatar: this.avatar,
      login: this.login,
      role: this.role,
      passwordHash: this.passwordHash,
      refreshToken: this.refreshToken,
    };
  }

  public async createPassword(password: string): Promise<UserAccessEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}
