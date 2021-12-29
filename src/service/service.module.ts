import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { TokenModule } from 'src/token/token.module';
import { DatabaseModule } from '../database/database.module';
import { ServiceController } from './service.controller';
import { serviceProviders } from './service.providers';
import { ServiceService } from './service.service';

@Module({
  imports: [DatabaseModule, TokenModule],
  controllers: [ServiceController],
  providers: [
    ...serviceProviders,
    ServiceService,
  ],
  exports: [ServiceService]
})
export class ServiceModule {}