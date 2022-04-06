import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Activity, ActivityDocument } from './model/activity.model';
import { Model } from 'mongoose';

@Injectable()
export class ActivityService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(Activity.name) private activityModel: Model<ActivityDocument>,
  ) {}

  private getUserId(header: string) {
    const token = header.replace('Bearer ', '');
    return (this.jwtService.decode(token) as any).sub;
  }
  async addSearchActivity(header: string, searchTerm: string) {
    if (!header) return;
    const userId = this.getUserId(header);
    const activity = <Activity>{
      userId,
      type: 'SEARCH',
      value: searchTerm,
    };
    new this.activityModel(activity).save().catch((err) => {
      console.error(err);
    });
  }

  async getSearchHistory(header: string) {
    if (!header) return;
    const userId = this.getUserId(header);

    const result = await this.activityModel
      .find({
        userId: userId,
        type: 'SEARCH',
      })
      .exec();
    if (!result) return [];
    return result.map((item) => item.value);
  }

  async addFavoriteDrink(header: string, favoriteDrinkId: string) {
    if (!header) return;
    const userId = this.getUserId(header);

    const activity = <Activity>{
      userId,
      type: 'FAVORITE',
      value: favoriteDrinkId,
    };
    new this.activityModel(activity).save().catch((err) => {
      console.error(err);
    });
  }

  async getFavorites(header: string) {
    if (!header) return;
    const userId = this.getUserId(header);
    const result = await this.activityModel
      .find({
        userId: userId,
        type: 'FAVORITE',
      })
      .exec();
    if (!result) return [];
    return result.map((item) => item.value);
  }
}
