import {Body, Controller, Get, Param, Post, Put, Query, UseGuards} from '@nestjs/common'
import {Comment, Interview, InterviewStatus, User} from '@prisma/client'
import {UserCreateDto, UserUpdateDto} from "../dto/UserDto"
import {InterviewCreateDto, InterviewUpdateDto} from "../dto/InterviewDto";
import {CommentCreateDto} from "../dto/CommentDto";
import {UserService} from "../services/user.service";
import {hash} from "../utils/crypto";
import {AuthGuard} from "../guards/auth.guard";

@Controller("users")
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {
    }

    filterUserField(user: User): User {
        const {password, ...rest} = user
        return {...rest, password: null}
    }

    @Get('test')
    @UseGuards(AuthGuard)
    async test() {
        return 'ok'
    }

    @Get()
    async getUsers(@Query('page') page: number = 1): Promise<User[]> {
        return (await this.userService.getMany({page})).map(this.filterUserField)
    }

    @Get(':id')
    async getUser(@Param('id') id: number): Promise<User> {
        return this.filterUserField(await this.userService.getById(id))
    }

    @Post()
    async postUser(@Body() body: UserCreateDto): Promise<User> {
        const passwordHash = await hash(body.password)
        return this.filterUserField(await this.userService.create({
            ...body,
            password: passwordHash,
        }))
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    async putUser(@Param() id: number, @Body() body: UserUpdateDto): Promise<User> {
        return this.filterUserField(await this.userService.update(id, body))
    }

}
