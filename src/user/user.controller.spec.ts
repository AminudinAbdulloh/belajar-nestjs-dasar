import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import * as httpMock from 'node-mocks-http';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      imports: [],
      providers: []
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should can say hello', async () => {
    const response = await controller.sayHello('Aminudin', 'Abdulloh');
    expect(response).toBe('Hello Aminudin Abdulloh');
  });

  // Menggunakan Mock Object untuk response yang menggunakan express.Response
  it('should can view hello',async () => {
    const response = httpMock.createResponse();
    controller.viewHello('Amin', response);

    expect(response._getRenderView()).toBe('index.html');
    expect(response._getRenderData()).toEqual({
      title: 'Template Engine',
      name: 'Amin'
    })
  })
});
