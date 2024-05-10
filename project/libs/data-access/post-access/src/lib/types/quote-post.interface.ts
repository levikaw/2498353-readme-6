import { BasePostInterface } from './base/base-post.interface';

export interface QuotePostInterface extends BasePostInterface {
  author?: string;
  text?: string;
}
