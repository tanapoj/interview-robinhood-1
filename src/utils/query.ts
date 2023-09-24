import {isNumber} from "@nestjs/common/utils/shared.utils";

export interface QueryOption {
    page?: number,
    offset?: number
    limit?: number
}

export interface InterviewQueryOption extends QueryOption {
    status?: string
    includeArchived?: boolean
}

export function getPagination(option: QueryOption, perPage = 20): { skip: number, take: number } {
    if (option.page == null && option.offset == null) return {skip: null, take: null}
    if (option.page != null) return {skip: (option.page - 1) * perPage, take: perPage}
    const skip = option.offset
    const take = option.limit ?? perPage
    return {skip, take}
}