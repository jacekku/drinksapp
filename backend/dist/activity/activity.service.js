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
exports.ActivityService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const activity_model_1 = require("./model/activity.model");
const mongoose_2 = require("mongoose");
let ActivityService = class ActivityService {
    constructor(jwtService, activityModel) {
        this.jwtService = jwtService;
        this.activityModel = activityModel;
    }
    getUserId(header) {
        const token = header.replace('Bearer ', '');
        return this.jwtService.decode(token).sub;
    }
    async addSearchActivity(header, searchTerm) {
        if (!header)
            return;
        const userId = this.getUserId(header);
        const activity = {
            userId,
            type: 'SEARCH',
            value: searchTerm,
        };
        new this.activityModel(activity).save().catch((err) => {
            console.error(err);
        });
    }
    async getSearchHistory(header) {
        if (!header)
            return;
        const userId = this.getUserId(header);
        const result = await this.activityModel
            .find({
            userId: userId,
            type: 'SEARCH',
        })
            .exec();
        if (!result)
            return [];
        return result.map((item) => item.value);
    }
    async addFavoriteDrink(header, favoriteDrinkId) {
        if (!header)
            return;
        const userId = this.getUserId(header);
        const activity = {
            userId,
            type: 'FAVORITE',
            value: favoriteDrinkId,
        };
        new this.activityModel(activity).save().catch((err) => {
            console.error(err);
        });
    }
    async getFavorites(header) {
        if (!header)
            return;
        const userId = this.getUserId(header);
        const result = await this.activityModel
            .find({
            userId: userId,
            type: 'FAVORITE',
        })
            .exec();
        if (!result)
            return [];
        return result.map((item) => item.value);
    }
};
ActivityService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(activity_model_1.Activity.name)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        mongoose_2.Model])
], ActivityService);
exports.ActivityService = ActivityService;
//# sourceMappingURL=activity.service.js.map