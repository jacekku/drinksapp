import { ActivityService } from '../activity/activity.service';
export declare class ActivityController {
    private readonly activityService;
    constructor(activityService: ActivityService);
    findDrinks(headers: any): Promise<string[]>;
}
