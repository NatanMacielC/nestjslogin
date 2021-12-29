import { Injectable, Inject, HttpException, HttpStatus, forwardRef } from '@nestjs/common';
import { ResultDto } from 'src/dto/result.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Token } from './token.entity';
import { UserService } from 'src/user/user.service';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/user/user.entity';

@Injectable()
export class TokenService {
  constructor(
    @Inject('TOKEN_REPOSITORY')
    private tokenRepository: Repository<Token>,
    private userService: UserService,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService
  ) {}

  async save(hash: string, username: string){
    let objToken = await this.tokenRepository.findOne({username: username})
    if (objToken){
      this.tokenRepository.update(objToken.id, {
        hash: hash
      })
    }else{
      this.tokenRepository.insert({
        hash: hash,
        username: username
      })
    }
  }

  async refreshToken(oldToken: string){
    let objToken = await this.tokenRepository.findOne({ hash: oldToken })
    if (objToken){
      let user = await this.userService.findOne(objToken.username)      
      return this.authService.login(user)
    }else{ //é uma requisição inválida
      return new HttpException({
        errorMessage: 'Token inválido'
      }, HttpStatus.UNAUTHORIZED)
    }
  }

  async getUserByToken(token: string): Promise<User>{
    token = token.replace("Bearer ","").trim()
    let objToken: Token = await this.tokenRepository.findOne({hash: token})
    if (objToken){
      let user = await this.userService.findOne(objToken.username)      
      return user
    }else{ //é uma requisição inválida
      return null
    }
  }
}