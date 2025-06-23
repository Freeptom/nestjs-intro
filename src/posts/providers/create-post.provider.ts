import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreatePostDto } from '../dtos/create-post.dto';
import { TagsService } from 'src/tags/providers/tags.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../post.entity';
import { Repository } from 'typeorm';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { UsersService } from 'src/users/providers/users.service';
import { Tag } from 'src/tags/tag.entity';

@Injectable()
export class CreatePostProvider {
  constructor(
    /**
     * Injects TagsService
     */
    private readonly tagsService: TagsService,
    /**
     * Injects usersService
     */
    private readonly usersService: UsersService,
    /**
     * Inject postsRepository
     */
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}
  /**
   * The method to create a post
   */
  public async createPost(createPostDto: CreatePostDto, user: ActiveUserData) {
    // Find tags
    let author = {};
    let tags: Tag[] | null = null;
    try {
      author = await this.usersService.findOneById(user.sub);
      tags = await this.tagsService.findTags(createPostDto.tags || []);
    } catch (error) {
      throw new ConflictException();
    }

    if (createPostDto.tags?.length !== tags.length) {
      throw new BadRequestException('Please check your tag ids');
    }

    const post = this.postsRepository.create({
      ...createPostDto,
      author,
      tags,
    });
    // Save and return post
    return this.postsRepository.save(post);
  }
}
