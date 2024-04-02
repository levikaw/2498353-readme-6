import { User } from './user.interface';

/** Набор полей аутентифицированного пользователя */
export interface AuthUser extends User {
  passwordHash: string;
}
