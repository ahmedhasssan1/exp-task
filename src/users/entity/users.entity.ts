import { User_enum } from "src/auth/dto/user.enum";
import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({name:"Users"})
export class Users{
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:String})
    name:string

    @Column({type:String,unique:true})
    email:string

    @Column({type:String})
    password:string

    @Column({type:'enum',enum:User_enum})
    role:User_enum

}