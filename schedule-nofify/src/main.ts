import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Schedule Jobs')
    .setDescription('The API for app to schedule and execute jobs/tasks description')
    .setVersion('1.0')
    .addTag('Schedule')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);


  SwaggerModule.setup('api', app, documentFactory);

  console.log('RUN API IN ==> ', process.env.PORT)

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
