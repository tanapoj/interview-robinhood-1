import {PrismaService} from './prisma/prisma.service';
import {Controller, Get, Post} from '@nestjs/common';
import {AppService} from './app.service';
import {Interview, User} from '@prisma/client';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly db: PrismaService,
    ) {
    }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Post('user')
    postUser(): Promise<User> {
        return this.db.user.create({
            data: {
                name: 'admin',
                email: 'admin@interview.com',
            }
        });
    }

    @Get('interviews')
    getInterviews(): Promise<Interview[]> {
        return this.db.interview.findMany();
    }

    // @Post('interviews')
    // postInterview(): Promise<Interview> {
    //     return this.db.interview.create({
    //         data: {
    //             user
    //         }
    //     });
    // }

}
