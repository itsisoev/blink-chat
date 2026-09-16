import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { extname, join } from 'node:path';
import { mkdir, writeFile } from 'node:fs/promises';
import { IUploadedFile } from './uploaded-file.interface';

@Injectable()
export class StorageService {
  private readonly uploadDirectory = join(process.cwd(), 'uploads', 'avatars');

  async saveAvatar(file: IUploadedFile): Promise<string> {
    await mkdir(this.uploadDirectory, { recursive: true });

    const extension = extname(file.originalname).toLowerCase();
    const fileName = `${randomUUID()}${extension}`;
    const filePath = join(this.uploadDirectory, fileName);

    await writeFile(filePath, file.buffer);

    return `/uploads/avatars/${fileName}`;
  }
}
