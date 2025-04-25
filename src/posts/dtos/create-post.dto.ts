import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  Matches,
  IsJSON,
  IsUrl,
  IsISO8601,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { postType } from '../enums/postType.enum';
import { postStatus } from '../enums/postStatus.enum';
import { CreatePostMetaOptionsDto } from './create-post-meta-options.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * DTO for creating a new post.
 * Contains all necessary and optional fields for defining a blog post,
 * including metadata, publishing options, and structured data.
 */
export class CreatePostDto {
  /**
   * The title of the post.
   * Must be at least 4 characters long.
   */
  @ApiProperty({
    example: 'This is a title',
    description: 'This is the title for the blog post',
  })
  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  title: string;

  /**
   * The type of the post (e.g., 'post', 'page', etc.).
   */
  @ApiProperty({
    enum: postType,
    description: "Possible values, 'post', 'page, 'story, 'series'",
  })
  @IsEnum(postType)
  @IsNotEmpty()
  postType: postType;

  /**
   * URL-friendly slug for the post.
   * Must be lowercase, hyphen-separated, with no spaces.
   */
  @ApiProperty({
    description: "For example - 'my-url'",
    example: 'my-blog-post',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'A slug should be all small letters, and uses only "-" and without spaces. For example "my-url',
  })
  slug: string;

  /**
   * The publication status of the post.
   */
  @ApiProperty({
    enum: postStatus,
    description: "Possible values, 'draft', 'scheduled, 'review, 'published'",
  })
  @IsEnum(postStatus)
  @IsNotEmpty()
  status: postStatus;

  /**
   * The main content of the post (optional).
   */
  @ApiPropertyOptional({
    description: 'This is the content of the post',
    example: 'The post content',
  })
  @IsString()
  @IsOptional()
  content?: string;

  /**
   * Structured data (JSON-LD format) as a string (optional).
   */
  @ApiPropertyOptional({
    description: 'Serialize your JSON object, or an error will be thrown',
    example:
      // eslint-disable-next-line no-useless-escape
      '{\r\n "@context": "https:\/\/schema.org",\r\n "@type": "Person"\r\n }',
  })
  @IsOptional()
  @IsJSON()
  schema?: string;

  /**
   * URL of the featured image (optional).
   */
  @ApiPropertyOptional({
    description: 'Featured image for your blog post',
    example: 'http://localhost.com/images/image1.jpg',
  })
  @IsUrl()
  @IsOptional()
  featuredImageUrl?: string;

  /**
   * ISO 8601 date string representing when the post was/will be published (optional).
   */
  @ApiPropertyOptional({
    description: 'The date on which the blog post is published',
    example: '"2024-03-16T07:46:32+0000"',
  })
  @IsISO8601()
  @IsOptional()
  publishedOn?: Date;

  /**
   * Array of tags associated with the post (optional).
   */
  @ApiPropertyOptional({
    description: 'An array of tags passed as string values',
    example: ['nestjs', 'typescript'],
  })
  @IsArray()
  @IsString({ each: true })
  @MinLength(3, { each: true })
  @IsOptional()
  tags?: string[];

  /**
   * Custom meta options (key-value pairs) for the post (optional).
   */
  @ApiPropertyOptional({
    type: 'array',
    required: false,
    items: {
      type: 'object',
      properties: {
        key: {
          type: 'string',
          description:
            'The key can be any string identifier for your meta option',
          example: 'sidebarEnabled',
        },
        value: {
          type: 'any',
          description: 'Any value you want to save to the key',
          example: true,
        },
      },
    },
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePostMetaOptionsDto)
  metaOptions?: CreatePostMetaOptionsDto[];
}
