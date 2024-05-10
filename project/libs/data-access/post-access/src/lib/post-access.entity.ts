import { BaseEntity, StorableEntityInterface } from '@project/core';
import { PostTypeEnum } from './types/base/post-type.enum';
import { CommonPostInterface } from './types/common-post.interface';

export class PostAccessEntity extends BaseEntity implements StorableEntityInterface<CommonPostInterface> {
  constructor(post: CommonPostInterface) {
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
    this.repostedFromPostId = post.repostedFromPostId;
    this.author = post.author;
    this.text = post.text;
    this.announcement = post.announcement;
  }

  public type: PostTypeEnum;
  public userId: string;
  public name?: string;
  public link?: string;
  public fileId?: string;
  public repostedFromPostId?: string;
  public author?: string;
  public text?: string;
  public announcement?: string;
  public publishedAt?: Date;

  public toObject(): CommonPostInterface {
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
      repostedFromPostId: this.repostedFromPostId,
      author: this.author,
      text: this.text,
      announcement: this.announcement,
    };
  }
}
