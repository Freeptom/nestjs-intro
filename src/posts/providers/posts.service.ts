import {
  BadRequestException,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TagsService } from 'src/tags/providers/tags.service';
import { PatchPostDto } from '../dtos/patch-post.dto';
import { Tag } from 'src/tags/tag.entity';
import { GetPostsDto } from '../dtos/get-posts.dto';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { CreatePostProvider } from './create-post.provider';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
/**
 * Service responsible for handling posts logic.
 */
@Injectable()
export class PostsService {
  constructor(
    /**
     * Connects the UsersService to the PostsService via dependency injection.
     */
    private readonly usersService: UsersService,
    /**
     * Inject postsRepository
     */
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    /**
     * Injects the TagsService to the PostsService
     */
    private readonly tagsService: TagsService,
    /**
     * Injects PaginationProvider
     */
    private readonly paginationProvider: PaginationProvider,
    /**
     * Inject CreatePostProvider
     */
    private readonly createPostProvider: CreatePostProvider,
  ) {}
  /**
   * Creating new posts
   */
  public async create(createPostDto: CreatePostDto, user: ActiveUserData) {
    return await this.createPostProvider.createPost(createPostDto, user);
  }

  /**
   * Fetches all posts that belong to a user by Id.
   */
  public async findAll(
    postQuery: GetPostsDto,
    userId: string,
  ): Promise<Paginated<Post>> {
    // Users Service
    const posts = await this.paginationProvider.paginateQuery(
      {
        limit: postQuery.limit,
        page: postQuery.page,
      },
      this.postsRepository,
      {
        metaOptions: true,
        author: true,
        tags: true,
      },
    );
    return posts;
  }
  /**
   * Deletes a given post by id.
   */
  public async delete(id: number) {
    await this.postsRepository.delete(id);
    // confirmation
    return { deleted: true, id };
  }
  /**
   * Updates a given post by id.
   */
  public async update(patchPostDto: PatchPostDto) {
    // find the tags and post
    let tags: Tag[] | null = null;
    let post: Post | null = null;
    try {
      tags = await this.tagsService.findTags(patchPostDto.tags || []);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try again later.',
        {
          description: 'Error connecting to the database',
        },
      );
    }
    if (!tags || tags.length !== patchPostDto.tags?.length) {
      throw new BadRequestException(
        'Please check your tag ids, and ensure they are correct',
      );
    }
    try {
      post = await this.postsRepository.findOneBy({ id: patchPostDto.id });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try again later.',
        {
          description: 'Error connecting to the database',
        },
      );
    }
    if (!post) {
      throw new NotFoundException('The post id does not exist');
    } else {
      post.title = patchPostDto.title ?? post.title;
      post.content = patchPostDto.content ?? post.content;
      post.status = patchPostDto.status ?? post.status;
      post.postType = patchPostDto.postType ?? post.postType;
      post.slug = patchPostDto.slug ?? post.slug;
      post.featuredImageUrl =
        patchPostDto.featuredImageUrl ?? post.featuredImageUrl;
      post.publishedOn = patchPostDto.publishedOn ?? post.publishedOn;
      // assign the new tags
      post.tags = tags;
      try {
        await this.postsRepository.save(post);
      } catch (error) {
        throw new RequestTimeoutException(
          'Unable to process your request at the moment. Please try again later.',
          {
            description: 'Error connecting to the database',
          },
        );
      }
    }
  }
}
