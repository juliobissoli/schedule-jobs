import { Process, Processor } from "@nestjs/bull";
import { QUEUE_INSTANCE, QUEUE_PROCESS } from "./queue.service";
import { Job as BullJob } from 'bull';
import { RunJobsService } from "src/run-jobs/run-jobs.service";

@Processor(QUEUE_INSTANCE)
export class QueueProcessor {
    constructor(
        private runJobService: RunJobsService
    ){}


    @Process(QUEUE_PROCESS)
    async handleProcess(item: BullJob) {
        console.log('Vai processar a fila ==> ', item.data)
        await this.runJobService.processJob(item.data)
    }
}