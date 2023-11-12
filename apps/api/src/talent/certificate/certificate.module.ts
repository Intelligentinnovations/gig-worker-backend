import { Module } from '@nestjs/common';
import { CertificateRepo } from './certificate.repo';

@Module({
  providers: [CertificateRepo],
  exports: [CertificateRepo],
})
export class CertificateModule {}
