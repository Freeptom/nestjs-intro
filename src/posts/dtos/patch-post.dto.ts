import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { CreatePostDto } from './create-post.dto';

/**
 * DTO for updating an existing post.
 * Requires a post ID and extends CreatePostDto, making all other fields optional.
 */
export class PatchPostDto extends PartialType(CreatePostDto) {
  /**
   * The ID of the post to update.
   */
  @ApiProperty({
    description: 'The id of the post that needs to be updated',
  })
  @IsInt()
  @IsNotEmpty()
  id: number;
}
