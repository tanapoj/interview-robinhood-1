export type Status = 'Todo' | 'InProgress' | 'Done'

export class InterviewCreateDto {
    description: string
    status: Status
    userId: number
}

export class InterviewUpdateDto {
    description: string
    status: Status
}
