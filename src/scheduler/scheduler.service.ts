import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';

@Injectable()
export class SchedulerService {
    constructor(@InjectQueue('match-queue')private MatchQueue:Queue){}
}
