import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Mail } from './dto/mail.interface';
import { MailerService } from '@nestjs-modules/mailer';

@Processor('emailSending')
export class EmailProcessor {
  constructor(private readonly mailerService: MailerService) {}
  @Process('test')
  async sendTestEmail(job: Job<Mail>) {
    const { data } = job;
    console.log('Test email sending');
    try {
      const res = await this.mailerService.sendMail({ ...data });
      console.log('The email stuff should be here', res);
    } catch (e) {
      console.log(e);
    }
  }
}
