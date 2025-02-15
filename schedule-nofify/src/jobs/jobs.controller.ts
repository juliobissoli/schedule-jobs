import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';


@ApiTags('jobs')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) { }

  @Post()
  @ApiOperation({ summary: 'Criar um novo trabalho' })
  @ApiResponse({ status: 201, description: 'Trabalho criado com sucesso.' })
  create(@Body() createJobDto: CreateJobDto) {
    return this.jobsService.create(createJobDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os trabalhos' })
  @ApiResponse({ status: 200, description: 'Lista de trabalhos retornada com sucesso.' })
  findAll(@Query() query: any) {
    return this.jobsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um trabalho pelo ID' })
  @ApiResponse({ status: 200, description: 'Trabalho encontrado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Trabalho não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um trabalho pelo ID' })
  @ApiResponse({ status: 200, description: 'Trabalho atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Trabalho não encontrado.' })
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobsService.update(id, updateJobDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um trabalho pelo ID' })
  @ApiResponse({ status: 200, description: 'Trabalho removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Trabalho não encontrado.' })
  remove(@Param('id') id: string) {
    return this.jobsService.remove(id);
  }
}
