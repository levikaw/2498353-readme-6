import { compare, genSalt, hash } from 'bcrypt';
import { BaseEntity } from '@project/core';
import { StorableEntity, AuthUser, UserRole } from '@project/core';
import 'multer';
import { SALT_ROUNDS } from '@project/constants';

export class UserAccountEntity extends BaseEntity implements StorableEntity<AuthUser> {
  constructor(user?: AuthUser) {
    super();
    this.populate(user);
  }

  /** Адрес электронной почты */
  public email: string;

  /** Имя пользователя */
  public login: string;

  /** Аватар */
  public avatar?: Express.Multer.File | null;

  /** Роль (разрешения в системе) */
  public role: UserRole;

  /** Хэш пароля */
  public passwordHash: string;

  public populate(user?: AuthUser): void {
    if (!user) {
      return;
    }

    this.id = this.id ?? '';
    this.email = user.email;
    this.avatar = user.avatar;
    this.passwordHash = user.passwordHash;
    this.role = user.role;
    this.login = user.login;
  }

  /**
   * Преобразование из UserAccountEntity в объект
   * @returns {AuthUser}
   */
  public toObject(): AuthUser {
    return Object.assign({}, this);
  }

  /**
   * Создание пароля пользователя
   * @param {string} password
   * @returns {Promise<UserAccountEntity>}
   */
  public async createPassword(password: string): Promise<UserAccountEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  /**
   * Сравнение паролей при аутентификации
   * @param {string} password
   * @returns {Promise<boolean>}
   */
  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}
