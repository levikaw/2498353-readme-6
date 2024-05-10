import { BadRequestException } from '@nestjs/common';
import { ArtefactsCountDto, GetTagsByPostsIdDto, TagsDto } from '@project/dtos/artefact-dto';
import { CommonPostDto, Sort } from '@project/dtos/post-dto';
import { AuthUserDto } from '@project/dtos/user-dto';
import { PostTypeEnum } from '@project/post-access';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { FilesEntitesIds, FilesPathsWithBase, ReducedTags } from './types';

export const resolveData = ({ data }) => data;

export const genAuthHeader = (authHeader: string) => ({
  headers: {
    Authorization: authHeader,
  },
});

export const validateAndTransformTags = async (tags: string): Promise<TagsDto> => {
  const tagsBody = plainToInstance(TagsDto, { tags: tags.split(',').map((name) => ({ name })) });

  const errors = await validate(tagsBody);
  if (errors.length > 0) {
    throw new BadRequestException(String(errors));
  }
  return tagsBody;
};

export const renderFilePathForEntity = (type: PostTypeEnum, files: FilesPathsWithBase, entity: string) =>
  type === PostTypeEnum.Photo ? files.baseUrl + files.data.find((file) => file.id === entity)?.filePath : undefined;

export const reduceTagsByPostId = (tags: GetTagsByPostsIdDto[], postIdentificator: string): ReducedTags =>
  tags.reduce((acc: ReducedTags, { postId, name, id }) => {
    if (postId === postIdentificator) {
      acc.push({ name, id });
    }
    return acc;
  }, []);

export const renderLikesCount = (likes: ArtefactsCountDto[], postId: string): number =>
  likes.find((like) => like.postId === postId).count;

export const renderLenta = (
  posts: CommonPostDto[],
  likes: ArtefactsCountDto[],
  comments: ArtefactsCountDto[],
  users: AuthUserDto[],
  tags: GetTagsByPostsIdDto[],
  files: FilesPathsWithBase,
  sort: Sort = Sort.Default,
) =>
  posts
    .map((post) => ({
      ...post,
      user: users.find((user) => post.userId === user.id),
      likes: renderLikesCount(likes, post.id),
      comments: comments.find((comment) => comment.postId === post.id).count,
      tags: reduceTagsByPostId(tags, post.id),
      imagePath: renderFilePathForEntity(post.type, files, post.id),
    }))
    .sort((post1, post2) => (post1[sort] < post2[sort] ? -1 : post1[sort] > post2[sort] ? 1 : 0));

export const getLentaParams = (posts: CommonPostDto[]) => {
  const postsIds: string[] = [],
    usersIds: string[] = [],
    filesIds: FilesEntitesIds = [];

  for (const post of posts) {
    postsIds.push(post.id);

    usersIds.push(post.userId);

    if (post.fileId) {
      filesIds.push({
        id: post.id,
        fileId: post.fileId,
      });
    }
  }
  return { postsIds, usersIds, filesIds };
};
