import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCollaboratorDto, CreateCollaboratorDtoValidator } from './dto/create-collaborator.dto';
import { UpdateCollaboratorDto } from './dto/update-collaborator.dto';
import { Collaborator, CollaboratorDocument } from './entities/collaborator.entity';
import { IQueryFilters } from 'src/commom.interfaces';

@Injectable()
export class CollaboratorsService {
  constructor(
    @InjectModel(Collaborator.name, 'default')
    private collaboratorModel: Model<CollaboratorDocument>,
  ) { }

  async create(createCollaboratorDto: CreateCollaboratorDto) {

    const { error } = CreateCollaboratorDtoValidator.validate(createCollaboratorDto)

    if (error) {
      throw new BadRequestException(error.details.map((d) => d.message).join(', '));
    }

    const existingCollaborator = await this.collaboratorModel.findOne({ email: createCollaboratorDto.email }).exec();
    if (existingCollaborator) {
      throw new BadRequestException('Já existe um colaborador com este email.');
    }

    const collaborator = new this.collaboratorModel(createCollaboratorDto);
    return collaborator.save();
  }

  async findAll(params?: IQueryFilters) {

    const { page = 1, perPage = 10 } = params || {};
    const skip = (page - 1) * perPage;
    const [rows, total] = await Promise.all([
      this.collaboratorModel.find().sort({ createdAt: 1 }).skip(skip).limit(perPage).exec(),
      this.collaboratorModel.countDocuments().exec()
    ]);
    return {
      rows,
      page,
      perPage,
      total
    }

    // return this.collaboratorModel.find().exec();
  }

  async findOne(id: string) {
    return this.collaboratorModel.findById(id).exec();
  }


  async update(id: string, updateCollaboratorDto: UpdateCollaboratorDto) {
    return this.collaboratorModel.findByIdAndUpdate(id, updateCollaboratorDto, { new: true }).exec();
  }

  async remove(id: string) {
    return this.collaboratorModel.findByIdAndDelete(id).exec();
  }
}
