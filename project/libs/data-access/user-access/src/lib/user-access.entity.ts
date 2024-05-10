import { compare, genSalt, hash } from 'bcrypt';
import { BaseEntity, StorableEntityInterface } from '@project/core';
import { SALT_ROUNDS } from '@project/constants/user-constant';
import { AuthUserInterface } from './types/auth-user.interface';
import { UserRoleEnum } from './types/user-role.enum';

export class UserAccessEntity extends BaseEntity implements StorableEntityInterface<AuthUserInterface> {
  constructor(user: AuthUserInterface) {
    super();

    this.id = user.id;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;

    this.email = user.email;
    this.avatar = user.avatar;
    this.passwordHash = user.passwordHash;
    this.role = user.role;
    this.userName = user.userName;
  }

  public email: string;
  public userName: string;
  public avatar?: string;
  public role: UserRoleEnum;
  public passwordHash: string;

  public toObject(): AuthUserInterface {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      email: this.email,
      avatar: this.avatar,
      userName: this.userName,
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
