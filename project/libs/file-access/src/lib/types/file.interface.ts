import { BaseInterface } from '@project/core';

export interface UserFile extends BaseInterface {
  name: string;
  content: string;
  userId: string;
}
