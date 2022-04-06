export declare class HashingService {
    generateHashAndSalt(password: string): Promise<{
        salt: string;
        hash: string;
    }>;
    comparePassword(password: string, salt: string, hash: string): Promise<boolean>;
}
