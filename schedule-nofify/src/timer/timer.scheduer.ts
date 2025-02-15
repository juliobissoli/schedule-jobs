import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { RunJobsService } from "src/run-jobs/run-jobs.service";

@Injectable()
export class TimerScheduler {
    constructor(
        private runJobService: RunJobsService,
    ) {}

    @Cron(CronExpression.EVERY_10_SECONDS)
    // @Cron('45 * * * * *')
    async scheduleDailyJobs() {

        // con st jobs = await this.jobService.findByDay(new Date())

        console.log('==================== CRON START JOBS TODAY ================')
        this.runJobService.startByDay()
        // this.logger.debug('Called when the current second is 45');

    }
}
