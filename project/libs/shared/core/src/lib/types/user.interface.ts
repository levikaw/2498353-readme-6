import { UserRole } from './user-role.enum';
import 'multer';
import { BaseInterface } from '../base/base.interface';

/** Набор полей пользователя */
export interface User extends BaseInterface {
  /** Адрес электронной почты */
  email: string;

  /** Имя пользователя */
  login: string;

  /** Аватар */
  avatar?: Express.Multer.File | null;

  /** Роль (разрешения в системе) */
  role: UserRole;
}
