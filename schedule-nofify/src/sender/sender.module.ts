import { Module } from '@nestjs/common';
import { SenderService } from './sender.service';
import { Resend } from 'resend';
import { ResendModule } from 'nest-resend';

@Module({
    imports: [
        ResendModule.forRoot({
            apiKey: process.env.RESEND_API_KEY ?? 're_xasxasxasxas',
        }),
    ],
    providers: [SenderService],
    exports: [SenderService]
})
export class SenderModule { }
