import { UserRole } from './user-role.enum';
import 'multer';
import { BaseInterface } from '@project/core';

export interface User extends BaseInterface {
  email: string;
  login: string;
  avatar?: Express.Multer.File | null;
  role: UserRole;
}
