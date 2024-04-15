import { compare, genSalt, hash } from 'bcrypt';
import { BaseEntity } from '@project/core';
import { StorableEntity } from '@project/core';
import 'multer';
import { SALT_ROUNDS } from './constants';
import { AuthUser } from './types/auth-user.interface';
import { UserRole } from '@prisma/client';
import { isNotEmpty } from 'class-validator';

export class UserAccessEntity extends BaseEntity implements StorableEntity<AuthUser> {
  constructor(user: AuthUser) {
    super();

    if (!isNotEmpty(user)) {
      return undefined;
    }

    this.id = user.id;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;

    this.email = user.email;
    this.avatar = user.avatar;
    this.passwordHash = user.passwordHash;
    this.role = user.role;
    this.login = user.login;
  }

  public email: string;
  public login: string;
  public avatar?: string;
  public role: UserRole;
  public passwordHash: string;

  public toObject(): AuthUser {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      email: this.email,
      avatar: this.avatar,
      login: this.login,
      role: this.role,
      passwordHash: this.passwordHash,
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
