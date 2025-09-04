import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    console.log('debugging ',"asfffffff");
    return 'Hello World!';
    
  }
}
