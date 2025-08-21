import { Module } from '@nestjs/common';
import { DocumnetService } from './documnet.service';
import { DocumnetController } from './documnet.controller';

@Module({
  controllers: [DocumnetController],
  providers: [DocumnetService],
})
export class DocumnetModule {}
