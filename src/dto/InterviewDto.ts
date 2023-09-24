export type Status = 'Todo' | 'InProgress' | 'Done'

export interface InterviewCreateDto {
    description: string
    status: Status
    userId: number
}

export interface InterviewUpdateDto {
    description: string
    status: Status
}
