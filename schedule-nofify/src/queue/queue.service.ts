import { Injectable } from "@nestjs/common";
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { IRunJobProcess } from "src/run-jobs/entities/run-job.entity";

export const QUEUE_INSTANCE = 'APP_QUEUE'
export const QUEUE_PROCESS = 'QUEUE_PROCESS'

@Injectable()
export class QueueService {
    constructor(@InjectQueue(QUEUE_INSTANCE) private queue: Queue) { }

    async addToQueue(data: IRunJobProcess, delay?: number) {
        console.log('============= NOVO ITEM NA FILA  =============\n ', data.action.trigger)
        await this.queue.add(QUEUE_PROCESS, data, {
            attempts: 3,
            delay,
        })
    }
}