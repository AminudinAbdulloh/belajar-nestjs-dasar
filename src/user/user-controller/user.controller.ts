import { Controller, Get, Header, HttpCode, HttpRedirectResponse, Param, Post, Query, Redirect, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from '../user-service/user.service';
import { Connection } from '../connection/connection';
import { MailService } from '../mail/mail.service';

@Controller('/api/users')
export class UserController {
    constructor(
        private service: UserService,
        private connection: Connection,
        private mailService: MailService
    ) {}

    @Get('/connection')
    async getConnection(): Promise<string> {
        this.mailService.send();
        return this.connection.getName();
    }

    // HTTP Request Untuk req.query.key?
    @Get('/hello')
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
    getUserById(@Param("id") id): string {
        return `GET ${id}`;
    }
}
