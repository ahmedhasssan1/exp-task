import { Module } from '@nestjs/common';
import { DocumnetService } from './documnet.service';
import { DocumnetController } from './documnet.controller';
import mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Research, ResearchSchema } from './entity/docs.entity';
import { ProjectsModule } from 'src/projects/projects.module';

@Module({
  imports:[MongooseModule.forFeature([{name:Research.name,schema:ResearchSchema}]),ProjectsModule],
  controllers: [DocumnetController],
  providers: [DocumnetService],
})
export class DocumnetModule {}
