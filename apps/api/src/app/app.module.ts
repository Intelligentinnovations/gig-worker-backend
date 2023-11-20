import { DefaultInterceptor } from '@backend-template/rest-server';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { LibrariesModule } from '../libraries/libraries.module';
import { RecruiterModule } from '../recruiter/recruiter.module';
import { SecretsModule } from '../secrets/secrets.module';
import { TalentModule } from '../talent/talent.module';
import { AppController } from './app.controller';

@Module({
  imports: [LibrariesModule, SecretsModule, RecruiterModule, TalentModule],
  controllers: [AppController],
  providers: [{ provide: APP_INTERCEPTOR, useClass: DefaultInterceptor }],
})
export class AppModule {}
