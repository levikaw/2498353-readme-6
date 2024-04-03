import { BaseInterface } from '../base/base.interface';

export interface UserFile extends BaseInterface {
  name: string;
  content: string;
  userId: string;
}
