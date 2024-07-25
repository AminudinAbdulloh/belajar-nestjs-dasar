import { Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('/api/users')
export class UserController {
    @Post()
    createUser(): string {
        return 'POST User';
    }

    @Get('/sample')
    getUser(): string {
        return 'GET User';
    } 

    // Untuk express.Request
    // @Get('/sample/:id')
    // getUserById(@Req() request: Request): string {
    //     return `GET User ID: ${request.params.id}`;
    // }

    // Untuk req.params.id?
    @Get('sample/:id')
    getUserById(@Param("id") id): string {
        return `GET ${id}`;
    }

    // Untuk req.query.key?
    @Get('/hello')
    sayHello(
        @Query("first_name") first_name: string,
        @Query("last_name") last_name: string
    ): string {
        return `Hello ${first_name} ${last_name}`;
    }
}
