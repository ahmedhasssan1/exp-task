import { Projects } from "src/projects/entity/projects.entity";
import { Vendor } from "src/vendor/entity/vendor.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'Matches'})
export class Matches{
    @PrimaryGeneratedColumn()
    id:number

    @ManyToOne(() => Projects, project => project.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'project_id' })
    project: Projects;

    @ManyToOne(()=>Vendor,vendor=>vendor.id,{onDelete:'CASCADE'})
    @JoinColumn({name:"vendor_id"})

    @Column({type:"float"})
    score:number

    @CreateDateColumn()
    create_at:Date
}
