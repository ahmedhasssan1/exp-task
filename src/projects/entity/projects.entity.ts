import { Clients } from "src/clients/entity/clients.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'Projects'})
export class Projects{
    @PrimaryGeneratedColumn()
    id:number

    @ManyToOne(() => Clients, client => client.id, { eager: true, onDelete: 'CASCADE' })
    @JoinColumn({name:'client_id'})
    client:Clients

    @Column({type:String})
    country:string

    @Column({type:String})
    name:string

    @Column({type:'simple-array'})
    service_nedded:string[]

    @Column({type:Number})
    budget:number

    @Column({type:String})
    status:string

}