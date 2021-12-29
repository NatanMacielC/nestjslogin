import { Injectable, Inject } from '@nestjs/common';
import { ResultDto } from 'src/dto/result.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Service } from './service.entity';
import { ServiceRegisterDto } from './dto/service.register.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class ServiceService {
  constructor(
    @Inject('SERVICO_REPOSITORY')
    private servicoRepository: Repository<Service>,
  ) {}

  async cadastrar(data: ServiceRegisterDto, user: User): Promise<ResultDto>{
    let service = new Service()
    service.titulo = data.titulo
    service.descricao = data.descricao
    service.user = user
    return this.servicoRepository.save(service).then(() => {
      return <ResultDto>{
        status: true,
        mensagem: "Serviço cadastrado com sucesso"
      }
    }).catch(() => {
      return <ResultDto>{
        status: false,
        mensagem: "Houve um erro ao cadastrar o serviço"
      }
    })
  }
}