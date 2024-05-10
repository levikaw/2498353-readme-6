import { BasePostInterface } from './base/base-post.interface';

export interface LinkPostInterface extends BasePostInterface {
  text?: string;
  link?: string;
}
