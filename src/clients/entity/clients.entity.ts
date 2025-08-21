import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'clients'})
export class Clients{
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:String})
    name:string

    @Column({type:String})
    company_name:string

    @Column({type:String})
    contact_email:string

    @Column({type:String})
    password:string


}