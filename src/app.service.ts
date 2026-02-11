import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Env } from './env.model';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService<Env>) {}
  getHealth(): string {
    const nameDev = this.configService.get('NAME_DEV', { infer: true });
    return `Health is good! ${nameDev}`;
  }
}
