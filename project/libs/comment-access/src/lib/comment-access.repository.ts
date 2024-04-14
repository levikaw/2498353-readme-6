import { Injectable } from '@nestjs/common';
import { BasePostgresRepository } from '@project/data-access';
import { PrismaService } from '@project/prisma';
import { CommentAccessEntity } from './comment-access.entity';
import { CommentAccessFactory } from './comment-access.factory';

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

  public async findCommentsByPostId(postId: string, skip?: number, take?: number): Promise<CommentAccessEntity[]> {
    return this.dataSource.comment
      .findMany({
        where: {
          postId,
        },
        skip,
        take,
      })
      .then((resp) => resp.map((c) => this.entityFactory.createEntity(c)));
  }
}
