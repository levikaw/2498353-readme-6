import { BasePostInterface } from './base/base-post.interface';

export interface TextPostInterface extends BasePostInterface {
  name?: string;
  announcement?: string;
  text?: string;
}
