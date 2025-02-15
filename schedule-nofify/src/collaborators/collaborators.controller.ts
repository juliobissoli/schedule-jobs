import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { CollaboratorsService } from './collaborators.service';
import { CreateCollaboratorDto, CreateCollaboratorDtoValidator } from './dto/create-collaborator.dto';
import { UpdateCollaboratorDto } from './dto/update-collaborator.dto';
import { Collaborator } from './entities/collaborator.entity';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('collaborators')
@Controller('collaborators')
export class CollaboratorsController {
  constructor(
    private readonly collaboratorsService: CollaboratorsService
  ) { }

  @Post()
  @ApiOperation({ summary: 'Create Collaborator' })
  @ApiResponse({ status: 201, description: 'The collaborator has been successfully created.', type: Collaborator })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createCollaboratorDto: CreateCollaboratorDto) {
    return this.collaboratorsService.create(createCollaboratorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all collaborators' })
  @ApiResponse({
    status: 200,
    description: 'The found records',
    type: [Collaborator],
  })
  findAll() {
    return this.collaboratorsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a collaborator by ID' })
  @ApiResponse({ status: 200, description: 'The found collaborator', type: Collaborator })
  @ApiResponse({ status: 404, description: 'Collaborator not found' })
  findOne(@Param('id') id: string) {
    return this.collaboratorsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a collaborator by ID' })
  @ApiResponse({ status: 200, description: 'The collaborator has been successfully updated.', type: Collaborator })
  @ApiResponse({ status: 404, description: 'Collaborator not found' })
  update(@Param('id') id: string, @Body() updateCollaboratorDto: UpdateCollaboratorDto) {
    return this.collaboratorsService.update(id, updateCollaboratorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a collaborator by ID' })
  @ApiResponse({ status: 204, description: 'The collaborator has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Collaborator not found' })
  remove(@Param('id') id: string) {
    return this.collaboratorsService.remove(id);
  }
}
