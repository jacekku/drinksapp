import { JwtService } from '@nestjs/jwt';
import { ActivityDocument } from './model/activity.model';
import { Model } from 'mongoose';
export declare class ActivityService {
    private readonly jwtService;
    private activityModel;
    constructor(jwtService: JwtService, activityModel: Model<ActivityDocument>);
    private getUserId;
    addSearchActivity(header: string, searchTerm: string): Promise<void>;
    getSearchHistory(header: string): Promise<string[]>;
    addFavoriteDrink(header: string, favoriteDrinkId: string): Promise<void>;
    getFavorites(header: string): Promise<string[]>;
}
