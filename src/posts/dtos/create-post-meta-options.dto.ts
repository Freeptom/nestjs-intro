import { IsNotEmpty, IsString } from 'class-validator';
/**
 * Data transfer object for creating post meta options.
 * Represents a key-value pair for post metadata.
 */
export class CreatePostMetaOptionsDto {
  /**
   * Metadata key.
   * Must be a non-empty string.
   */
  @IsString()
  @IsNotEmpty()
  key: string;
  /**
   * Metadata value.
   * Must be provided; type is flexible to allow different kinds of values.
   */
  @IsNotEmpty()
  value: any;
}
