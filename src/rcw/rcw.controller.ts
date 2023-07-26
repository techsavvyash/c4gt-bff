import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { RcwService } from './rcw.service';
import { async } from 'rxjs';
import { Request, Response } from 'express';
import { CreateCredDTO } from './dto/requst.dto';

@Controller('rcw')
export class RcwController {
  constructor(private readonly rcwService: RcwService) {}

  @Get()
  async makeItRun() {
    return this.rcwService.processCSV('data/sample.csv');
  }

  @Get('/verify/:id')
  async verify(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    // console.log('in verify');
    const resp = await this.rcwService.verifyCredential(id, 'verified.html');
    // console.log('res: ', resp);
    res.send(resp);
    // return await this.rcwService.verifyCredential(id);
  }

  // @Get('/generateDIDs')
  // async generateDIDs() {
  //   return this.rcwService.generateDIDs();
  // }

  @Post('/schema')
  async createNewSchema(@Body() schema: any) {
    return this.rcwService.createNewSchema(schema);
  }

  @Post('/credential')
  async createNewCredential(@Body() credential: CreateCredDTO) {
    return this.rcwService.generateNewCredential(
      credential.type,
      credential.subject,
      credential.schema,
      credential.tags,
    );
  }
}
