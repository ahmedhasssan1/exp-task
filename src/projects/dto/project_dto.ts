import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProjectDto {
  @IsNotEmpty()
  @IsNumber()
  clientId: number;
  @IsString()
  country: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  service_nedded: string[];

  @IsNumber()
  budget: number;

  @IsString()
  status: string;
}
