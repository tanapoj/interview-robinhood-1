import {PrismaService} from './prisma/prisma.service'
import {Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query} from '@nestjs/common'
import {AppService} from './app.service'
import {Comment, Interview, InterviewStatus, User} from '@prisma/client'
import {UserCreateDto, UserUpdateDto} from "./dto/UserDto"
import {InterviewCreateDto, InterviewUpdateDto} from "./dto/InterviewDto";
import {CommentCreateDto} from "./dto/CommentDto";

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly db: PrismaService,
    ) {
    }

    @Get()
    getHello(): string {
        return this.appService.getHello()
    }

    @Get('users')
    getUsers(): Promise<User[]> {
        return this.db.user.findMany()
    }

    @Post('users')
    postUser(@Body() body: UserCreateDto): Promise<User> {
        return this.db.user.create({
            data: {
                ...body,
            }
        })
    }

    @Put('users/:id')
    putUser(@Param() id: number, @Body() body: UserUpdateDto): Promise<User> {
        return this.db.user.update({
            where: {
                id,
            },
            data: {
                ...body,
            }
        })
    }

    @Get('interviews')
    getInterviews(@Query('status') status: string): Promise<Interview[]> {
        const where = {
            archivedAt: null,
        }
        if (status in InterviewStatus) {
            where['status'] = status
        }
        console.log({where, status})
        return this.db.interview.findMany({
            where,
        })
    }

    @Get('interviews/:id')
    getInterview(): Promise<Interview> {
        return this.db.interview.findFirst({
            where: {
                archivedAt: null,
            },
            include: {
                user: true,
                comments: true,
            }
        })
    }

    @Post('interviews')
    postInterview(@Body() body: InterviewCreateDto): Promise<Interview> {
        return this.db.interview.create({
            data: {
                ...body,
                createdAt: new Date(),
            }
        })
    }

    @Post('interviews/:id/comment')
    postInterviewComment(@Param() id: number, @Body() body: CommentCreateDto): Promise<Comment> {
        return this.db.comment.create({
            data: {
                ...body,
                createdAt: new Date(),
            }
        })
    }

    @Put('interviews/:id')
    putInterview(@Param() id: number, @Body() body: InterviewUpdateDto): Promise<Interview> {
        return this.db.interview.update({
            where: {
                id,
            },
            data: {
                ...body,
            }
        })
    }

    @Put('interviews/:id/archived')
    putInterviewArchived(@Param('id') id: number): Promise<Interview> {
        return this.db.interview.update({
            where: {
                id: +id,
            },
            data: {
                archivedAt: new Date(),
            }
        })
    }

}
