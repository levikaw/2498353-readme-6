import { Injectable } from '@nestjs/common';
import { BasePostgresRepository } from '@project/core';
import { PrismaService } from '@project/prisma';
import { CommentAccessEntity } from './comment-access.entity';
import { CommentAccessFactory } from './comment-access.factory';
import { calculateSkip } from '@project/common';

@Injectable()
export class CommentAccessRepository extends BasePostgresRepository<CommentAccessEntity> {
  constructor(entityFactory: CommentAccessFactory, readonly dataSource: PrismaService) {
    super(entityFactory, dataSource);
  }

  public async save(entity: CommentAccessEntity): Promise<CommentAccessEntity> {
    return this.dataSource.comment
      .create({
        data: entity.toObject(),
      })
      .then((resp) => this.entityFactory.createEntity(resp));
  }

  public async deleteById(id: string): Promise<void> {
    await this.dataSource.comment.delete({
      where: {
        id,
      },
    });
  }

  public async findById(id: string): Promise<CommentAccessEntity> {
    return this.dataSource.comment
      .findUnique({
        where: {
          id,
        },
      })
      .then((resp) => this.entityFactory.createEntity(resp));
  }

  public async findManyByPostId(postId: string, page: number): Promise<CommentAccessEntity[]> {
    return this.dataSource.comment
      .findMany({
        where: { postId },
        skip: calculateSkip(page, 50),
        take: 50,
        orderBy: {
          createdAt: 'desc',
        },
      })
      .then((comments) => comments.map((comment) => this.entityFactory.createEntity(comment)));
  }

  public async countByPostId(postId: string): Promise<number> {
    return this.dataSource.comment.count({ where: { postId } });
  }
}
