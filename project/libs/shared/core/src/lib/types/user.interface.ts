import { UserRole } from './user-role.enum';
import 'multer';

/** Набор полей пользователя */
export interface User {
  /** Идентификатор */
  id?: string;

  /** Адрес электронной почты */
  email: string;

  /** Имя пользователя */
  login: string;

  /** Аватар */
  avatar?: Express.Multer.File | null;

  /** Роль (разрешения в системе) */
  role: UserRole;
}
