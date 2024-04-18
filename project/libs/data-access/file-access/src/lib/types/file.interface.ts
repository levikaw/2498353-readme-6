import { BaseEntityInterface } from '@project/core';

export interface UserFile extends BaseEntityInterface {
  name: string;
  content: string;
  userId: string;
}
