import { IsJSON, IsNotEmpty } from 'class-validator';
/**
 * Data transfer object for creating post meta options.
 * Represents a key-value pair for post metadata.
 */
export class CreatePostMetaOptionsDto {
  @IsNotEmpty()
  @IsJSON()
  metaValue: string;
}
