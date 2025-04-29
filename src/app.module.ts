// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

// @Module({
//   imports: [],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DepartmentsModule } from './departments/departments.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://brobot:ValENotJr0n0ZwtGoXU7n9L7C8Nv5KHf@dpg-d08l7pjuibrs73b4npug-a.oregon-postgres.render.com/marks',
      // host: process.env.DB_HOST || 'localhost',
      // port: parseInt(process.env.DB_PORT || '5432', 10),
      // username: process.env.DB_USER || 'postgres',
      // password: process.env.DB_PASSWORD || 'postgres',
      // database: process.env.DB_NAME || 'department_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Disable in production
    }),
    AuthModule,
    UsersModule,
    DepartmentsModule,
  ],
})
export class AppModule {}