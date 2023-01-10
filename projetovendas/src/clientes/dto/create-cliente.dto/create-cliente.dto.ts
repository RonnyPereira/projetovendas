import { IsString } from 'class-validator';

export class CreateClienteDto {
  @IsString()
  readonly nome: string;
  @IsString()
  readonly endereco: string;
  @IsString()
  readonly contato: string;
  @IsString({ each: true })
  readonly vendedor: string[];
  @IsString({ each: true }) // possivel problema, vou precisar do valor do produto que e number
  readonly produto: string[];
}
