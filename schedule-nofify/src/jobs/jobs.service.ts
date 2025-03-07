import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateJobDto, CreateJobDtoValidator } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { IJobQueryFilters, Job } from './entities/job.entity';
import { Collaborator } from '../collaborators/entities/collaborator.entity';
import { Journey } from '../journeys/entities/journey.entity';


@Injectable()
export class JobsService  {
  constructor(
    @InjectModel(Job.name, 'default') private readonly jobModel: Model<Job>,
    @InjectModel(Collaborator.name, 'default') private readonly collaboratorModel: Model<Collaborator>,
    @InjectModel(Journey.name, 'default') private readonly journeyModel: Model<Journey>, 
  ) { }

  async create(createJobDto: CreateJobDto) {

    const { error } = CreateJobDtoValidator.validate(createJobDto)

    if(error) {
      throw new BadRequestException(error.details.map((d) => d.message).join(', '));

    }

    const collaborator = await this.collaboratorModel.findById(createJobDto.collaborator).exec();
    if (!collaborator) {
      throw new NotFoundException('Collaborator not found');
    }

    const journey = await this.journeyModel.findById(createJobDto.journey).exec();
    if (!journey) {
      throw new NotFoundException('Journey not found');
    }


    const createdJob = new this.jobModel({
      ...createJobDto,
      status: 'created',
      collaboratorEmail: collaborator.email,
      collaboratorPhone: collaborator.phone,
      collaboratorName: collaborator.name,
    });

    const newJob = await createdJob.save();
    
    collaborator.totalJobs += 1
    await collaborator.save()

    journey.totalJobs += 1
    await journey.save()

    return newJob
  }

  
  async findAll(params?: IJobQueryFilters) {
    const { page = 1, perPage = 10, collaboratorId, journeyId } = params || {};
    const skip = (page - 1) * perPage;


    const query: any = {};
    if (collaboratorId) {
      query.collaborator = collaboratorId; // Filtra por collaboratorId
    }
    if (journeyId) {
      query.journey = journeyId; // Filtra por journeyId
    }

    const [rows, total] = await Promise.all([
      this.jobModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(perPage).populate('journey').exec(),
      this.jobModel.countDocuments(query).exec() // Conta documentos com o mesmo filtro
    ]);
    return {
      rows,
      page,
      perPage,
      total
    }

    // return this.jobModel.find().exec();
  }


  async findByDay(date: Date) {

    // date = new Date()
    
    const initDate = new Date(date); // Um dia antes
    initDate.setUTCHours(0, 0, 0, 0); // Hora ajustada para 00:00:00.000 em GMT 0

    const endDate = new Date(date);
    endDate.setUTCHours(23, 59, 59, 999); 


    return this.jobModel
      .find({
        $or: [
          { startDate: { $gte: initDate, $lt:  endDate }},
          { startDate: { $lt: date }, daily: true }
        ]
      })
      .populate('journey')
      .exec();
  }

  async findOne(id: string) {
    return this.jobModel.findById(id).populate('journey').exec();
  }

  async update(id: string, updateJobDto: UpdateJobDto) {
    return this.jobModel.findByIdAndUpdate(id, updateJobDto, { new: true }).exec();
  }

  async remove(id: string) {
    return this.jobModel.findByIdAndDelete(id).exec();
  }
}
