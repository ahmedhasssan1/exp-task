import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'Admin'})
export class Admin{
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:String})
    name:string

    @Column({type:String})
    email:string

    @Column({type:String})
    password:string
}