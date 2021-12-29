import { Connection, Repository } from 'typeorm';
import { Service } from './service.entity';

export const serviceProviders = [
  {
    provide: 'SERVICO_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Service),
    inject: ['DATABASE_CONNECTION'],
  },
];