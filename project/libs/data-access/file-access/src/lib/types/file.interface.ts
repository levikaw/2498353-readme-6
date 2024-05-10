import { BaseEntityInterface } from '@project/core';

export interface FileInterface extends BaseEntityInterface {
  name: string;
  userId: string;
  mimetype: string;
  size: number;
}
