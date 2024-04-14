import { BaseEntity, StorableEntity } from '@project/core';
import { PostType } from '@prisma/client';
import { CommonPost } from './types/common-post.interface';
import { LinkPost } from './types/link-post.interface';
import { PhotoPost } from './types/photo-post.interface';
import { QuotePost } from './types/quote-post.interface';
import { TextPost } from './types/text-post.interface';
import { VideoPost } from './types/video-post.interface';
import { isNotEmpty } from 'class-validator';

export class PostAccessEntity extends BaseEntity implements StorableEntity<CommonPost> {
  constructor(post: CommonPost) {
    super();

    if (!isNotEmpty(post)) {
      return undefined;
    }

    this.id = post.id;
    this.createdAt = post.createdAt;
    this.updatedAt = post.updatedAt;
    this.deletedAt = post.deletedAt;

    this.userId = post.userId;
    this.type = post.type;
    this.name = post.name;
    this.link = post.link;
    this.fileId = post.fileId;
    this.tags = post.tags;
    this.isPublished = post.isPublished;
    this.repostedFromPostId = post.repostedFromPostId;
    this.isReposted = post.isReposted;
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
  public isPublished?: boolean;
  public repostedFromPostId?: string;
  public isReposted?: boolean;
  public author?: string;
  public text?: string;
  public announcement?: string;

  public toObject(): CommonPost {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
      userId: this.userId,
      type: this.type,
      name: this.name,
      link: this.link,
      fileId: this.fileId,
      tags: this.tags,
      isPublished: this.isPublished,
      repostedFromPostId: this.repostedFromPostId,
      isReposted: this.isReposted,
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
      deletedAt: this.deletedAt,
      userId: this.userId,
      type: this.type,
      link: this.link,
      tags: this.tags,
      isPublished: this.isPublished,
      repostedFromPostId: this.repostedFromPostId,
      isReposted: this.isReposted,
    };
  }

  public toQuoteObject(): QuotePost {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
      userId: this.userId,
      type: this.type,
      tags: this.tags,
      isPublished: this.isPublished,
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
      deletedAt: this.deletedAt,
      userId: this.userId,
      type: this.type,
      name: this.name,
      tags: this.tags,
      isPublished: this.isPublished,
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
      deletedAt: this.deletedAt,
      userId: this.userId,
      type: this.type,
      name: this.name,
      link: this.link,
      tags: this.tags,
      isPublished: this.isPublished,
      repostedFromPostId: this.repostedFromPostId,
    };
  }

  public toPhotoObject(): PhotoPost {
    return {
      userId: this.userId,
      type: this.type,
      fileId: this.fileId,
      tags: this.tags,
      isPublished: this.isPublished,
      repostedFromPostId: this.repostedFromPostId,
    };
  }
}
