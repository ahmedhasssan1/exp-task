import { Module } from '@nestjs/common';
import { DocumnetService } from './documnet.service';
import { DocumnetController } from './documnet.controller';
import mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Research, ResearchSchema } from './entity/docs.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:Research.name,schema:ResearchSchema}])],
  controllers: [DocumnetController],
  providers: [DocumnetService],
})
export class DocumnetModule {}
