import {
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Body,
  Query,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';
import { GetPostsDto } from './dtos/get-posts.dto';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
/**
 * The posts application controller.
 * Handles post related routes and delegates logic to the PostsService.
 */
@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  /**
   *  Get all posts or filter by userId via query param
   */
  @ApiOperation({
    summary: 'Fetches a list of blog posts, filtered by userId if provided',
  })
  @ApiResponse({
    status: 200,
    description: 'Posts fetched successfully, based on the query',
  })
  @Get('{/:userId}/')
  public getPosts(
    @Param('userId') userId: string,
    @Query() postQuery: GetPostsDto,
  ) {
    return this.postsService.findAll(postQuery, userId);
  }
  /**
   *  Creates a post
   */
  @ApiOperation({
    summary: 'Creates a new blog post',
  })
  @ApiResponse({
    status: 201,
    description: 'You get a 201 response if your post is created successfully',
  })
  @Post()
  public createPost(
    @Body() createPostDto: CreatePostDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.postsService.create(createPostDto, user);
  }

  /**
   *  Updates an existing blog post
   */
  @ApiOperation({
    summary: 'Updates an existing blog post',
  })
  @ApiResponse({
    status: 200,
    description: 'You get a 200 response if your post is updated successfully',
  })
  @Patch()
  public updatePost(@Body() patchPostDto: PatchPostDto) {
    return this.postsService.update(patchPostDto);
  }

  /**
   *  Deletes an existing blog post
   */
  @ApiOperation({
    summary: 'Deletes an existing blog post',
  })
  @ApiResponse({
    status: 200,
    description: 'You get a 200 response if your post is deleted successfully',
  })
  @Delete()
  public deletePost(@Query('id', ParseIntPipe) id: number) {
    return this.postsService.delete(id);
  }
}
