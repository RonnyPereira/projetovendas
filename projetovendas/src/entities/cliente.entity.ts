import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column('json', { nullable: true })
  vendedor: string[];

  @Column('json', { nullable: true })
  produto: string[];
}
