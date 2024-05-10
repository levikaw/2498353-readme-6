import { NullableEnum } from '@project/common';
import { PostTypeEnum } from './base/post-type.enum';

export interface PostFilterInterface {
  name?: string;
  userId?: string[];
  tags?: string[];
  type?: PostTypeEnum;
  publishedAt?: Date | NullableEnum;
}
