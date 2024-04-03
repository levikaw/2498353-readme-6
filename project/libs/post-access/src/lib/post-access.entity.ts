import { BaseEntity, StorableEntity } from '@project/core';
import { PostStatus } from './types/base/post-status.enum';
import { PostType } from './types/base/post-type.enum';
import { CommonPost } from './types/common-post.interface';
import { LinkPost } from './types/link-post.interface';
import { PhotoPost } from './types/photo-post.interface';
import { QuotePost } from './types/quote-post.interface';
import { TextPost } from './types/text-post.interface';
import { VideoPost } from './types/video-post.interface';

export class PostAccessEntity extends BaseEntity implements StorableEntity<CommonPost> {
  constructor(post?: CommonPost) {
    super();
    this.populate(post);
  }

  /** Тип публиции */
  public type?: PostType;

  /** Пользователь */
  public userId?: string;

  /** Название публиции */
  public name?: string;

  /** Ссылка */
  public link?: string;

  /** Идентификатор файла для фотографии */
  public fileId?: string;

  /** Теги */
  public tags?: string[];

  /** Статус */
  public status?: PostStatus;

  /** Идентификатор публикаци, с которой был сделан репост */
  public reposted?: string;

  /** Автор публикации */
  public author?: string;

  /** Текст публикации */
  public text?: string;

  /** Анонс публикации */
  public announcement?: string;

  public populate(post?: CommonPost): void {
    if (!post) {
      return;
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
    this.status = post.status;
    this.reposted = post.reposted;
    this.author = post.author;
    this.text = post.text;
    this.announcement = post.announcement;
  }

  /**
   * Преобразование из PostAccessEntity в объект
   * @returns {CommonPost}
   */
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
      status: this.status,
      reposted: this.reposted,
      author: this.author,
      text: this.text,
      announcement: this.announcement,
    };
  }

  /**
   * Преобразование из PostAccessEntity в объект типа ссылка
   * @returns {LinkPost}
   */
  public toOLinkbject(): LinkPost {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
      userId: this.userId,
      type: this.type,
      link: this.link,
      tags: this.tags,
      status: this.status,
      reposted: this.reposted,
    };
  }

  /**
   * Преобразование из PostAccessEntity в объект типа цитата
   * @returns {QuotePost}
   */
  public toQuoteObject(): QuotePost {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
      userId: this.userId,
      type: this.type,
      tags: this.tags,
      status: this.status,
      reposted: this.reposted,
      author: this.author,
      text: this.text,
    };
  }

  /**
   * Преобразование из PostAccessEntity в объект типа текст
   * @returns {TextPost}
   */
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
      status: this.status,
      reposted: this.reposted,
      text: this.text,
      announcement: this.announcement,
    };
  }

  /**
   * Преобразование из PostAccessEntity в публикацию типа видео
   * @returns {VideoPost}
   */
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
      status: this.status,
      reposted: this.reposted,
    };
  }

  /**
   * Преобразование из PostAccessEntity в публикацию типа фото
   * @returns {PhotoPost}
   */
  public toPhotoObject(): PhotoPost {
    return {
      userId: this.userId,
      type: this.type,
      fileId: this.fileId,
      tags: this.tags,
      status: this.status,
      reposted: this.reposted,
    };
  }
}
