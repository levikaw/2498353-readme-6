import { Injectable } from '@nestjs/common';
import { BasePostgresRepository } from '@project/core';
import { PostAccessEntity } from './post-access.entity';
import { PostAccessFactory } from './post-access.factory';
import { PrismaService } from '@project/prisma';
import { calculateSkip } from '@project/common';
import { convertToPrismaFilter } from './utils/convert-to-prisma-filter';
import { UpdateCommonPostInterface } from './types/update-common-post.interface';
import { CommonPostInterface } from './types/common-post.interface';
import { PostFilterInterface } from './types/post-filter.interface';

@Injectable()
export class PostAccessRepository extends BasePostgresRepository<PostAccessEntity> {
  constructor(entityFactory: PostAccessFactory, readonly dataSource: PrismaService) {
    super(entityFactory, dataSource);
  }

  public async save(entity: PostAccessEntity): Promise<PostAccessEntity> {
    return this.dataSource.post
      .create({ data: entity.toObject() })
      .then((resp) => this.entityFactory.createEntity(resp as CommonPostInterface));
  }

  public async findById(id: string): Promise<PostAccessEntity> {
    return this.dataSource.post
      .findUnique({
        where: {
          id,
        },
      })
      .then((post) => this.entityFactory.createEntity(post as CommonPostInterface));
  }

  public async deleteById(id: string): Promise<void> {
    await this.dataSource.post.delete({
      where: {
        id,
      },
    });
  }

  public async update(entity: UpdateCommonPostInterface): Promise<void> {
    await this.dataSource.post.update({
      where: { id: entity.id },
      data: entity,
    });
  }

  public async updateAndReturn(entity: UpdateCommonPostInterface): Promise<PostAccessEntity> {
    return await this.dataSource.post
      .update({
        where: { id: entity.id },
        data: entity,
      })
      .then((post) => this.entityFactory.createEntity(post as CommonPostInterface));
  }

  public async findManyBy(filter: PostFilterInterface, page: number, limit: number): Promise<PostAccessEntity[]> {
    return this.dataSource.post
      .findMany({
        where: convertToPrismaFilter(filter),
        skip: calculateSkip(page, limit),
        take: limit,
        orderBy: { publishedAt: 'desc' },
      })
      .then((posts) => posts.map((post) => this.entityFactory.createEntity(post as CommonPostInterface)));
  }

  public async countBy(where: PostFilterInterface): Promise<number> {
    return this.dataSource.post.count({ where: convertToPrismaFilter(where) });
  }
}
