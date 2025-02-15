import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JourneysService } from './journeys.service';
import { CreateJourneyDto } from './dto/create-journey.dto';
import { UpdateJourneyDto } from './dto/update-journey.dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('journeys')
@Controller('journeys')
export class JourneysController {
  constructor(private readonly journeysService: JourneysService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova jornada' })
  @ApiResponse({ status: 201, description: 'Jornada criada com sucesso.' })
  create(@Body() createJourneyDto: CreateJourneyDto) {
    return this.journeysService.create(createJourneyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as jornadas' })
  @ApiResponse({ status: 200, description: 'Lista de jornadas retornada com sucesso.' })
  findAll() {
    return this.journeysService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma jornada específica' })
  @ApiResponse({ status: 200, description: 'Jornada encontrada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Jornada não encontrada.' })
  findOne(@Param('id') id: string) {
    return this.journeysService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar uma jornada existente' })
  @ApiResponse({ status: 200, description: 'Jornada atualizada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Jornada não encontrada.' })
  update(@Param('id') id: string, @Body() updateJourneyDto: UpdateJourneyDto) {
    return this.journeysService.update(id, updateJourneyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma jornada' })
  @ApiResponse({ status: 200, description: 'Jornada removida com sucesso.' })
  @ApiResponse({ status: 404, description: 'Jornada não encontrada.' })
  remove(@Param('id') id: string) {
    return this.journeysService.remove(id);
  }
}
