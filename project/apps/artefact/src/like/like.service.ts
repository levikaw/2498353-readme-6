import { ConflictException, Injectable } from '@nestjs/common';
import { QueryParamsDto } from '@project/common';
import { LikeAccessEntity, LikeAccessRepository, UserLike } from '@project/like-access';
import { LIKE_EXCEPTION_MESSAGES } from './constants';
import { CreateLikeDto } from './dto/create-like.dto';

@Injectable()
export class LikeService {
  constructor(private readonly likeAccessRepository: LikeAccessRepository) {}

  public async findLikeByPostId(params?: QueryParamsDto<UserLike>): Promise<UserLike[]> {
    return this.likeAccessRepository.findManyBy(params).then((resp) => resp.map((c) => c.toObject()));
  }

  public async countBy(where?: QueryParamsDto<UserLike>['filter']): Promise<number> {
    return this.likeAccessRepository.countBy(where);
  }

  public async createLike(like: CreateLikeDto): Promise<UserLike> {
    const existLike = await this.likeAccessRepository.findOneByPostIdUserId(like.postId, like.userId);
    if (existLike) {
      throw new ConflictException(LIKE_EXCEPTION_MESSAGES.EXISTS);
    }

    return this.likeAccessRepository.save(new LikeAccessEntity(like)).then((resp) => resp.toObject());
  }

  public async deleteLikeByPostIdUserId(postId: string, userId: string): Promise<void> {
    const like = await this.likeAccessRepository.findOneByPostIdUserId(postId, userId);
    if (!like) {
      throw new Error(LIKE_EXCEPTION_MESSAGES.NOT_FOUND);
    }

    await this.likeAccessRepository.deleteById(like.toObject().id);
  }
}
