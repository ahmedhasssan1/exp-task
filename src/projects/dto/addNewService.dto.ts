import { IsNumber, IsString, isString } from "class-validator";

export class NewServiceDto{

    @IsNumber()
    projectId:number

    @IsString()
    service:string

}