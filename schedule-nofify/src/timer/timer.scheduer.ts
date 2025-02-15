import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { RunJobsService } from "src/run-jobs/run-jobs.service";

@Injectable()
export class TimerScheduler {
    constructor(
        private runJobService: RunJobsService,
        // private cronExpression: CronExpression
    ) {
        // this.cronExpression = process.env.NODE_ENV === 'development'  ?  CronExpression.EVERY_10_SECONDS :  CronExpression.EVERY_DAY_AT_MIDNIGHT
    }

    
    @Cron(CronExpression.EVERY_10_MINUTES)
    async scheduleDailyJobs() {
        console.log('==================== CRON START JOBS TODAY ================')
        this.runJobService.startByDay()

    }
}
