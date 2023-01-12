import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from 'src/entities/cliente.entity';
import { Repository } from 'typeorm';
import { CreateClienteDto } from './dto/create-cliente.dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto/update-cliente.dto';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>, // clienteRepository pode ser qualquer nome
  ) {}
  //--------------Busca todos--------------------------------------
  findAll() {
    return this.clienteRepository.find();
  }

  //-----------------Busca Um-----------------------------------------
  findOne(id: string) {
    const cliente = this.clienteRepository.findOne({
      where: { id: Number(id) },
    });

    if (!cliente) {
      throw new NotAcceptableException(`Cliente ID ${id} Nao existe`);
    }
    return cliente;
  }

  //-------------------------Cria------------------------------------
  create(createClienteDto: CreateClienteDto) {
    const cliente = this.clienteRepository.create(createClienteDto);
    return this.clienteRepository.save(cliente);
  }

  //----------------------------Atualiza---------------------------
  async update(id: string, updateClienteDto: UpdateClienteDto) {
    const cliente = await this.clienteRepository.preload({
      id: +id,
      ...updateClienteDto,
    });
    if (!cliente) {
      throw new NotAcceptableException(`Cliente ID ${id} Nao existe`);
    }
    return this.clienteRepository.save(cliente);
  }

  //---------------------------Remove----------------------------------
  async remove(id: string) {
    const cliente = await this.clienteRepository.findOne({
      where: { id: Number(id) },
    });
    if (!cliente) {
      throw new NotAcceptableException(`Cliente ID ${id} Nao existe`);
    }
    return this.clienteRepository.remove(cliente);
  }
}
