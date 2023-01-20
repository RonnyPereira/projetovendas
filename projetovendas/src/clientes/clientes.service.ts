import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from 'src/entities/cliente.entity';
import { Vendedor } from 'src/entities/vendedor.entity';
import { Repository } from 'typeorm';
import { CreateClienteDto } from './dto/create-cliente.dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto/update-cliente.dto';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>, // clienteRepository pode ser qualquer nome

    @InjectRepository(Vendedor)
    private readonly vendedorRepository: Repository<Vendedor>,
  ) {}
  //--------------Busca todos--------------------------------------
  findAll() {
    return this.clienteRepository.find({
      relations: ['vendedor'],
    });
  }

  //-----------------Busca Um-----------------------------------------
  findOne(id: string) {
    const cliente = this.clienteRepository.findOne({
      where: { id: Number(id) },
      relations: ['vendedor'],
    });

    if (!cliente) {
      throw new NotAcceptableException(`Cliente ID ${id} Nao existe`);
    }
    return cliente;
  }

  //-------------------------Cria------------------------------------
  async create(createClienteDto: CreateClienteDto) {
    //criando as variaveis do relacionamento
    const vendedor = await Promise.all(
      createClienteDto.vendedor.map((name) => this.preloadVendedorByName(name)),
    );

    //--------Final-------

    const cliente = this.clienteRepository.create({
      ...createClienteDto,
      vendedor,
    });
    return this.clienteRepository.save(cliente);
  }

  //----------------------------Atualiza---------------------------
  async update(id: string, updateClienteDto: UpdateClienteDto) {
    //Atualiza  as variaveis do relacionamento
    const vendedor =
      updateClienteDto.vendedor &&
      (await Promise.all(
        updateClienteDto.vendedor.map((name) =>
          this.preloadVendedorByName(name),
        ),
      ));

    const cliente = await this.clienteRepository.preload({
      id: +id,
      ...updateClienteDto,
      vendedor,
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

  // -----------------Metodo para controlar o relacionamento ------------
  private async preloadVendedorByName(name: string): Promise<Vendedor> {
    const vendedor = await this.vendedorRepository.findOne({ where: { name } });

    if (vendedor) {
      return vendedor;
    }
    return this.vendedorRepository.create({ name });
  }
}
