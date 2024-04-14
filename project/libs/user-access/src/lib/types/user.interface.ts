import { UserRole } from './user-role.enum';
import 'multer';
import { BaseEntityInterface } from '@project/core';

export interface User extends BaseEntityInterface {
  email: string;
  login: string;
  avatar?: Express.Multer.File | null;
  role: UserRole;
}
