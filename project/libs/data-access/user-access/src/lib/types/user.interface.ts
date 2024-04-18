import { UserRole } from '@prisma/client';
import 'multer';
import { BaseEntityInterface } from '@project/core';

export interface User extends BaseEntityInterface {
  email: string;
  login: string;
  avatar?: string;
  role: UserRole;
}
