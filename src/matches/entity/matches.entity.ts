import { Projects } from "src/projects/entity/projects.entity";
import { Vendor } from "src/vendor/entity/vendor.entity";
import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({name:'Matches'})
@Unique(['project_id','vendor_id'])
@Index('index_projrct_vendor',['project_id','vendor_id'])
export class Matches{
    @PrimaryGeneratedColumn()
    id:number

    @ManyToOne(() => Projects, project => project.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'project_id' })
    project_id: Projects;

    @ManyToOne(()=>Vendor,vendor=>vendor.id,{onDelete:'CASCADE'})
    @JoinColumn({name:"vendor_id"})
    vendor_id:Vendor

    @Column({type:"float"})
    score:number

    @CreateDateColumn()
    create_at:Date
}
