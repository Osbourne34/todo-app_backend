import * as path from 'path'
import { config } from 'dotenv'
import { ConfigService } from '@nestjs/config'
import { DataSource } from 'typeorm'

config()

const configService = new ConfigService()

export default new DataSource({
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
  entities: [
    path.resolve(__dirname, '..', '..', 'database', 'entities', '*{.ts,.js}'),
  ],
  migrations: [
    path.resolve(__dirname, '..', '..', 'database', 'migrations', '*{.ts,.js}'),
  ],
  subscribers: [
    path.resolve(
      __dirname,
      '..',
      '..',
      'database',
      'subscribers',
      '*{.ts,.js}',
    ),
  ],
})
