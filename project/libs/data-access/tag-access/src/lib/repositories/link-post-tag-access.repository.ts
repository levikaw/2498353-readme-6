import { Injectable } from '@nestjs/common';
import { BasePostgresRepository } from '@project/core';
import { PrismaService } from '@project/prisma';
import { LinkPostTagAccessEntity } from '../entities/link-post-tag-access.entity';
import { LinkPostTagAccessFactory } from '../factories/link-post-tag-access.factory';

@Injectable()
export class LinkPostTagAccessRepository extends BasePostgresRepository<LinkPostTagAccessEntity> {
  constructor(entityFactory: LinkPostTagAccessFactory, readonly dataSource: PrismaService) {
    super(entityFactory, dataSource);
  }

  public async save(entity: LinkPostTagAccessEntity): Promise<LinkPostTagAccessEntity> {
    return this.dataSource.linkPostTag
      .create({
        data: entity.toObject(),
      })
      .then((links) => this.entityFactory.createEntity(links));
  }

  public async deleteById(id: string): Promise<void> {
    await this.dataSource.linkPostTag.delete({
      where: {
        id,
      },
    });
  }

  public async findManyByPostsIds(ids: string[]): Promise<LinkPostTagAccessEntity[]> {
    return this.dataSource.linkPostTag
      .findMany({
        where: {
          postId: {
            in: ids,
          },
        },
      })
      .then((links) => links.map((link) => this.entityFactory.createEntity(link)));
  }

  public async findManyByTagsIds(ids: string[]): Promise<LinkPostTagAccessEntity[]> {
    return this.dataSource.linkPostTag
      .findMany({
        where: {
          tagId: {
            in: ids,
          },
        },
      })
      .then((links) => links.map((link) => this.entityFactory.createEntity(link)));
  }
}
