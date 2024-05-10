import { BasePostInterface } from './base/base-post.interface';

export interface VideoPostInterface extends BasePostInterface {
  name?: string;
  link?: string;
}
