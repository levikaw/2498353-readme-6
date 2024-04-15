import { Injectable } from '@nestjs/common';
import { BasePostgresRepository } from '@project/data-access';
import { PostAccessEntity } from './post-access.entity';
import { PostAccessFactory } from './post-access.factory';
import { PrismaService } from '@project/prisma';
import { convertToPrismaFilter } from './post-access.filter';
import { CommonPost } from './types/common-post.interface';
import { UpdateCommonnPost } from './types/update-common-post.interface';

@Injectable()
export class PostAccessRepository extends BasePostgresRepository<PostAccessEntity> {
  constructor(entityFactory: PostAccessFactory, readonly dataSource: PrismaService) {
    super(entityFactory, dataSource);
  }

  public async save(entity: PostAccessEntity): Promise<PostAccessEntity> {
    return this.dataSource.post
      .create({
        data: entity.toObject(),
      })
      .then((resp) => this.entityFactory.createEntity(resp));
  }

  public async findById(id: string): Promise<PostAccessEntity> {
    return this.dataSource.post
      .findUnique({
        where: {
          id,
        },
      })
      .then((resp) => this.entityFactory.createEntity(resp));
  }

  public async deleteById(id: string): Promise<void> {
    await this.dataSource.post.delete({
      where: {
        id,
      },
    });
  }

  public async update(entity: UpdateCommonnPost): Promise<void> {
    await this.dataSource.post.update({
      where: { id: entity.id },
      data: entity,
    });
  }

  public async findManyBy(where?: Partial<CommonPost>, skip?: number, take?: number): Promise<PostAccessEntity[]> {
    return this.dataSource.post
      .findMany({
        where: convertToPrismaFilter(where),
        skip,
        take,
      })
      .then((resp) => resp.map((c) => this.entityFactory.createEntity(c)));
  }
}
