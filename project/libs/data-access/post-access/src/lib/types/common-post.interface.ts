import { VideoPostInterface } from './video-post.interface';
import { TextPostInterface } from './text-post.interface';
import { LinkPostInterface } from './link-post.interface';
import { PhotoPostInterface } from './photo-post.interface';
import { QuotePostInterface } from './quote-post.interface';

export interface CommonPostInterface
  extends VideoPostInterface,
    TextPostInterface,
    LinkPostInterface,
    PhotoPostInterface,
    QuotePostInterface {}
