import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { DocumnetService } from './documnet.service';
import { DocumentDto } from './dto/createDocs.dto';
import { Research } from './entity/docs.entity';

@Controller('documnet')
export class DocumnetController {
  constructor(private readonly documnetService: DocumnetService) {}

  @Post('/upload-document')
  async uploadDocument(@Body()docs:DocumentDto){
    return this.documnetService.uploadDocument(docs);
  }

  @Get('/get-doc')
  async getDocument(@Query('query') query:string):Promise<Research[]>{
    return this.documnetService.searchDocuments(query)
  }

  @Get('/project-document')
  async getAllDocumnets(@Query('query') projectId:number):Promise<Research[]>{
    return this.documnetService.getByProject(projectId);
  }

} 
