import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { LoadConfig } from '@common/config/load.config';
import { UserModule } from './user/user.module';

@Module({
  imports: [LoadConfig, CommonModule, UserModule],
})
export class AppModule {}
