import { Test, TestingModule } from '@nestjs/testing';
import { JourneysService } from './journeys.service';
import { Model } from 'mongoose';
import { ActionsTrigger, Journey, JourneyDocument } from './entities/journey.entity';
import { getModelToken } from '@nestjs/mongoose';


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

const mockJourneyModel = {
  findOne: jest.fn(),
  find: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue([mockJourney]) }),
  countDocuments: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(1) }),
  findById: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(mockJourney) }),
  findByIdAndUpdate: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(mockJourney) }),
  findByIdAndDelete: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(mockJourney) }),
  create: jest.fn().mockImplementation((dto) => Promise.resolve({ _id: '1234567890', ...dto })),
};

describe('JourneysService', () => {
  let service: JourneysService;
  let model: Model<JourneyDocument>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JourneysService,
        {
          provide: getModelToken(Journey.name, 'default'),
          useValue: mockJourneyModel,
        },  
      ],
    }).compile();

    service = module.get<JourneysService>(JourneysService);
    model = module.get<Model<JourneyDocument>>(getModelToken(Journey.name, 'default'));

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('deve retornar uma jornada pelo ID', async () => {
    const id = '123';
    const result = await service.findOne(id);
    expect(result).toEqual(mockJourney);
    expect(mockJourneyModel.findById).toHaveBeenCalledWith(id);
  });

  it('deve atualizar uma jornada', async () => {
    const id = '123';
    const updateJourneyDto = { name: 'Jornada Atualizada' };
    const result = await service.update(id, updateJourneyDto);
    expect(result).toEqual(mockJourney);
    expect(mockJourneyModel.findByIdAndUpdate).toHaveBeenCalledWith(id, updateJourneyDto, { new: true });
  });

  it('deve remover uma jornada', async () => {
    const id = '123';
    const result = await service.remove(id);
    expect(result).toEqual(mockJourney);
    expect(mockJourneyModel.findByIdAndUpdate).toHaveBeenCalledWith(id, { status: 'deleted' }, { new: true });
  });

});
