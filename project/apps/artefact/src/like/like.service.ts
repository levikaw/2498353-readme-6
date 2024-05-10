import { ConflictException, Injectable } from '@nestjs/common';
import { LikeAccessEntity, LikeAccessRepository, LikeInterface } from '@project/like-access';
import { LIKE_EXCEPTION } from '@project/constants/exception-messages';

@Injectable()
export class LikeService {
  constructor(private readonly likeAccessRepository: LikeAccessRepository) {}

  public async countByPostId(postId: string): Promise<number> {
    return this.likeAccessRepository.countByPostId(postId);
  }

  public async createLike(postId: string, userId: string): Promise<LikeInterface> {
    const existsLike = await this.likeAccessRepository.findOneByPostIdUserId(postId, userId);
    if (existsLike) {
      throw new ConflictException(LIKE_EXCEPTION.EXISTS);
    }

    return this.likeAccessRepository.save(new LikeAccessEntity({ postId, userId }));
  }

  public async deleteLikeById(id: string): Promise<void> {
    await this.likeAccessRepository.deleteById(id);
  }
  public async findLikeById(id: string): Promise<LikeAccessEntity> {
    return this.likeAccessRepository.findById(id);
  }
}
