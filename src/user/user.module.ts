import { Module } from '@nestjs/common';
import { UserController } from './user/user-controller/user.controller';
import { UserService } from './user/user-service/user.service';
import { Connection, MongoDBConnection, MySQLConnection } from './connection/connection';
import { mailService, MailService } from './mail/mail.service';
import { UserRepository } from './user-repository/user-repository';
import { MemberService } from './member/member.service';
import { createConnection } from './connection/connection';
import { ConfigService } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
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
    UserRepository,
    {
        provide: 'EmailService',
        useExisting: MailService
    },
    MemberService
  ],
  exports: [UserService]
})
export class UserModule {}
