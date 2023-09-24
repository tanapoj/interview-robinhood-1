export interface UserCreateDto {
    name: string
    email: string
    password: string
}

export interface UserUpdateDto {
    name: string
    email: string
    password: string
}

export interface UserLoginDto {
    email: string
    password: string
}