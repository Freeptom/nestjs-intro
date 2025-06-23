import { Injectable } from '@nestjs/common';
import { CreateTagDto } from '../dtos/create-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../tag.entity';
import { In, Repository } from 'typeorm';

/**
 * Service responsible for handling posts logic.
 */
@Injectable()
export class TagsService {
  constructor(
    /**
     * Inject tagsRepository
     */
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
  ) {}
  /**
   * Creating a new tag
   */
  public async create(createTagDto: CreateTagDto) {
    const tag = this.tagsRepository.create(createTagDto);
    return await this.tagsRepository.save(tag);
  }
  /**
   * Finds tags based on ids
   */
  public async findTags(tags: number[]) {
    const results = await this.tagsRepository.find({
      where: {
        id: In(tags),
      },
    });
    return results;
  }
  /**
   * Deletes a tag based on id
   */
  public async delete(id: number) {
    await this.tagsRepository.delete(id);
    return {
      deleted: true,
      id,
    };
  }
  /**
   * Soft deletes a tag based on id
   */
  public async softRemove(id: number) {
    await this.tagsRepository.softDelete(id);
    return {
      deleted: true,
      id,
    };
  }
}
