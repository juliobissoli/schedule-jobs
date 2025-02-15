import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { RunJobsService } from "src/run-jobs/run-jobs.service";

@Injectable()
export class TimerScheduler {
    constructor(
        private runJobService: RunJobsService,
    ) {}

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    // @Cron('45 * * * * *')
    async scheduleDailyJobs() {

        console.log('==================== CRON START JOBS TODAY ================')
        this.runJobService.startByDay()
        // this.logger.debug('Called when the current second is 45');

    }
}
