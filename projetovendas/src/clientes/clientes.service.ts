import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Cliente } from 'src/entities/cliente.entity';

@Injectable()
export class ClientesService {
  private clientes: Cliente[] = [
    {
      id: 1,
      nome: 'Ronny',
      endereco: 'Tv tucandeiras',
      contato: '(92)-56464',
      vendedor: ['vendedor1', 'vendedor2'],
      produto: ['produto1', 'produto2'],
    },
  ];

  findAll() {
    return this.clientes;
  }

  findOne(id: string) {
    const cliente = this.clientes.find(
      (cliente: Cliente) => cliente.id === Number(id),
    );
    //
    if (!cliente) {
      throw new HttpException(
        `Cliente ID ${id} Nao existe`,
        HttpStatus.NOT_FOUND,
      );
    }
    return cliente;
  }

  create(createClienteDto: any) {
    this.clientes.push(createClienteDto);
  }

  update(id: string, updateClienteDto: any) {
    const indexClinte = this.clientes.findIndex(
      (cliente: Cliente) => cliente.id === Number(id),
    );
    this.clientes[indexClinte] = updateClienteDto;
  }

  remove(id: string) {
    const indexClinte = this.clientes.findIndex(
      (cliente: Cliente) => cliente.id === Number(id),
    );
    if (indexClinte >= 0) {
      this.clientes.splice(indexClinte, 1);
    }
  }
}
