import { Injectable } from '@nestjs/common';
import { CreateRunJobDto } from './dto/create-run-job.dto';
import { UpdateRunJobDto } from './dto/update-run-job.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IRunJobProcess, RunJob } from './entities/run-job.entity';
import { JobsService } from 'src/jobs/jobs.service';
import { Job } from 'src/jobs/entities/job.entity';
import { QueueService } from 'src/queue/queue.service';
import { IJourneyAction } from 'src/journeys/entities/journey.entity';
import { SenderService } from 'src/sender/sender.service';
import { IQueryFilters } from 'src/commom.interfaces';

@Injectable()
export class RunJobsService {
  constructor(
    @InjectModel(RunJob.name, 'default') private readonly runJobModel: Model<RunJob>,
    private jobService: JobsService,
    private queueService: QueueService,
    private senderService: SenderService

  ) { }

  async create(createRunJobDto: CreateRunJobDto) {

    const existingRunJob = await this.runJobModel.findOne({
      job: createRunJobDto.job,
      dateInit: createRunJobDto.dateInit
    }).exec();

    if (existingRunJob) {
      throw new Error('Já existe um RunJob para este Job nesse dia.');
    }

    const newRunJob = new this.runJobModel(createRunJobDto);
    return newRunJob.save();
  }

  async findAll(params?: IQueryFilters) {
    const { page = 1, perPage = 10 } = params || {};
    const skip = (page - 1) * perPage;
    const [rows, total] = await Promise.all([
      this.runJobModel.find().sort({ createdAt: -1 }).skip(skip).limit(perPage).exec(),
      this.runJobModel.countDocuments().exec()
    ]);
    return {
      rows,
      page,
      perPage,
      total
    }
  }

  findOne(id: string) {
    return this.runJobModel.findById(id).exec();
  }

  update(id: string, updateRunJobDto: UpdateRunJobDto) {
    return this.runJobModel.findByIdAndUpdate(id, updateRunJobDto, { new: true }).exec();
  }

  remove(id: string) {
    return this.runJobModel.findByIdAndDelete(id).exec();
  }

  async startByDay(date: Date = new Date()) {
    console.log(`======= Obtem todos os Jobs da dia :  ${date.toISOString()}========`)



    const jobsByDate = await this.jobService.findByDay(date)


    if (jobsByDate.length > 0) {
      await Promise.all(jobsByDate.map(async (job: Job) => {
        await this.addJodToQueue(job, date)

      })) // Fechamento do Promise.all
    }

  }

  async addJodToQueue(job: Job, date: Date) {

    date.setUTCHours(0, 0, 0, 0)

    const runJob: CreateRunJobDto = {
      job: job.id,
      dateInit: date,
      status: 'created',
      totalActions: job.journey.actions.length,
      collaboratorName: job.collaboratorName,
      journeyName: job.journey.name,
      log: []
    }

    try {
      const newRunJob = await this.create(runJob) // Mantido o await aqui
      if (job?.journey && job.journey.actions.length > 0) {
        job.journey.actions.map((action: IJourneyAction) => {

          const queueItem: IRunJobProcess = {
            runnerId: newRunJob.id,
            jobId: job.id,
            journeyId: job.journey.id,
            collaboratorId: job.collaborator.id,
            action: action,
          }
          const delay = job?.delay
          this.queueService.addToQueue(queueItem, delay)

          return action.trigger
        })
      }

    } catch (error) {
      console.log('Job não adicionado já exciste na fila de execução')
    }


  }


  async processJob(data: IRunJobProcess) {
    console.log(data)

    const runJob = await this.runJobModel.findById(data.runnerId).populate('job');

    if (!runJob || !runJob.job) {
      throw new Error('Execução não encontrada.');

    }

    const statusExec = await this.handleAction(data.action, runJob.job)

    runJob.log.push({
      date: new Date(),
      status: statusExec,
      actionTrigger: data.action.trigger,
      payload: data.action.payload,
    });

    runJob.status = statusExec;
    runJob.actionsCompleted += 1;
    runJob.totalAttempts += 1;

    await runJob.save();

    console.log('RunJob encontrado:', runJob);



  }


  async handleAction(action: IJourneyAction, job: Job) {
    try {
      console.log('Vai mandar email ==> ', job.collaboratorEmail)
      await this.senderService.senEmail([job.collaboratorEmail as string], 'teste', action.payload)
      return 'completed'
    } catch (error) {
      return 'error'
    }

  }
}
