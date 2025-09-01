import { IsString } from 'class-validator';

export class SendEmail {
  @IsString()
  email: string;
  @IsString()
  name: string;
  @IsString()
  projectName: string;
  @IsString()
  vendorName: string;
}
