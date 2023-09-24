import {PrismaService} from '../prisma/prisma.service'
import {Body, Controller, Get, Param, Post, Put, Query, UseGuards} from '@nestjs/common'
import {Comment, Interview} from '@prisma/client'
import {InterviewCreateDto, InterviewUpdateDto} from "../dto/InterviewDto";
import {CommentCreateDto} from "../dto/CommentDto";
import {InterviewService} from "../services/interview.service";
import {AuthGuard} from "../guards/auth.guard";

@Controller("users")
export class InterviewController {
    constructor(
        private readonly interviewService: InterviewService,
        private readonly db: PrismaService,
    ) {
    }


    @Get()
    @UseGuards(AuthGuard)
    getInterviews(@Query('status') status: string = null,
                  @Query('page') page: number = 1): Promise<Interview[]> {
        return this.interviewService.getMany({
            page,
            status,
        })
    }

    @Get(':id')
    @UseGuards(AuthGuard)
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

    @Post()
    @UseGuards(AuthGuard)
    postInterview(@Body() body: InterviewCreateDto): Promise<Interview> {
        return this.db.interview.create({
            data: {
                ...body,
                createdAt: new Date(),
            }
        })
    }

    @Post('interviews/:id/comment')
    @UseGuards(AuthGuard)
    postInterviewComment(@Param() id: number, @Body() body: CommentCreateDto): Promise<Comment> {
        return this.db.comment.create({
            data: {
                ...body,
                createdAt: new Date(),
            }
        })
    }

    @Put(':id')
    @UseGuards(AuthGuard)
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

    @Put(':id/archived')
    @UseGuards(AuthGuard)
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
