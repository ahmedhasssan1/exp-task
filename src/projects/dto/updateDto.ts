import { IsNumber, IsString } from "class-validator";

export class UpdateDto{
    @IsNumber()
    id:number

    @IsString()
    status:string
}