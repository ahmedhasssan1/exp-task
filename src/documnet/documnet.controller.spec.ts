import { Test, TestingModule } from '@nestjs/testing';
import { DocumnetController } from './documnet.controller';
import { DocumnetService } from './documnet.service';

describe('DocumnetController', () => {
  let controller: DocumnetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumnetController],
      providers: [DocumnetService],
    }).compile();

    controller = module.get<DocumnetController>(DocumnetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
