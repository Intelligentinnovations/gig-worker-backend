import { CustomRes } from '@backend-template/http';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('health')
  async getData() {
    return CustomRes.success();
  }
}
