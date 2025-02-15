import { Module, forwardRef } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { QUEUE_INSTANCE, QueueService } from './queue.service';
import { QueueProcessor } from './queue.processor';
import { RunJobsModule } from 'src/run-jobs/run-jobs.module';

@Module({
    imports: [
        forwardRef(() => RunJobsModule), // Usando forwardRef aqui também
        BullModule.forRoot({
            // Configurações do Bull
            redis: {
                host: process.env.REDIS_HOST || 'localhost',
                port: parseInt(process.env.REDIS_PORT || '6379'),
            },
        }),
        BullModule.registerQueue({
            name: QUEUE_INSTANCE,
        }),
    ],
    providers: [QueueService, QueueProcessor],
    exports: [QueueService]
})
export class QueueModule { }
