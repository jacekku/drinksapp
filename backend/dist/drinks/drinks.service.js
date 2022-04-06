"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DrinksService = void 0;
const common_1 = require("@nestjs/common");
const cross_fetch_1 = require("cross-fetch");
const drink_model_1 = require("./model/drink.model");
const ingredient_model_1 = require("./model/ingredient.model");
let DrinksService = class DrinksService {
    constructor() {
        this.drinksUrlBase = 'www.thecocktaildb.com/api/json/v1/1/';
        this.searchUrl = 'search.php?';
    }
    async findDrinks(queryString) {
        const searchParams = new URLSearchParams({ s: queryString });
        const drinkResponse = await this.performGetWithSearchParams(searchParams);
        if (!drinkResponse.drinks)
            return [];
        return drinkResponse.drinks.map((drinkDto) => drink_model_1.Drink.fromDTO(drinkDto));
    }
    async findIngredient(queryString) {
        const searchParams = new URLSearchParams({ i: queryString });
        const ingredients = await this.performGetWithSearchParams(searchParams);
        if (!ingredients.ingredients)
            return [];
        return ingredients.ingredients.map((ingredient) => ingredient_model_1.Ingredient.fromDTO(ingredient));
    }
    async performGetWithSearchParams(searchParams) {
        return (0, cross_fetch_1.default)(`https://${this.drinksUrlBase + this.searchUrl + searchParams}`).then((body) => body.json());
    }
};
DrinksService = __decorate([
    (0, common_1.Injectable)()
], DrinksService);
exports.DrinksService = DrinksService;
//# sourceMappingURL=drinks.service.js.map