import { Module } from '@nestjs/common';
import { UserController } from './user/user-controller/user.controller';
import { UserService } from './user/user-service/user.service';
import { Connection, MongoDBConnection, MySQLConnection } from './connection/connection';
import { mailService, MailService } from './mail/mail.service';
import { createUserRepository, UserRepository } from './user-repository/user-repository';
import { MemberService } from './member/member.service';

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
    },
    {
        provide: 'EmailService',
        useExisting: MailService
    },
    MemberService
  ]
})
export class UserModule {}
