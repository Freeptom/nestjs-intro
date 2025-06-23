import { Injectable } from '@nestjs/common';
import { MetaOption } from '../meta-option.entity';
import { CreatePostMetaOptionsDto } from '../dtos/create-post-meta-options.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

/**
 * Service responsible for handling posts logic.
 */
@Injectable()
export class MetaOptionsService {
  constructor(
    /**
     * Inject meta options repository
     */
    @InjectRepository(MetaOption)
    private metaOptionsRepository: Repository<MetaOption>,
  ) {}
  /**
   * The method creates a meta option
   */
  public async create(CreatePostMetaOptionsDto: CreatePostMetaOptionsDto) {
    // Create a new meta option
    const metaOption = this.metaOptionsRepository.create(
      CreatePostMetaOptionsDto,
    );
    return await this.metaOptionsRepository.save(metaOption);
  }
}
