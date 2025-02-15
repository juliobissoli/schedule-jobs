import { Test, TestingModule } from '@nestjs/testing';
import { JourneysController } from './journeys.controller';
import { JourneysService } from './journeys.service';
import { ActionsTrigger } from './entities/journey.entity';


const mockJourney = {
  name: 'Exemplo de Jornada',
  description: 'Descrição da jornada de exemplo',
  status: 'available',
  totalJobs: 0,
  actions: [
    {
      payload: 'Mensagem de exemplo',
      delay: 0,
      mode: 'sender',
      trigger: ActionsTrigger.SEND_MESSAGE_EMAIL,
      maxAttempts: 3
    }
  ],
  isSequential: false,
  createdAt: new Date(),
  updatedAt: new Date(),
}


const mockJourneysService = {
  create: jest.fn().mockResolvedValue(mockJourney),
  findAll: jest.fn().mockResolvedValue([mockJourney]),
  findOne: jest.fn().mockResolvedValue(mockJourney),
  update: jest.fn().mockResolvedValue(mockJourney),
  remove: jest.fn().mockResolvedValue(mockJourney),
};


describe('JourneysController', () => {
  let controller: JourneysController;
  let service: JourneysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JourneysController],
      providers: [
        JourneysService,
        {
          provide: JourneysService,
          useValue: mockJourneysService
        }
      ],
    }).compile();

    controller = module.get<JourneysController>(JourneysController);
    service = module.get<JourneysService>(JourneysService);

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  it('should create a journey', async () => {
    const createJourneyDto = {
      name: 'Nova Jornada',
      description: 'Descrição da nova jornada',
      status: 'available',
      totalJobs: 0,
      actions: [],
      isSequential: false,
    };
    const result = await controller.create(createJourneyDto);
    expect(result).toEqual(mockJourney);
    expect(mockJourneysService.create).toHaveBeenCalledWith(createJourneyDto);
  });

  it('should find all journeys', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([mockJourney]);
    expect(mockJourneysService.findAll).toHaveBeenCalled();
  });

  it('should find one journey by id', async () => {
    const id = '1';
    const result = await controller.findOne(id);
    expect(result).toEqual(mockJourney);
    expect(mockJourneysService.findOne).toHaveBeenCalledWith(id);
  });

  it('should update a journey', async () => {
    const id = '1';
    const updateJourneyDto = {
      name: 'Jornada Atualizada',
      description: 'Descrição atualizada',
      status: 'available',
      totalJobs: 1,
      actions: [],
      isSequential: true,
    };
    const result = await controller.update(id, updateJourneyDto);
    expect(result).toEqual(mockJourney);
    expect(mockJourneysService.update).toHaveBeenCalledWith(id, updateJourneyDto);
  });

  
});
