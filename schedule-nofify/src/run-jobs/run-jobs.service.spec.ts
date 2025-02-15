import { Test, TestingModule } from '@nestjs/testing';
import { RunJobsService } from './run-jobs.service';
import { getModelToken } from '@nestjs/mongoose';
import { JobsService } from '../jobs/jobs.service';
import { QueueService } from '../queue/queue.service';
import { SenderService } from '../sender/sender.service';

describe('RunJobsService', () => {
  let service: RunJobsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RunJobsService,
        {
          provide: getModelToken('RunJob', 'default'),
          useValue: {},
        },
        {
          provide: JobsService,
          useValue: {},
        },
        {
          provide: QueueService,
          useValue: {},
        },
        {
          provide: SenderService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<RunJobsService>(RunJobsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
