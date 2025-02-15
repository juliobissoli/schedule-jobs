import { Test, TestingModule } from '@nestjs/testing';
import { CollaboratorsService } from './collaborators.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Collaborator, CollaboratorDocument } from './entities/collaborator.entity';
import { BadRequestException } from '@nestjs/common';

const mockCollaborator = {
  _id: '1234567890',
  name: 'John Doe',
  email: 'john@example.com',
  phone: '552999273298',
  createdAt: new Date(),
};

const mockCollaboratorModel = {
  findOne: jest.fn(),
  find: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue([mockCollaborator]) }),
  countDocuments: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(1) }),
  findById: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(mockCollaborator) }),
  findByIdAndUpdate: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(mockCollaborator) }),
  findByIdAndDelete: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(mockCollaborator) }),
  create: jest.fn().mockImplementation((dto) => Promise.resolve({ _id: '1234567890', ...dto })),
};

describe('CollaboratorsService', () => {
  let service: CollaboratorsService;
  let model: Model<CollaboratorDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CollaboratorsService,
        {
          provide: getModelToken(Collaborator.name, 'default'),
          useValue: mockCollaboratorModel,
        },
      ],
    }).compile();

    service = module.get<CollaboratorsService>(CollaboratorsService);
    model = module.get<Model<CollaboratorDocument>>(getModelToken(Collaborator.name, 'default'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('should throw error when email is already in use', async () => {
    jest.spyOn(model, 'findOne').mockReturnValueOnce({ exec: jest.fn().mockResolvedValue(mockCollaborator) } as any);
    await expect(
      service.create({ name: 'John Doe', email: 'john@example.com', phone: '552999273298' })
    ).rejects.toThrow(BadRequestException);
  });

  it('should find a collaborator by ID', async () => {
    jest.spyOn(model, 'findById').mockReturnValueOnce({ exec: jest.fn().mockResolvedValue(mockCollaborator) } as any);
    const result = await service.findOne('1234567890');
    expect(result).toEqual(mockCollaborator);
  });

  it('should update a collaborator', async () => {
    jest.spyOn(model, 'findByIdAndUpdate').mockReturnValueOnce({ exec: jest.fn().mockResolvedValue(mockCollaborator) } as any);
    const result = await service.update('1234567890', { name: 'Jane Doe' });
    expect(result).toEqual(mockCollaborator);
  });

  it('should delete a collaborator', async () => {
    jest.spyOn(model, 'findByIdAndDelete').mockReturnValueOnce({ exec: jest.fn().mockResolvedValue(mockCollaborator) } as any);
    const result = await service.remove('1234567890');
    expect(result).toEqual(mockCollaborator);
  });
});
