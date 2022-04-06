import { User } from './model/user.model';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    createUser(user: User): Promise<any>;
    login(user: User): Promise<any>;
    reset(headers: {
        authorization: string;
    }, body: {
        oldPassword: string;
        newPassword: string;
    }): Promise<any>;
    getToken(headers: {
        authorization: string;
    }): Promise<any>;
}
