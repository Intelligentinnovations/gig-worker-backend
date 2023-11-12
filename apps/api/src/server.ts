import { httpBootstrap } from '@backend-template/http';
import { Logger } from '@nestjs/common';

import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const baseRoute = 'api';

httpBootstrap(AppModule, baseRoute).then((app) => {
  const port = process.env.PORT ?? 3000;

  const config = new DocumentBuilder()
    .setTitle('Gig-worker Docs')
    .setDescription('The docs for gig-worker is not in order')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'Bearer',
        description: 'User access token',
      },
      'access-token'
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app
    .listen(port)
    .then(() =>
      Logger.log(
        `🚀 Application is running on: http://localhost:${port}/${baseRoute}`
      )
    );
});
