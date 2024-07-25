import { Module } from '@nestjs/common';
import { UserController } from './user-controller/user.controller';
import { UserService } from './user-service/user/user.service';

@Module({
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
