import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices'

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('api');
  // await app.listen(8001);
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqps://vzlfcnwv:oqCf0sxRe3qDKuvupHXBGENWrbQKzipY@shark.rmq.cloudamqp.com/vzlfcnwv'],
      queue: 'main_queue',
      queueOptions: {
        durable: false
      },
    },
  });

  await app.listen();
  console.log("Microservice is listening");
}
bootstrap();
