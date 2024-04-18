import { ConflictException, Injectable } from '@nestjs/common';
import { LikeAccessEntity, LikeAccessRepository, UserLike } from '@project/like-access';
import { LIKE_EXCEPTION_MESSAGES } from './constants';
import { CreateLikeDto } from './dto/create-like.dto';

@Injectable()
export class LikeService {
  constructor(private readonly likeAccessRepository: LikeAccessRepository) {}

  public async findLikeByPostId(postId: string): Promise<UserLike[]> {
    return this.likeAccessRepository.findByPostId(postId).then((resp) => resp.map((c) => c.toObject()));
  }

  public async createLike(like: CreateLikeDto): Promise<UserLike> {
    const existLike = await this.likeAccessRepository.findByPostIdUserId(like.postId, like.userId);
    if (existLike) {
      throw new ConflictException(LIKE_EXCEPTION_MESSAGES.EXISTS);
    }

    return this.likeAccessRepository.save(new LikeAccessEntity(like)).then((resp) => resp.toObject());
  }

  public async deleteLikeByPostIdUserId(postId: string, userId: string): Promise<void> {
    const like = await this.likeAccessRepository.findByPostIdUserId(postId, userId);
    if (!like) {
      throw new Error(LIKE_EXCEPTION_MESSAGES.NOT_FOUND);
    }

    await this.likeAccessRepository.deleteById(like.toObject().id);
  }
}
