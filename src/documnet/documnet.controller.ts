import { Controller } from '@nestjs/common';
import { DocumnetService } from './documnet.service';

@Controller('documnet')
export class DocumnetController {
  constructor(private readonly documnetService: DocumnetService) {}
}
