/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
import { Document } from 'mongoose';
export declare type ActivityType = 'SEARCH';
export declare class Activity {
    userId: string;
    type: ActivityType;
    value: string;
}
export declare type ActivityDocument = Activity & Document;
export declare const ActivitySchema: import("mongoose").Schema<Document<Activity, any, any>, import("mongoose").Model<Document<Activity, any, any>, any, any, any>, {}, {}>;
