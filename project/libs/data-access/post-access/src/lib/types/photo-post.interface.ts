import { BasePostInterface } from './base/base-post.interface';

export interface PhotoPostInterface extends BasePostInterface {
  fileId?: string;
}
