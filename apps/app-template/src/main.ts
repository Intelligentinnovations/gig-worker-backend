import { appHandler, LambdaEvent, server } from '@backend-template/server';

import { sqsHandler } from './handlers';
import router from './routes';
import { getSecrets, secrets } from './secrets';
import { security } from './security';

export async function handler(event: LambdaEvent) {
  await getSecrets();
  return appHandler(
    event,
    server(router, security, secrets.BASE_ROUTE),
    sqsHandler
  );
}
