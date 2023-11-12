import { httpBootstrap } from '@backend-template/http';
import {
  awsBootstrap,
  awsService,
  AwsTransporter,
} from '@backend-template/microservice';
import awsLambdaFastify, { CallbackHandler } from '@fastify/aws-lambda';
import { APIGatewayProxyEvent, Handler, SNSEvent, SQSEvent } from 'aws-lambda';
import { firstValueFrom, ReplaySubject } from 'rxjs';

import { AppModule } from './app/app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { baseRoute, docsConfig } from './config';

const serverSubject = new ReplaySubject<CallbackHandler>();

httpBootstrap(AppModule, baseRoute).then((app) => {
  const document = SwaggerModule.createDocument(app, docsConfig);
  SwaggerModule.setup(`${baseRoute}/docs`, app, document);

  serverSubject.next(
    awsLambdaFastify(app.getHttpAdapter().getInstance(), {
      callbackWaitsForEmptyEventLoop: false,
    })
  );
});

const microserviceSubject = new ReplaySubject<AwsTransporter>();
awsBootstrap(AppModule).then((app) => microserviceSubject.next(app));

export const handler: Handler = async (
  event: APIGatewayProxyEvent | SQSEvent | SNSEvent,
  context,
  callback
) => {
  console.log('event :: ', JSON.stringify(event));

  if ('requestContext' in event) {
    const server = await firstValueFrom(serverSubject);
    return server(event, context, callback);
  } else {
    const transporter = await firstValueFrom(microserviceSubject);
    await awsService(event, context, transporter);
  }
};
