import { Controller, Get, Param, Post, Patch, Body } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';
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
  public getPosts(@Param('userId') userId: string) {
    return this.postsService.findAll(userId);
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
  public createPost(@Body() createPostDto: CreatePostDto) {
    console.log(createPostDto);
    return 'You sent a post request to create a post';
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
  public updatePost(@Body() patchPostsDto: PatchPostDto) {
    console.log(patchPostsDto);
    return 'You sent a patch request to update a post';
  }
}
