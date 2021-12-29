import { Injectable, Inject } from '@nestjs/common';
import { ResultDto } from 'src/dto/result.dto';
import { Repository } from 'typeorm';
import { UserRegisterDto } from './dto/user.register.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async listar(): Promise<User[]> {
    return this.userRepository.find();
  }

  async cadastrar(data: UserRegisterDto): Promise<ResultDto>{
    let user = new User()
    user.email = data.email
    user.nome = data.nome
    user.password = bcrypt.hashSync(data.senha, 8)
    user.telefone = data.telefone
    user.cpf = data.cpf
    return this.userRepository.save(user)
    .then((result) => {
      return <ResultDto>{
        status: true,
        mensagem: "Usuário cadastrado com sucesso"
      }
    })
    .catch((error) => {
      return <ResultDto>{
        status: false,
        mensagem: "Houve um errro ao cadastrar o usuário"
      }
    })    
  }
  
  async findOne(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({email: email});
  }
}