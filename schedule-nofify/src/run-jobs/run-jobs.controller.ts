import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RunJobsService } from './run-jobs.service';
import { CreateRunJobDto } from './dto/create-run-job.dto';
import { UpdateRunJobDto } from './dto/update-run-job.dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('run-jobs')
@Controller('run-jobs')
export class RunJobsController {
  constructor(private readonly runJobsService: RunJobsService) {}

  // @Post()
  // @ApiOperation({ summary: 'Criar um novo job' })
  // @ApiResponse({ status: 201, description: 'Job criado com sucesso.' })
  // create(@Body() createRunJobDto: CreateRunJobDto) {
  //   return this.runJobsService.create(createRunJobDto);
  // }

  @Get()
  @ApiOperation({ summary: 'Listar todos os jobs' })
  @ApiResponse({ status: 200, description: 'Lista de jobs retornada com sucesso.' })
  findAll(@Query() query: any) {
    return this.runJobsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um job pelo ID' })
  @ApiResponse({ status: 200, description: 'Job encontrado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Job não encontrado.' })
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
