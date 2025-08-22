import { ArrayNotEmpty, IsArray, IsNumber, IsString } from "class-validator"

export class ProjectDto{
    @IsNumber()
    client_id:number
    
    @IsString()
    country:string

    @IsArray()
    @ArrayNotEmpty()
    @IsString({each:true})
    service_nedded:string[]

    @IsNumber()
    budget:number

    @IsString()
    status:string
}