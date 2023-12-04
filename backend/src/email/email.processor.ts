import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Mail } from './dto/mail.interface';
import { MailerService } from '@nestjs-modules/mailer';

@Processor('emailSending')
export class EmailProcessor {
  constructor(private readonly mailerService: MailerService) {}
  @Process('test')
  async sendTestEmail(job: Job<Mail>) {
    try {
      const res = await this.mailerService.sendMail({ ...job.data });
      console.log('The email stuff should be here', res);
    } catch (e) {
      console.log(e);
    }
  }
}
