import { Test, TestingModule } from '@nestjs/testing';
import { DocumnetService } from './documnet.service';

describe('DocumnetService', () => {
  let service: DocumnetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocumnetService],
    }).compile();

    service = module.get<DocumnetService>(DocumnetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
