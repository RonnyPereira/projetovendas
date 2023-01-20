import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from 'src/entities/cliente.entity';
import { Vendedor } from 'src/entities/vendedor.entity';
import { ClientesController } from './clientes.controller';
import { ClientesService } from './clientes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente, Vendedor])],
  controllers: [ClientesController],
  providers: [ClientesService],
})
export class ClientesModule {}
