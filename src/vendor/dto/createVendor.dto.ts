import { IsArray, IsNumber, IsString } from "class-validator"

export class VendorDto{
    @IsString()
    name:string
    
    @IsArray()
    @IsString({each:true})
    countries_supported:string[]

    @IsArray()
    @IsString({each:true})
    service_offered:string[]


}