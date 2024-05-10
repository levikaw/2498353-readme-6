import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PaginationResponseDto } from '@project/common';
import { GATEWAY_ALIAS } from '@project/configuration';

import { CommonPostDto, PostCatalogDto, Sort, UpdatePostDto, WritePostDto } from '@project/dtos/post-dto';
import { isNotEmpty } from 'class-validator';
import { PostFilterDto } from '@project/dtos/post-dto';
import { genAuthHeader, getLentaParams, renderLenta, resolveData } from '../utils';
import { ArtefactService } from './artefact.service';
import { FileService } from './file.service';
import { UserService } from './user.service';

@Injectable()
export class PostService {
  private readonly fileBaseUrl: string;
  private readonly postBaseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly artefactService: ArtefactService,
    private readonly userService: UserService,
    private readonly fileService: FileService,
  ) {
    this.fileBaseUrl = configService.get<string>(`${GATEWAY_ALIAS}.fileBaseUrl`);
    this.postBaseUrl = configService.get<string>(`${GATEWAY_ALIAS}.postBaseUrl`);
  }
  public async getAllPosts(
    filter: PostFilterDto,
    page?: number,
    limit?: number,
  ): Promise<PaginationResponseDto<CommonPostDto[]>> {
    return this.httpService.axiosRef
      .get<PaginationResponseDto<CommonPostDto[]>>(`${this.postBaseUrl}/post`, {
        params: {
          filter,
          page,
          limit,
        },
      })
      .then(resolveData);
  }
  public async doRePost(postId: string, authHeader: string): Promise<CommonPostDto> {
    return this.httpService.axiosRef
      .post<CommonPostDto>(`${this.postBaseUrl}/post/repost/${postId}`, null, genAuthHeader(authHeader))
      .then(resolveData);
  }
  public async getPostById(id: string): Promise<CommonPostDto> {
    return this.httpService.axiosRef.get<CommonPostDto>(`${this.postBaseUrl}/post/${id}`).then(resolveData);
  }
  public async deletePostById(id: string, authHeader: string): Promise<void> {
    return this.httpService.axiosRef.delete(`${this.postBaseUrl}/post/${id}`, genAuthHeader(authHeader)).then(resolveData);
  }

  public async createPost(post: WritePostDto, authHeader: string): Promise<CommonPostDto> {
    return this.httpService.axiosRef
      .post<CommonPostDto>(`${this.postBaseUrl}/post`, post, genAuthHeader(authHeader))
      .then(resolveData);
  }

  public async updatePost(postId: string, post: UpdatePostDto, authHeader: string): Promise<CommonPostDto> {
    return this.httpService.axiosRef
      .patch(`${this.postBaseUrl}/post/${postId}`, post, genAuthHeader(authHeader))
      .then(resolveData);
  }

  public async createLenta(
    filter: PostFilterDto,
    sort: Sort,
    tag: string,
    page: number,
    limit: number,
  ): Promise<PaginationResponseDto<PostCatalogDto[]>> {
    const postsRequest = await this.getAllPosts(filter, limit, page);

    const posts: CommonPostDto[] = [];
    if (isNotEmpty(tag)) {
      const postsIdsByTagNames = await this.artefactService.getPostsIdsByTagsNames(tag);

      posts.push(...postsRequest.data.filter((post) => postsIdsByTagNames.includes(post.id)));
    } else {
      posts.push(...postsRequest.data);
    }

    if (posts.length === 0) {
      return { data: [], total: 0 };
    }

    const { postsIds, usersIds, filesIds } = getLentaParams(posts);

    const likes = await this.artefactService.getLikesCountByPostId(postsIds);

    const comments = await this.artefactService.getCommentsCountByPostsId(postsIds);

    const users = await this.userService.getUsersByIds(usersIds);

    const files = await this.fileService.getFilesPaths(filesIds);

    const tags = await this.artefactService.getTagsByPostsIds(postsIds);

    return {
      data: renderLenta(posts, likes, comments, users, tags, files, sort),
      total: posts.length,
    };
  }
}
