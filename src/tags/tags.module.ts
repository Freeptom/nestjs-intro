import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './tag.entity';
import { TagsService } from './providers/tags.service';

@Module({
  providers: [TagsService],
  imports: [TypeOrmModule.forFeature([Tag])],
  controllers: [TagsController],
  exports: [TagsService],
})
export class TagsModule {}
