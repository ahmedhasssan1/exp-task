import { IsString } from "class-validator"

export class ClientDto{
    @IsString()
    name:string

    @IsString()
    company_name:string

    @IsString()
    contact_email:string

    @IsString()
    password:string
}