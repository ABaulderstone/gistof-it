import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { Mail } from './dto/mail.interface';

@Injectable()
export class EmailService {
  constructor(
    @InjectQueue('emailSending') private readonly emailQueue: Queue,
  ) {}

  async addEmailToQueue(data: Mail) {
    const job = await this.emailQueue.add('test', data);
    console.log(typeof job.id);
  }
}
