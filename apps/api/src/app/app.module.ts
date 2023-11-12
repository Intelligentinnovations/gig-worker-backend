import { DefaultInterceptor } from '@backend-template/rest-server';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { LibrariesModule } from '../libraries/libraries.module';
import { SecretsModule } from '../secrets/secrets.module';
import { AppController } from './app.controller';
import { AppRepo } from './app.repo';
import { AppService } from './app.service';
import { RecruiterModule } from '../recruiter/recruiter.module';
import { TalentModule } from '../talent/talent.module';

@Module({
  imports: [LibrariesModule, SecretsModule, RecruiterModule, TalentModule],
  controllers: [AppController],
  providers: [
    AppService,
    AppRepo,
    { provide: APP_INTERCEPTOR, useClass: DefaultInterceptor },
  ],
})
export class AppModule {}
