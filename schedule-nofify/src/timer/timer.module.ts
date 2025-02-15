import { Module } from '@nestjs/common';
import { TimerScheduler } from './timer.scheduer';
import { RunJobsService } from 'src/run-jobs/run-jobs.service';
import { RunJobsModule } from 'src/run-jobs/run-jobs.module';

@Module({
    providers: [TimerScheduler],
    imports: [ RunJobsModule ],
})
export class TimerModule {}
