import {PrismaService} from '../prisma/prisma.service'
import {Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query} from '@nestjs/common'
import {AppService} from '../services/app.service'
import {Comment, Interview, InterviewStatus, User} from '@prisma/client'
import {UserCreateDto, UserUpdateDto} from "../dto/UserDto"
import {InterviewCreateDto, InterviewUpdateDto} from "../dto/InterviewDto";
import {CommentCreateDto} from "../dto/CommentDto";

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
}
