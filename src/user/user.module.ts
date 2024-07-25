import { Module } from '@nestjs/common';
import { UserController } from './user-controller/user.controller';
import { UserServiceService } from './user-service/user-service.service';

@Module({
  controllers: [UserController],
  providers: [UserServiceService]
})
export class UserModule {}
