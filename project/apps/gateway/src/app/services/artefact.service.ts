import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PaginationResponseDto } from '@project/common';
import { GATEWAY_ALIAS } from '@project/configuration';
import {
  ArtefactDto,
  ArtefactsCountDto,
  CommentDto,
  CreateCommentDto,
  GetTagsByPostsIdDto,
  SubscriptionDto,
  TagNameDto,
} from '@project/dtos/artefact-dto';
import { genAuthHeader, resolveData } from '../utils';

@Injectable()
export class ArtefactService {
  private readonly artefactBaseUrl: string;

  constructor(private readonly httpService: HttpService, private readonly configService: ConfigService) {
    this.artefactBaseUrl = configService.get<string>(`${GATEWAY_ALIAS}.artefactBaseUrl`);
  }
  public async getCommentsByPostId(postId: string, page: number): Promise<PaginationResponseDto<CommentDto[]>> {
    return this.httpService.axiosRef
      .get<PaginationResponseDto<CommentDto[]>>(`${this.artefactBaseUrl}/comment/${postId}/${page}`)
      .then(resolveData);
  }

  public async createCommentByPostId(comment: CreateCommentDto, postId: string, authHeader: string): Promise<CommentDto> {
    return this.httpService.axiosRef
      .post<CommentDto>(`${this.artefactBaseUrl}/comment/${postId}`, comment, genAuthHeader(authHeader))
      .then(resolveData);
  }

  public async deleteCommentById(id: string, authHeader: string): Promise<void> {
    return this.httpService.axiosRef.delete(`${this.artefactBaseUrl}/comment/${id}`, genAuthHeader(authHeader)).then(resolveData);
  }
  public async createLike(postId: string, authHeader: string): Promise<ArtefactDto> {
    return this.httpService.axiosRef
      .post<ArtefactDto>(`${this.artefactBaseUrl}/like/${postId}`, null, genAuthHeader(authHeader))
      .then(resolveData);
  }
  public async deleteLikeById(id: string, authHeader: string): Promise<void> {
    return await this.httpService.axiosRef
      .delete(`${this.artefactBaseUrl}/like/${id}`, genAuthHeader(authHeader))
      .then(resolveData);
  }

  public async createSubscription(followingUserId: string, authHeader: string): Promise<SubscriptionDto> {
    return this.httpService.axiosRef
      .post<SubscriptionDto>(`${this.artefactBaseUrl}/subscription/${followingUserId}`, null, genAuthHeader(authHeader))
      .then(resolveData);
  }

  public async deleteSubscription(id: string, authHeader: string): Promise<void> {
    return this.httpService.axiosRef
      .delete(`${this.artefactBaseUrl}/subscription/${id}`, genAuthHeader(authHeader))
      .then(resolveData);
  }

  public async getLikesCountByPostId(postsIds: string[]): Promise<ArtefactsCountDto[]> {
    return this.httpService.axiosRef
      .get<ArtefactsCountDto[]>(`${this.artefactBaseUrl}/like`, {
        params: { postsIds },
      })
      .then(resolveData);
  }

  public async getSubscriptionsByUserId(userId: string): Promise<SubscriptionDto[]> {
    return this.httpService.axiosRef.get<SubscriptionDto[]>(`${this.artefactBaseUrl}/subscription/${userId}`).then(resolveData);
  }

  public async getCommentsCountByPostsId(postsIds: string[]): Promise<ArtefactsCountDto[]> {
    return this.httpService.axiosRef
      .get<ArtefactsCountDto[]>(`${this.artefactBaseUrl}/comment`, {
        params: { postsIds },
      })
      .then(resolveData);
  }

  public async getTagsByPostsIds(postsIds: string[]): Promise<GetTagsByPostsIdDto[]> {
    return this.httpService.axiosRef
      .get<GetTagsByPostsIdDto[]>(`${this.artefactBaseUrl}/tag/by-posts-ids`, {
        params: { postsIds },
      })
      .then(resolveData);
  }

  public async getPostsIdsByTagsNames(name: string): Promise<string[]> {
    return this.httpService.axiosRef
      .get<string[]>(`${this.artefactBaseUrl}/tag/by-tags-names`, {
        params: { names: [{ name }] },
      })
      .then(resolveData);
  }

  public async createTags(postId: string, authHeader: string, tags: TagNameDto[]): Promise<string[]> {
    return this.httpService.axiosRef
      .post<string>(`${this.artefactBaseUrl}/tag/${postId}`, tags, genAuthHeader(authHeader))
      .then(resolveData);
  }
  public async copyTags(source: string, target: string, authHeader: string): Promise<string[]> {
    return this.httpService.axiosRef
      .put<GetTagsByPostsIdDto[]>(`${this.artefactBaseUrl}/tag/copy/${source}/${target}`, null, genAuthHeader(authHeader))
      .then(resolveData);
  }
}
