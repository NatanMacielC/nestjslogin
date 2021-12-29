import { Body, Controller, Get, Post, Put, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ResultDto } from 'src/dto/result.dto';
import { TokenService } from 'src/token/token.service';
import { UserRegisterDto } from './dto/user.register.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,
    private authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('listar')
  async listar(): Promise<User[]>{
      return this.userService.listar()
  }

  @Post('cadastrar')
  async cadastrar(@Body() data: UserRegisterDto): Promise<ResultDto>{    
    return this.userService.cadastrar(data)    
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);    
  }

  @Post('login-token')
  async loginToken(@Request() req, @Body() data) {
    return this.authService.loginToken(data.token);    
  }
  
}