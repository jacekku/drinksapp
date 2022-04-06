"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_model_1 = require("./model/user.model");
const mongoose_2 = require("mongoose");
const hashing_service_1 = require("../auth/hashing.service");
const jwt_1 = require("@nestjs/jwt");
let UsersService = class UsersService {
    constructor(userModel, hashingService, jwtService) {
        this.userModel = userModel;
        this.hashingService = hashingService;
        this.jwtService = jwtService;
    }
    async reset(token, body) {
        const jwt = this.jwtService.decode(token);
        const dbUser = await this.findUsername(jwt.username);
        const isMatch = await this.hashingService.comparePassword(body.oldPassword, dbUser.salt, dbUser.password);
        if (!isMatch) {
            return {
                exception: new common_1.BadRequestException('password is not correct'),
            };
        }
        return this.saveUser({
            username: dbUser.username,
            password: body.newPassword,
        });
    }
    async login(user) {
        const dbUser = await this.findUsername(user.username);
        if (!dbUser)
            return { exception: new common_1.NotFoundException() };
        const isMatch = await this.hashingService.comparePassword(user.password, dbUser.salt, dbUser.password);
        if (isMatch) {
            return await this.signToken(dbUser.username, dbUser.id);
        }
    }
    async saveUser(user) {
        const { salt, hash } = await this.hashingService.generateHashAndSalt(user.password);
        const createdUser = await new this.userModel({
            username: user.username,
            password: hash,
            salt: salt,
        }).save();
        return this.signToken(createdUser.username, createdUser.id);
    }
    async createUser(user) {
        if (!user.username)
            return { exception: new common_1.BadRequestException('username is empty') };
        if (!user.password)
            return { exception: new common_1.BadRequestException('password is empty') };
        const dbUser = await this.findUsername(user.username);
        if (dbUser) {
            return {
                exception: new common_1.BadRequestException('username already registered'),
            };
        }
        return this.saveUser({
            username: user.username,
            password: user.password,
        });
    }
    refreshToken(token) {
        let jwt;
        try {
            jwt = this.jwtService.verify(token);
        }
        catch (error) {
            return { exception: new common_1.UnauthorizedException() };
        }
        return this.signToken(jwt.username, jwt.sub);
    }
    findUsername(username) {
        return this.userModel
            .findOne({
            username: username,
        })
            .exec();
    }
    signToken(username, id) {
        const payload = { username: username, sub: id };
        const token = this.jwtService.sign(payload);
        return {
            access_token: token,
            exp: this.jwtService.decode(token).exp,
        };
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_model_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        hashing_service_1.HashingService,
        jwt_1.JwtService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map