import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashingService {
  async generateHashAndSalt(password: string) {
    const saltOrRounds = 10;
    const salt = await bcrypt.genSalt();
    const passwordAndHash = salt + password;
    const hash = await bcrypt.hash(passwordAndHash, saltOrRounds);
    return { salt, hash };
  }

  async comparePassword(password: string, salt: string, hash: string) {
    return await bcrypt.compare(salt + password, hash);
  }
}
