import { Body, Controller, Get, HttpException, HttpStatus, Post, Put, Req, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ResultDto } from 'src/dto/result.dto';
import { TokenService } from 'src/token/token.service';
import { User } from 'src/user/user.entity';
import { ServiceRegisterDto } from './dto/service.register.dto';
import { ServiceService } from './service.service';

@Controller('servico')
export class ServiceController {
  constructor(private readonly servicoService: ServiceService, 
    private readonly tokenService: TokenService) {}
  
  @UseGuards(JwtAuthGuard)
  @Post('cadastrar')
  async cadastrar(@Body() data: ServiceRegisterDto, @Req() req): Promise<ResultDto>{    
    let token = req.headers.authorization
    let user: User = await this.tokenService.getUserByToken(token)
    if (user){
      return this.servicoService.cadastrar(data, user)    
    }else{
      throw new HttpException({
        errorMessage: 'Token inválido'
      }, HttpStatus.UNAUTHORIZED)
    }
  }

}