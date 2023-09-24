import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! 1234';
  }

  paginate(page: number):any{
    const perPage = 20
    return {}
  }
}
