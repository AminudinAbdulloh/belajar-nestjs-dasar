import { Module } from '@nestjs/common';
import { UserController } from './userController/user.controller';

@Module({
  controllers: [UserController]
})
export class UserModule {}
