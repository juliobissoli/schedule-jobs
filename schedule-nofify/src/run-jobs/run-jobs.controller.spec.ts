import { Test, TestingModule } from '@nestjs/testing';
import { RunJobsController } from './run-jobs.controller';
import { RunJobsService } from './run-jobs.service';

describe('RunJobsController', () => {
  let controller: RunJobsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RunJobsController],
      providers: [RunJobsService],
    }).compile();

    controller = module.get<RunJobsController>(RunJobsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
