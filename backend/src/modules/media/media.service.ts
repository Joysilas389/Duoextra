import { Injectable } from '@nestjs/common';

@Injectable()
export class MediaService {
  async findAll() { return []; }
  async getUploadUrl(filename: string) { return { url: `/uploads/${filename}` }; }
}
