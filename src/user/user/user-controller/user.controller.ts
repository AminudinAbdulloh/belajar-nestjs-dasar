import { Body, Controller, Get, Header, HttpCode, HttpException, HttpRedirectResponse, Inject, Param, ParseIntPipe, Post, Query, Redirect, Req, Res, UseFilters, UseInterceptors, UsePipes } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from '../user-service/user.service';
import { Connection } from '../../connection/connection';
import { MailService } from '../../mail/mail.service';
import { UserRepository } from '../../user-repository/user-repository';
import { MemberService } from 'src/user/member/member.service';
import { User } from '@prisma/client';
import { ValidationFilter } from 'src/validation/validation.filter';
import { LoginUserRequest, loginUserRequestValidation } from 'src/model/login.model';
import { ValidationPipe } from 'src/validation/validation.pipe';
import { TimeInterceptor } from 'src/time/time.interceptor';
import { Auth } from 'src/auth/auth.decorator';

@Controller('/api/users')
export class UserController {
    constructor(
        private service: UserService,
        private connection: Connection,
        private mailService: MailService,
        private userRepository: UserRepository,
        @Inject('EmailService') private emailService: MailService,
        private memberService: MemberService
    ) {}

    @Get('/current')
    current(@Auth() user: User): Record<string, any> {
        return {
            data: `Hello ${user.first_name} ${user.last_name}`
        };
    }

    @UseFilters(ValidationFilter)
    @UsePipes(new ValidationPipe(loginUserRequestValidation))
    @Post('/login')
    @Header('Content-Type', 'application/json')
    @UseInterceptors(TimeInterceptor)
    login(
        @Query('name') name: string,
        @Body() request: LoginUserRequest
    ) {
        return {
            data: `Hello ${request.username}`
        };
    }

    @Get('/connection')
    async getConnection(): Promise<string> {
        this.emailService.send();
        this.mailService.send();

        console.log(this.memberService.getConnectionName());
        this.memberService.sendEmail();

        return this.connection.getName();
    }

    @Get('/create')
    async create(
        @Query('first_name') firstName: string,
        @Query('last_name') lastName: string,
    ): Promise<User> {
        if(!firstName) {
            throw new HttpException({
                code: 400,
                errors: "first_name is required",
            }, 400);
        }
        return this.userRepository.save(firstName, lastName);
    }

    // HTTP Request Untuk req.query.key?
    @Get('/hello')
    // @UseFilters(ValidationFilter)
    async sayHello(@Query('name') name: string): Promise<string> {
        return this.service.sayHello(name);
    }

    @Get('/view/hello')
    viewHello(@Query('name') name: string, @Res() response: Response) {
        response.render('index.html', {
            title: 'Template Engine',
            name: name,
        });
    }

    // Cookie
    @Get('/set-cookie')
    setCookie(@Query("name") name: string, @Res() response: Response) {
        response.cookie('name', name);
        response.status(200).send('Success set cookie');
    }

    @Get('/get-cookie')
    getCookie(@Req() request: Request): string {
        return request.cookies['name'];
    }

    // HTTP Response menggunakan express.Response
    // @Get('/sample-response')
    // sampleResponse(@Res() response: Response) {
    //     response.status(200).json({
    //         data: 'Hello World'
    //     }); 
    // }

    // HTTP Response menggunakan Response Decorator
    @Get('/sample-response')
    @Header('Content-Type', 'application/json')
    @HttpCode(200)
    sampleResponse(): Record<string, string> {
        return {
            data: 'Hello JSON'
        } 
    }

    // HTTP Response menggunakan Response Decorator
    @Get('/redirect')
    @Redirect()
    redirect(): HttpRedirectResponse {
        return {
            url: '/api/users/sample-response',
            statusCode: 301
        };
    }

    @Post()
    createUser(): string {
        return 'POST User';
    }

    @Get('/sample')
    getUser(): string {
        return 'GET User';
    } 

    // HTTP Request Untuk express.Request
    // @Get('/sample/:id')
    // getUserById(@Req() request: Request): string {
    //     return `GET User ID: ${request.params.id}`;
    // }

    // HTTP Request Untuk req.params.id?
    @Get('sample/:id')
    getUserById(@Param("id", ParseIntPipe) id: number): string {
        return `GET ${id}`;
    }
}
