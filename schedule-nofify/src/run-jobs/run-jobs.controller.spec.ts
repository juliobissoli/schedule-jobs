import { Test, TestingModule } from '@nestjs/testing';
import { RunJobsController } from './run-jobs.controller';
import { RunJobsService } from './run-jobs.service';

describe('RunJobsController', () => {
  let controller: RunJobsController;
  let service: RunJobsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RunJobsController],
      providers: [
        {
          provide: RunJobsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<RunJobsController>(RunJobsController);
    service = module.get<RunJobsService>(RunJobsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
