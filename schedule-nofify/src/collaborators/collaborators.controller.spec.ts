import { Test, TestingModule } from '@nestjs/testing';
import { CollaboratorsController } from './collaborators.controller';
import { CollaboratorsService } from './collaborators.service';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';
import { UpdateCollaboratorDto } from './dto/update-collaborator.dto';

const mockCollaborator = {
  _id: '1234567890',
  name: 'John Doe',
  email: 'john@example.com',
  phone: '552999273298',
};

const mockCollaboratorsService = {
  create: jest.fn().mockResolvedValue(mockCollaborator),
  findAll: jest.fn().mockResolvedValue([mockCollaborator]),
  findOne: jest.fn().mockResolvedValue(mockCollaborator),
  update: jest.fn().mockResolvedValue(mockCollaborator),
  remove: jest.fn().mockResolvedValue(mockCollaborator),
};

describe('CollaboratorsController', () => {
  let controller: CollaboratorsController;
  let service: CollaboratorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CollaboratorsController],
      providers: [
        {
          provide: CollaboratorsService,
          useValue: mockCollaboratorsService,
        },
      ],
    }).compile();

    controller = module.get<CollaboratorsController>(CollaboratorsController);
    service = module.get<CollaboratorsService>(CollaboratorsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a collaborator', async () => {
    const dto: CreateCollaboratorDto = { name: 'John Doe', email: 'john@example.com', phone: '552999273298' };
    const result = await controller.create(dto);
    expect(result).toEqual(mockCollaborator);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should return all collaborators', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([mockCollaborator]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a single collaborator by ID', async () => {
    const result = await controller.findOne('1234567890');
    expect(result).toEqual(mockCollaborator);
    expect(service.findOne).toHaveBeenCalledWith('1234567890');
  });

  it('should update a collaborator', async () => {
    const dto: UpdateCollaboratorDto = { name: 'Jane Doe' };
    const result = await controller.update('1234567890', dto);
    expect(result).toEqual(mockCollaborator);
    expect(service.update).toHaveBeenCalledWith('1234567890', dto);
  });

  it('should delete a collaborator', async () => {
    const result = await controller.remove('1234567890');
    expect(result).toEqual(mockCollaborator);
    expect(service.remove).toHaveBeenCalledWith('1234567890');
  });
});
