import {Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {getPagination, InterviewQueryOption} from "../utils/query";
import {Interview, InterviewStatus} from "@prisma/client";
import {InterviewCreateDto, InterviewUpdateDto} from "../dto/InterviewDto";

@Injectable()
export class InterviewService {
    constructor(
        private readonly db: PrismaService,
    ) {
    }


    getMany(option: InterviewQueryOption = {}): Promise<Interview[]> {
        const where = {NOT: {}}
        if (option.includeArchived !== true) where['archivedAt'] = null
        if (option.status in InterviewStatus) where['status'] = option.status

        return this.db.interview.findMany({
            where: {...where},
            ...getPagination(option),
        })
    }

    getById(id: number, includeArchived: boolean = false): Promise<Interview | null> {
        const where = {NOT: {}}
        if (includeArchived !== true) where['archivedAt'] = null

        return this.db.interview.findFirst({
            where: {
                ...where,
                id,
            },
            include: {
                user: true,
                comments: true,
            }
        })
    }

    create(data: InterviewCreateDto): Promise<Interview> {
        return this.db.interview.create({
            data: {
                ...data,
                createdAt: new Date(),
            }
        })
    }

    update(id: number, data: InterviewUpdateDto): Promise<Interview> {
        return this.db.interview.update({
            where: {
                id,
            },
            data: {
                ...data,
            }
        })
    }

    archived(id: number): Promise<Interview> {
        return this.db.interview.update({
            where: {
                id,
            },
            data: {
                archivedAt: new Date(),
            }
        })
    }
}
