import { httpBootstrap } from '@backend-template/http';
import { Logger } from '@nestjs/common';

import { AppModule } from './app/app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { baseRoute, docsConfig } from './config';

httpBootstrap(AppModule, baseRoute).then((app) => {
  const port = process.env.PORT ?? 3000;

  const document = SwaggerModule.createDocument(app, docsConfig);
  SwaggerModule.setup(`${baseRoute}/docs`, app, document);

  app
    .listen(port)
    .then(() =>
      Logger.log(
        `🚀 Application is running on: http://localhost:${port}/${baseRoute}`
      )
    );
});
