import { Injectable } from "@nestjs/common";
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

export const QUEUE_INSTANCE = 'APP_QUEUE'
export const QUEUE_PROCESS = 'QUEUE_PROCESS'

@Injectable()
export class QueueService {
    constructor(@InjectQueue(QUEUE_INSTANCE) private queue: Queue) { }

    async addToQueue(data: any, delay?: number) {
        console.log('Ad to queue ==> ', data)
        await this.queue.add(QUEUE_PROCESS, data, {
            attempts: 3,
            delay,
        })
    }
}