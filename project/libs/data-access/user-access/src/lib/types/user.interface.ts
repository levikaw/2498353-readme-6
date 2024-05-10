import { UserRoleEnum } from './user-role.enum';
import { BaseEntityInterface } from '@project/core';

export interface UserInterface extends BaseEntityInterface {
  email: string;
  userName: string;
  avatar?: string;
  role: UserRoleEnum;
}
