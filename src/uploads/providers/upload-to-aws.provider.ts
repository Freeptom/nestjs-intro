import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import * as path from 'path';
import { v4 as uuid4 } from 'uuid';

@Injectable()
export class UploadToAwsProvider {
  private readonly s3Client: S3Client;
  private readonly bucket: string;

  constructor(private readonly configService: ConfigService) {
    this.bucket = this.configService.get('appConfig.awsBucketName') as string;

    this.s3Client = new S3Client({
      region: this.configService.get('appConfig.awsRegion') as string,
      credentials: {
        accessKeyId: this.configService.get(
          'appConfig.awsAccessKeyId',
        ) as string,
        secretAccessKey: this.configService.get(
          'appConfig.awsSecretAccessKey',
        ) as string,
      },
    });
  }

  public async fileUpload(file: Express.Multer.File): Promise<string> {
    const key = this.generateFileName(file);

    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    try {
      await this.s3Client.send(command);
      return key;
    } catch (error) {
      throw new RequestTimeoutException(error);
    }
  }

  private generateFileName(file: Express.Multer.File): string {
    const name = file.originalname.split('.')[0].replace(/\s/g, '').trim();
    const extension = path.extname(file.originalname);
    const timestamp = new Date().getTime();
    return `${name}-${timestamp}-${uuid4()}${extension}`;
  }
}
