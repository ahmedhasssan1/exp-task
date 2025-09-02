import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Vendor' })
export class Vendor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String })
  name: string;

  @Column({ type: 'simple-array' })
  countries_supported: string[];

  @Column({ type: 'simple-array' })
  service_offered: string[];

  @Column({ type: 'float', default: 0 })
  rating: number;

  @Column({ type: 'int', default: 24})
  response_sla_hours: number;
  
  @Column({ type: 'boolean', default: false })
  sla_expired: boolean;
  
    @CreateDateColumn({type:'timestamp'})
    created_at:Date
}
