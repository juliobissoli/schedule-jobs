import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RunJobsService } from './run-jobs.service';
import { CreateRunJobDto } from './dto/create-run-job.dto';
import { UpdateRunJobDto } from './dto/update-run-job.dto';

@Controller('run-jobs')
export class RunJobsController {
  constructor(private readonly runJobsService: RunJobsService) {}

  @Post()
  create(@Body() createRunJobDto: CreateRunJobDto) {
    return this.runJobsService.create(createRunJobDto);
  }

  @Get()
  findAll() {
    return this.runJobsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.runJobsService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateRunJobDto: UpdateRunJobDto) {
  //   return this.runJobsService.update(+id, updateRunJobDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.runJobsService.remove(+id);
  // }
}
