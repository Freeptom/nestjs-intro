import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiHeaders, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UploadsService } from './providers/uploads.service';
/**
 * The uploads controller.
 * Handles file uploads with related routes and delegates logic to the uploadsService.
 */
@Controller('uploads')
@ApiTags('Uploads')
export class UploadsController {
  /**
   * Creates an instance of the UploadsController with required dependencies.
   *
   * @param uploadsService - The uploadsService instance that handles upload-related business logic and data operations
   */
  constructor(
    /**
     * Inject uploadsService
     */
    private readonly uploadsService: UploadsService,
  ) {}
  /**
   * Uploads a new file to the server.
   *
   * @param file - The uploaded file from the multipart form data
   * @returns The result of the file upload operation
   */
  @UseInterceptors(FileInterceptor('file'))
  @ApiHeaders([
    {
      name: 'Content-Type',
      description: 'multipart/form-data',
    },
    {
      name: 'Authorization',
      description: 'Bearer Token',
    },
  ])
  @ApiOperation({
    summary: 'Upload a new image to the server',
  })
  @Post('file')
  public uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.uploadsService.uploadFile(file);
  }
}
