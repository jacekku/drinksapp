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
  async addSearchActivity(header: string, searchTerm: string) {
    if (!header) return;
    const token = header.replace('Bearer ', '');
    const userId = (this.jwtService.decode(token) as any).sub;
    const activity = <Activity>{
      userId,
      type: 'SEARCH',
      value: searchTerm,
    };
    this.activityModel.create(activity);
  }

  async getSearchHistory(header: string) {
    if (!header) return;
    const token = header.replace('Bearer ', '');
    const userId = (this.jwtService.decode(token) as any).sub;
    const result = await this.activityModel
      .find({
        userId: userId,
      })
      .exec();
    return result.map((item) => item.value);
  }
}
