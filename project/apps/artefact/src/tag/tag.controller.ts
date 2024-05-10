import { Body, Controller, Get, Logger, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiOkResponse, ApiTags, ApiQuery, ApiBody } from '@nestjs/swagger';
import { TagService } from './tag.service';
import { fillDto, JwtAuthGuard } from '@project/common';
import { GetTagsByPostsIdDto, TagNameDto } from '@project/dtos/artefact-dto';
import { transformTagsNames } from './utils';

@ApiTags('tag')
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @ApiOkResponse({
    type: [GetTagsByPostsIdDto],
    isArray: true,
    description: 'tag per post',
  })
  @Get('by-posts-ids')
  @ApiQuery({
    type: [String],
    required: true,
    description: 'array of post identificators',
  })
  public async getTagsByPostsIds(@Query('postsIds') postsIds: string[]): Promise<GetTagsByPostsIdDto[]> {
    try {
      const tags = await this.tagService.getTagsByPostsId(postsIds);
      return tags.map((tag) => fillDto(GetTagsByPostsIdDto, tag));
    } catch (error) {
      Logger.error(error);
      return [];
    }
  }

  @ApiOkResponse({
    type: [String],
    isArray: true,
    description: 'get post per names',
  })
  @Get('by-tags-names')
  @ApiQuery({
    name: 'names',
    type: [String],
    isArray: true,
    required: true,
    description: 'tags names',
  })
  public async getPostsIdsByTagsNames(@Query('names') rawNames: TagNameDto[]): Promise<string[]> {
    const names = transformTagsNames(rawNames);
    try {
      const relations = await this.tagService.getLinksByTagsNames(names);
      return relations.map(({ postId }) => postId);
    } catch (error) {
      Logger.error(error);
      return [];
    }
  }

  @ApiOkResponse({
    type: [String],
    isArray: true,
    description: 'copy tagse when post reposted',
  })
  @UseGuards(JwtAuthGuard)
  @Put('copy/:source/:target')
  @ApiBearerAuth()
  @ApiParam({
    name: 'source',
    type: String,
    required: true,
    description: 'post id',
  })
  @ApiParam({
    name: 'target',
    type: String,
    required: true,
    description: 'post id',
  })
  public async copyTags(
    @Param('source', ParseUUIDPipe) source: string,
    @Param('target', ParseUUIDPipe) target: string,
  ): Promise<string[]> {
    try {
      const tags = await this.tagService.getTagsByPostsId([source]);
      const relations = await this.tagService.createTags(
        target,
        tags.map(({ name }) => name),
      );
      return relations.map(({ id }) => id);
    } catch (error) {
      Logger.error(error);
      return [];
    }
  }

  @ApiOkResponse({
    type: [String],
    isArray: true,
    description: 'update and return id of tags relations',
  })
  @UseGuards(JwtAuthGuard)
  @Put(':postId')
  @ApiBearerAuth()
  @ApiParam({
    name: 'postId',
    type: String,
    required: true,
    description: 'post id',
  })
  @ApiBody({
    type: [TagNameDto],
    isArray: true,
    required: true,
    description: 'tags names',
  })
  public async updateTags(@Param('postId', ParseUUIDPipe) postId: string, @Body() rawNames: TagNameDto[]): Promise<string[]> {
    try {
      const names = transformTagsNames(rawNames);

      const links = await this.tagService.getLinksByTagsNames(names);

      await Promise.all(
        links.map((relation) => (relation.postId === postId ? this.tagService.deleteTagRelationById(relation.id) : null)),
      );

      const relations = await this.tagService.createTags(postId, names);
      return relations.map(({ id }) => id);
    } catch (error) {
      Logger.error(error);
      return [];
    }
  }

  @ApiOkResponse({
    type: [String],
    isArray: true,
    description: 'create and return tag relation id',
  })
  @UseGuards(JwtAuthGuard)
  @Post(':postId')
  @ApiBearerAuth()
  @ApiParam({
    name: 'postId',
    type: String,
    required: true,
    description: 'post id',
  })
  @ApiBody({
    type: [TagNameDto],
    isArray: true,
    required: true,
    description: 'tags names',
  })
  public async createTags(@Param('postId', ParseUUIDPipe) postId: string, @Body() rawNames: TagNameDto[]): Promise<string[]> {
    try {
      const relations = await this.tagService.createTags(postId, transformTagsNames(rawNames));
      return relations.map(({ id }) => id);
    } catch (error) {
      Logger.error(error);
      return [];
    }
  }
}
