import { Injectable } from "@nestjs/common";
import { InjectResend } from "nest-resend";
import { Resend } from "resend";


@Injectable()
export class SenderService {
    public constructor(@InjectResend() private readonly resendClient: Resend) {}


    async senEmail(emails: string[], subject: string, text: string) {
        return await this.resendClient.emails.send({
             from: 'Julio <contato@heepy.pro>',
             to: emails,
             subject,
             html: `<span>${text}</span>`,
         });


    }
}