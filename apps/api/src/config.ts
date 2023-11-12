import { DocumentBuilder } from '@nestjs/swagger';

export const baseRoute = 'v1';

export const docsConfig = new DocumentBuilder()
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
