import { Injectable } from '@nestjs/common';
import { BasePostgresRepository } from '@project/core';
import { PrismaService } from '@project/prisma';
import { LikeAccessEntity } from './like-access.entity';
import { LikeAccessFactory } from './like-access.factory';

@Injectable()
export class LikeAccessRepository extends BasePostgresRepository<LikeAccessEntity> {
  constructor(entityFactory: LikeAccessFactory, readonly dataSource: PrismaService) {
    super(entityFactory, dataSource);
  }

  public async save(entity: LikeAccessEntity): Promise<LikeAccessEntity> {
    return this.dataSource.like
      .create({
        data: entity.toObject(),
      })
      .then((resp) => this.entityFactory.createEntity(resp));
  }

  public async deleteById(id: string): Promise<void> {
    await this.dataSource.like.delete({
      where: {
        id,
      },
    });
  }
  public async findById(id: string): Promise<LikeAccessEntity> {
    return this.dataSource.like
      .findUnique({
        where: {
          id,
        },
      })
      .then((resp) => this.entityFactory.createEntity(resp));
  }

  public async findOneByPostIdUserId(postId: string, userId: string): Promise<LikeAccessEntity> {
    return this.dataSource.like
      .findFirst({
        where: {
          userId,
          postId,
        },
      })
      .then((resp) => this.entityFactory.createEntity(resp));
  }

  public async countByPostId(postId: string): Promise<number> {
    return this.dataSource.like.count({ where: { postId } });
  }
}
