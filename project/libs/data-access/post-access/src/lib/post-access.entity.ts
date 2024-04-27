import { BaseEntity, StorableEntity } from '@project/core';
import { PostType } from '@prisma/client';
import { CommonPost } from './types/common-post.interface';
import { LinkPost } from './types/link-post.interface';
import { PhotoPost } from './types/photo-post.interface';
import { QuotePost } from './types/quote-post.interface';
import { TextPost } from './types/text-post.interface';
import { VideoPost } from './types/video-post.interface';

export class PostAccessEntity extends BaseEntity implements StorableEntity<CommonPost> {
  constructor(post: CommonPost) {
    super();

    this.id = post.id;
    this.createdAt = post.createdAt;
    this.publishedAt = post.publishedAt;
    this.updatedAt = post.updatedAt;

    this.userId = post.userId;
    this.type = post.type;
    this.name = post.name;
    this.link = post.link;
    this.fileId = post.fileId;
    this.tags = post.tags;
    this.repostedFromPostId = post.repostedFromPostId;
    this.author = post.author;
    this.text = post.text;
    this.announcement = post.announcement;
  }

  public type: PostType;
  public userId: string;
  public name?: string;
  public link?: string;
  public fileId?: string;
  public tags?: string[];
  public repostedFromPostId?: string;
  public author?: string;
  public text?: string;
  public announcement?: string;
  public publishedAt?: Date;

  public toObject(): CommonPost {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      publishedAt: this.publishedAt,
      userId: this.userId,
      type: this.type,
      name: this.name,
      link: this.link,
      fileId: this.fileId,
      tags: this.tags,
      repostedFromPostId: this.repostedFromPostId,
      author: this.author,
      text: this.text,
      announcement: this.announcement,
    };
  }

  public toLinkObject(): LinkPost {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      userId: this.userId,
      type: this.type,
      link: this.link,
      tags: this.tags,
      repostedFromPostId: this.repostedFromPostId,
    };
  }

  public toQuoteObject(): QuotePost {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      userId: this.userId,
      type: this.type,
      tags: this.tags,
      repostedFromPostId: this.repostedFromPostId,
      author: this.author,
      text: this.text,
    };
  }

  public toTextObject(): TextPost {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      userId: this.userId,
      type: this.type,
      name: this.name,
      tags: this.tags,
      repostedFromPostId: this.repostedFromPostId,
      text: this.text,
      announcement: this.announcement,
    };
  }

  public toVideoObject(): VideoPost {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      userId: this.userId,
      type: this.type,
      name: this.name,
      link: this.link,
      tags: this.tags,
      repostedFromPostId: this.repostedFromPostId,
    };
  }

  public toPhotoObject(): PhotoPost {
    return {
      userId: this.userId,
      type: this.type,
      fileId: this.fileId,
      tags: this.tags,
      repostedFromPostId: this.repostedFromPostId,
    };
  }
}
