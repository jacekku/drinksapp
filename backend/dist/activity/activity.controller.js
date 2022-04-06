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
exports.ActivityController = void 0;
const common_1 = require("@nestjs/common");
const activity_service_1 = require("../activity/activity.service");
const jwtAuth_guard_1 = require("../auth/jwtAuth.guard");
let ActivityController = class ActivityController {
    constructor(activityService) {
        this.activityService = activityService;
    }
    async findDrinks(headers) {
        return await this.activityService.getSearchHistory(headers.authorization);
    }
    async favoriteDrink(headers, drinkId) {
        return await this.activityService.addFavoriteDrink(headers.authorization, drinkId);
    }
    async getFavorites(headers) {
        return await this.activityService.getFavorites(headers.authorization);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwtAuth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ActivityController.prototype, "findDrinks", null);
__decorate([
    (0, common_1.UseGuards)(jwtAuth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('favorite/:drinkId'),
    __param(0, (0, common_1.Headers)()),
    __param(1, (0, common_1.Param)('drinkId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ActivityController.prototype, "favoriteDrink", null);
__decorate([
    (0, common_1.UseGuards)(jwtAuth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('favorite'),
    __param(0, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ActivityController.prototype, "getFavorites", null);
ActivityController = __decorate([
    (0, common_1.Controller)('activity'),
    __metadata("design:paramtypes", [activity_service_1.ActivityService])
], ActivityController);
exports.ActivityController = ActivityController;
//# sourceMappingURL=activity.controller.js.map