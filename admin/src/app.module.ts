import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost', // database host
    port: 5432, // database port
    username: 'postgres', // database username
    password: 'mysecretpassword', // database password
    database: 'postgres', // database name
    entities: [],
    autoLoadEntities: true,
    synchronize: true, // we need to set this to false in production
  }), ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
