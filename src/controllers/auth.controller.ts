import {Body, Controller, Get, Param, Post, Put, Query, UnauthorizedException} from '@nestjs/common'
import {Comment, Interview, InterviewStatus, User} from '@prisma/client'
import {UserCreateDto, UserLoginDto, UserUpdateDto} from "../dto/UserDto"
import {InterviewCreateDto, InterviewUpdateDto} from "../dto/InterviewDto";
import {CommentCreateDto} from "../dto/CommentDto";
import {UserService} from "../services/user.service";
import {compare, hash} from "../utils/crypto";
import {JwtService} from "@nestjs/jwt";
import * as process from "process";

@Controller("auth")
export class AuthController {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {
    }

    @Post('login')
    async postUser(@Body() body: UserLoginDto) {
        const user = await this.userService.getByEmail(body.email)
        if (!await compare(body.password, user.password)) {
            throw new UnauthorizedException()
        }
        const payload = {
            sub: user.id,
            user: user.name,
            email: user.email,
        }
        return {
            accessToken: await this.jwtService.signAsync(payload, {
                privateKey: process.env.JWT_SECRET_KEY,
            }),
        };
    }
}
