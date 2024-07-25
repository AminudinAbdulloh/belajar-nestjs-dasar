import { Controller, Get, Header, HttpCode, HttpRedirectResponse, Param, Post, Query, Redirect, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('/api/users')
export class UserController {

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

    // HTTP Request Untuk req.query.key?
    @Get('/hello')
    async sayHello(
        @Query("first_name") first_name: string,
        @Query("last_name") last_name: string
    ): Promise<string> {
        return `Hello ${first_name} ${last_name}`;
    }
}
