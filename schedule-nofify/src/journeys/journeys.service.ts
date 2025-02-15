import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateJourneyDto, CreateJourneyDtoValidator } from './dto/create-journey.dto';
import { UpdateJourneyDto } from './dto/update-journey.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Journey, JourneyDocument, JourneySchema } from './entities/journey.entity';
import { IQueryFilters } from 'src/commom.interfaces';

@Injectable()
export class JourneysService {
  constructor(
    @InjectModel(Journey.name, 'default')
    private journeyModel: Model<JourneyDocument>
  ) { }

  create(createJourneyDto: CreateJourneyDto) {

    const { error } = CreateJourneyDtoValidator.validate(createJourneyDto)

    if (error) {
      throw new BadRequestException(error.details.map((d) => d.message).join(', '));

    }
    const newJourney = new this.journeyModel(createJourneyDto);
    return newJourney.save();
  }

  async findAll(params?: IQueryFilters) {

    const { page = 1, perPage = 10 } = params || {};
    const skip = (page - 1) * perPage;
    const [rows, total] = await Promise.all([
      this.journeyModel.find().sort({ createdAt: -1 }).skip(skip).limit(perPage).exec(),
      this.journeyModel.countDocuments().exec()
    ]);

    return {
      rows,
      page,
      perPage,
      total
    }
  }

  findOne(id: string) {
    return this.journeyModel.findById(id).exec();
  }

  update(id: string, updateJourneyDto: UpdateJourneyDto) {
    return this.journeyModel.findByIdAndUpdate(id, updateJourneyDto, { new: true }).exec();
  }

  async remove(id: string) {
    return this.journeyModel.findByIdAndUpdate(id, { status: 'deleted' }, { new: true }).exec();
  }
}