import { Inject, Injectable } from '@nestjs/common';
import { Research, ResearchDocument } from './entity/docs.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DocumentDto } from './dto/createDocs.dto';

@Injectable()
export class DocumnetService {
  constructor(
    @InjectModel(Research.name) private docsModel: Model<ResearchDocument>,
  ) {}
  uploadDocument(document: DocumentDto): Promise<Research> {
    const new_document = new this.docsModel(document);
    return new_document.save();
  }
  async searchDocuments(query: string): Promise<Research[]> {
    return this.docsModel.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } },
        { tags: { $regex: query, $options: 'i' } },
      ],
    });
  }
  async getByProject(projectId:number):Promise<Research[]>{
    return this.docsModel.find({projectId})
  }
}
