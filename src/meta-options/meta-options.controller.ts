import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreatePostMetaOptionsDto } from './dtos/create-post-meta-options.dto';
import { MetaOptionsService } from './providers/meta-options.service';

@Controller('meta-options')
export class MetaOptionsController {
  constructor(
    /**
     *  Injects the MetaOptionsService into the Meta Options Controller
     */
    private readonly metaOptionsService: MetaOptionsService,
  ) {}
  /**
   *  Creates a meta option
   */
  @ApiOperation({
    summary: 'Creates a new meta option inside of a blog post',
  })
  @ApiResponse({
    status: 201,
    description:
      'You get a 201 response if your meta option is created successfully',
  })
  @Post()
  public create(@Body() CreatePostMetaOptionsDto: CreatePostMetaOptionsDto) {
    return this.metaOptionsService.create(CreatePostMetaOptionsDto);
  }
}
