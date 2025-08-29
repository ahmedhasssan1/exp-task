import { IsNumber } from "class-validator";

export class matchDto{
    @IsNumber()
    projectId:number

    @IsNumber()
    vendorId:number

    @IsNumber()
    score:number

}