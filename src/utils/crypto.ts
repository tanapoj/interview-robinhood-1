import * as bcrypt from 'bcryptjs'

const saltOrRounds = 10

export async function hash(password): Promise<string> {
    return await bcrypt.hash(password, saltOrRounds)
}

export async function compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash)
}