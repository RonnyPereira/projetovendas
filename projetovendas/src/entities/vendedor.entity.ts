import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cliente } from './cliente.entity';

@Entity('vendedores')
export class Vendedor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Cliente, (cliente: Cliente) => cliente.vendedor)
  clientes: Cliente[];
}
