import {Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {User} from "@prisma/client";
import {QueryOption, getPagination} from "../utils/query";
import {UserCreateDto, UserUpdateDto} from "../dto/UserDto";

@Injectable()
export class UserService {
    constructor(
        private readonly db: PrismaService,
    ) {
    }


    getMany(option: QueryOption = {}): Promise<User[]> {
        return this.db.user.findMany({
            ...getPagination(option),
        })
    }

    getById(id: number): Promise<User | null> {
        return this.db.user.findFirst({
            where: {id}
        })
    }

    getByEmail(email: string): Promise<User | null> {
        return this.db.user.findFirst({
            where: {email}
        })
    }

    create(data: UserCreateDto): Promise<User> {
        return this.db.user.create({
            data: {
                ...data,
            }
        })
    }

    update(id: number, data: UserUpdateDto): Promise<User> {
        return this.db.user.update({
            where: {
                id,
            },
            data: {
                ...data,
            }
        })
    }
}
