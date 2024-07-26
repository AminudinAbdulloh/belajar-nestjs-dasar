import { Module } from '@nestjs/common';
import { UserController } from './user/user-controller/user.controller';
import { UserService } from './user/user-service/user.service';
import { Connection, MongoDBConnection, MySQLConnection } from './connection/connection';
import { mailService, MailService } from './mail/mail.service';
import { createUserRepository, UserRepository } from './user-repository/user-repository';
import { MemberService } from './member/member.service';
import { createConnection } from './connection/connection';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
        provide: Connection,
        useFactory: createConnection,
        inject: [ConfigService]
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
