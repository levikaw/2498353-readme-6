import { ConflictException, Injectable } from '@nestjs/common';
import { TagAccessEntity, TagAccessRepository, LinkPostTagAccessRepository, LinkPostTagAccessEntity } from '@project/tag-access';
import { TAG_EXCEPTION } from '@project/constants/exception-messages';
import { GetTagsByPostsIdDto } from '@project/dtos/artefact-dto';

@Injectable()
export class TagService {
  constructor(
    private readonly tagAccessRepository: TagAccessRepository,
    private readonly linkPostTagAccessRepository: LinkPostTagAccessRepository,
  ) {}

  public async getTagsByPostsId(postsIds: string[]): Promise<GetTagsByPostsIdDto[]> {
    const links = await this.linkPostTagAccessRepository.findManyByPostsIds(postsIds);
    const tags = await this.tagAccessRepository.findManyByIds(links.map(({ tagId }) => tagId));

    return links.map((link) => ({
      ...link,
      name: tags.find((tag) => tag.id === link.tagId).name,
    }));
  }

  public async getLinksByTagsNames(names: string[]): Promise<LinkPostTagAccessEntity[]> {
    const tags = await this.tagAccessRepository.findManyByNames(names);
    return this.linkPostTagAccessRepository.findManyByTagsIds(tags.map(({ id }) => id));
  }

  public async createTags(postId: string, names: string[]): Promise<LinkPostTagAccessEntity[]> {
    const tags = await this.tagAccessRepository.findManyByNames(names);
    const links = await this.linkPostTagAccessRepository.findManyByTagsIds(tags.map(({ id }) => id));

    for (const link of links) {
      if (link.postId === postId) {
        throw new ConflictException(TAG_EXCEPTION.EXISTS);
      }
    }

    return Promise.all(
      names.map((name) =>
        this.tagAccessRepository
          .save(new TagAccessEntity({ name }))
          .then((tag) => this.linkPostTagAccessRepository.save(new LinkPostTagAccessEntity({ postId, tagId: tag.id }))),
      ),
    );
  }

  public async deleteTagRelationById(id: string): Promise<void> {
    await this.linkPostTagAccessRepository.deleteById(id);
  }
}
