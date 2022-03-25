import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CacheModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './apis/user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import type { RedisClientOptions } from 'redis';
import { TendencyModule } from './apis/tendency/tendency.module';
import redisStore from 'cache-manager-redis-store';
import { AuthModule } from './apis/auth/auth.module';
import { PositionModule } from './apis/position/position.module';
import { TypeModule } from './apis/type/type.module';

@Module({
  imports: [
    AuthModule,
    PositionModule,
    TendencyModule,
    TypeModule,
    UserModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/common/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }),
      cors: {
        origin: 'http://localhost:3000', //[process.env.CLIENT_URL],
        credentials: true,
      },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'teamplay_database',
      port: 3306,
      username: 'root',
      password: process.env.MYSQL_PASSWORD,
      database: 'TEAMPLAY',
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
      timezone: 'Asia/Seoul',
    }),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      url: 'redis://teamplay_redis:6379',
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
