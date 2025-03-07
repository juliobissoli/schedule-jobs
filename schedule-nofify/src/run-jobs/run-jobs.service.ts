import { Injectable } from '@nestjs/common';
import { CreateRunJobDto } from './dto/create-run-job.dto';
import { UpdateRunJobDto } from './dto/update-run-job.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IRunJobProcess, RunJob } from './entities/run-job.entity';
import { JobsService } from '../jobs/jobs.service';
import { Job } from '../jobs/entities/job.entity';
import { QueueService } from '../queue/queue.service';
import { IJourneyAction } from '../journeys/entities/journey.entity';
import { SenderService } from '../sender/sender.service';
import { IQueryFilters } from '../commom.interfaces';

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
        await this.addJobToQueue(job, date)

      })) // Fechamento do Promise.all
    }

  }

  async addJobToQueue(job: Job, date: Date) {

    date.setUTCHours(0, 0, 0, 0)

    const runJob: CreateRunJobDto = {
      job: job.id,
      dateInit: date,
      status: 'created',
      totalActions: job.journey.actions.length,
      collaboratorName: job.collaboratorName,
      journeyName: job.journey.name,
      isSequential: job.journey.isSequential,
      log: []
    }

    try {
      const newRunJob = await this.create(runJob)

      if (job?.journey && job.journey.actions.length > 0) {
         const delay = (job?.hour ?? 0) * 1000 * 60 * 60 


        // Se a jornada não sequancial adiciona apenas a primaiera action
        if (job.journey.isSequential) {
          const action = job.journey.actions[0]
          this.handleAddJobToQueue(action, newRunJob.id, delay)
        }

        // Adiciona todas caso contrario
        else {
          job.journey.actions.map((action: IJourneyAction) => {
            this.handleAddJobToQueue(action, newRunJob.id, delay)
            return action.trigger
          })
        }
      }
    } catch (error) {
      console.log('Job não adicionado, já foi existe na fila de execução')
    }


  }

  handleAddJobToQueue(action: IJourneyAction, runnerId: string, delay?: number) {

    const queueItem: IRunJobProcess = {
      action: action,
      runnerId,
    }

    this.queueService.addToQueue(queueItem, delay)
  }


  async processJob(data: IRunJobProcess) {
    console.log('============= PROCESSA ITEM NA FILA  =============\n ', data.action.trigger)


    const runJob = await this.runJobModel.findById(data.runnerId).populate({
      path: 'job',
      populate: { path: 'journey' } // Populando a jornada dentro do job
    });

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

    runJob.status = statusExec
    runJob.totalAttempts += 1;
    runJob.actionsCompleted = statusExec === 'completed' ? runJob.actionsCompleted + 1 : runJob.actionsCompleted;


    if (runJob.totalActions === runJob.actionsCompleted && !runJob.job.daily) {
      await this.jobService.update(runJob.job.id, { status: 'completed', completedAt: new Date().toISOString() }) // Adicionado o ID do trabalho
    }


    if (runJob.isSequential && runJob.totalActions > runJob.actionsCompleted && runJob.totalAttempts < 10) {
      const nextAction = runJob.job.journey.actions[runJob.actionsCompleted]

      // Adiciona a proxia action na fila
      this.handleAddJobToQueue(nextAction, runJob.id)
    }



    await runJob.save();

  }


  async handleAction(action: IJourneyAction, job: Job): Promise<'completed' | 'error'> {
    try {

      /** AQUI DEVE FICAR A IMPLEMENTAÇÃO DE CADA TRIGGER */

      console.log('Send email ==> ', job.collaboratorEmail, 'payload => ', action.payload)
      await this.senderService.senEmail([job.collaboratorEmail as string], 'teste', action.payload)
      return 'completed'
    } catch (error) {
      return 'error'
    }

  }
}
