import { Module } from '@nestjs/common'

import { DatabaseModule } from './database/database.module'
import { ConfigModule } from '@nestjs/config'
import { ModulesModule } from './modules/modules.module'

@Module({
  imports: [DatabaseModule, ConfigModule.forRoot(), ModulesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
