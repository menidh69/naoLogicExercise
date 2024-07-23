import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { ProductService } from '../product/product.service';
import { OpenAiService } from '../open-ai/open-ai.service';
import { OpenAiModule } from 'src/open-ai/open-ai.module';

jest.mock('../open-ai/open-ai.service');
jest.mock('../open-ai/open-ai.module');
jest.mock('../product/product.service');

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [OpenAiModule],
      providers: [TasksService, ProductService],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
