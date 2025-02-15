import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { RunJobsService } from "src/run-jobs/run-jobs.service";

@Injectable()
export class TimerScheduler {
    constructor(
        private runJobService: RunJobsService,
    ) {}

    @Cron( process.env.NODE_ENV === 'development'  ? CronExpression.EVERY_10_MINUTES : CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async scheduleDailyJobs() {
        console.log('==================== CRON START JOBS TODAY ================')
        this.runJobService.startByDay()

    }
}
