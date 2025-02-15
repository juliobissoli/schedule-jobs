
import { Injectable, Logger} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Cron, CronExpression } from "@nestjs/schedule";
import { JobsService } from "src/jobs/jobs.service";

@Injectable()
export class QueueScheduler {
    // constructor(
    //     private jobService: JobsService,
    // ) {}
    // private readonly logger = new Logger(QueueScheduler.name);

    // // @Cron(CronExpression.EVERY_10_SECONDS)
    // @Cron('45 * * * * *')
    // async scheduleDailyJobs() {

    //     const jobs = await this.jobService.findByDay(new Date())

    //     console.log('ta jobs ==> ', jobs)
    //     this.logger.debug('Called when the current second is 45');

    // }
}