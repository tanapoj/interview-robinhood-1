export class InterviewCreateDto {
    description: string
    status: 'Todo' | 'InProgress' | 'Done'
    userId: number
}

export class InterviewUpdateDto {
    description: string
    status: 'Todo' | 'InProgress' | 'Done'
}
