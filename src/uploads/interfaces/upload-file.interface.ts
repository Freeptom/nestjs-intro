import { fileTypes } from '../enums/file-types.enum';

export interface UploadedFile {
  name: string;
  path: string;
  type: fileTypes;
  mime: string;
  size: number;
}
