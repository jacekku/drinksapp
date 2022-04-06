/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
import { BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User, UserDocument } from './model/user.model';
import { Model } from 'mongoose';
import { HashingService } from '../auth/hashing.service';
import { JwtService } from '@nestjs/jwt';
export declare class UsersService {
    private userModel;
    private readonly hashingService;
    private readonly jwtService;
    constructor(userModel: Model<UserDocument>, hashingService: HashingService, jwtService: JwtService);
    reset(token: string, body: {
        oldPassword: string;
        newPassword: string;
    }): Promise<{
        access_token: string;
        exp: any;
    } | {
        exception: BadRequestException;
    }>;
    login(user: User): Promise<{
        access_token: string;
        exp: any;
    } | {
        exception: NotFoundException;
    }>;
    private saveUser;
    createUser(user: User): Promise<{
        access_token: string;
        exp: any;
    } | {
        exception: BadRequestException;
    }>;
    refreshToken(token: string): {
        access_token: string;
        exp: any;
    } | {
        exception: UnauthorizedException;
    };
    findUsername(username: string): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    private signToken;
}
