import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'Vendor'})
export class Vendor{
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:String})
    name:string

    @Column({type:'simple-array'})
    countries_supported:string[]

    @Column({type:'simple-array'})
    service_offered:string[]

    @Column({type:Number})
    rating:number

    @Column({type:Number})
    response_sla_hours:number
    



}