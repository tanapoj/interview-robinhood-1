import {PrismaModule} from './prisma/prisma.module';
import {Module} from '@nestjs/common';
import {AppController} from './controllers/app.controller';
import {AppService} from './services/app.service';
import {UserService} from "./services/user.service";
import {InterviewService} from "./services/interview.service";
import {UserController} from "./controllers/user.controller";
import {InterviewController} from "./controllers/interview.controller";
import {AuthController} from "./controllers/auth.controller";
import {JwtModule, JwtService} from "@nestjs/jwt";
import * as process from "process";

@Module({
    imports: [PrismaModule, JwtModule],
    controllers: [AppController, UserController, InterviewController, AuthController],
    providers: [AppService, UserService, InterviewService, JwtService],
})
export class AppModule {
}
