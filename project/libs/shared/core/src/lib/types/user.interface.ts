import { UserRole } from './user-role.enum';

/** Набор полей пользователя */
export interface User {
  /** Идентификатор */
  id?: string;

  /** Адрес электронной почты */
  email: string;

  /** Имя */
  firstname: string;

  /** Фамилия */
  lastname: string;

  /** Дата рождения */
  dateOfBirth: Date;

  /** Роль (разрешения в системе) */
  role: UserRole;
}
