import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Vendedor } from './vendedor.entity';

@Entity('Clientes')
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  endereco: string;

  @Column()
  contato: string;

  @JoinTable()
  @ManyToMany(() => Vendedor, (vendedor: Vendedor) => vendedor.clientes, {
    cascade: true,
  })
  vendedor: Vendedor[];

  @Column('json', { nullable: true })
  produto: string[];
}
