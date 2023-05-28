import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { SequelizeModule } from '@nestjs/sequelize'
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { AnalysisModule } from './analysis/analysis.module';
import * as path from 'path'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    // ServeStaticModule.forRoot({
    //   rootPath: path.resolve(__dirname, 'static'),
    // }),
    SequelizeModule.forRoot({
      dialect: process.env.NODE_ENV === 'production' ? 'mysql' : 'postgres',
      models: [__dirname + '/**/**.entity.ts'],
      autoLoadModels: true,
      synchronize: true,
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    }),
    AuthModule,
    UsersModule,
    AnalysisModule,
  ],
})
export class AppModule {}
