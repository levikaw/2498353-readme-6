import { BaseEntityInterface } from '@project/core';

export interface UserFile extends BaseEntityInterface {
  name: string;
  userId: string;
  mimetype: string;
  size: number;
}
