import { Module } from '@nestjs/common';
import { UserController } from './user-controller/user.controller';
import { UserService } from './user-service/user.service';
import { Connection, MongoDBConnection, MySQLConnection } from './connection/connection';
import { mailService, MailService } from './mail/mail.service';
import { createUserRepository, UserRepository } from './user-repository/user-repository';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
        provide: Connection,
        useClass: process.env.DATABASE == 'mysql' ? MySQLConnection : MongoDBConnection,
    },
    {
        provide: MailService,
        useValue: mailService
    },
    {
        provide: UserRepository,
        useFactory: createUserRepository,
        inject: [Connection]
    }
  ]
})
export class UserModule {}
