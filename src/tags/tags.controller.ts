import {
  Controller,
  Post,
  Body,
  Query,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { CreateTagDto } from './dtos/create-tag.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TagsService } from './providers/tags.service';
/**
 * The tags application controller.
 * Handles tag related routes and delegates logic to the TagsService.
 */
@Controller('tags')
@ApiTags('Tags')
export class TagsController {
  constructor(
    /**
     *  Injects the TagsService into the Tags Controller
     */
    private readonly tagsService: TagsService,
  ) {}
  /**
   *  Creates a tag
   */
  @ApiOperation({
    summary: 'Creates a new tag',
  })
  @ApiResponse({
    status: 201,
    description: 'You get a 201 response if your tag is created successfully',
  })
  @Post()
  public create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }
  /**
   *  Deletes a tag
   */
  @ApiOperation({
    summary: 'Deletes a tag',
  })
  @ApiResponse({
    status: 201,
    description: 'You get a 201 response if your tag is deleted successfully',
  })
  @Delete()
  public delete(@Query('id', ParseIntPipe) id: number) {
    return this.tagsService.delete(id);
  }
  /**
   *  Soft deletes a tag
   */
  @ApiOperation({
    summary: 'Soft deletes a tag',
  })
  @ApiResponse({
    status: 201,
    description: 'You get a 201 response if your tag is deleted successfully',
  })
  // DELETE tags/soft-delete
  @Delete('soft-delete')
  public softDelete(@Query('id', ParseIntPipe) id: number) {
    return this.tagsService.softRemove(id);
  }
}
