import { Test, TestingModule } from '@nestjs/testing';
import { RunJobsService } from './run-jobs.service';

describe('RunJobsService', () => {
  let service: RunJobsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RunJobsService],
    }).compile();

    service = module.get<RunJobsService>(RunJobsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
