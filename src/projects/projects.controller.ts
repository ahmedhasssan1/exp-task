import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectDto } from './dto/project_dto';
import { NewServiceDto } from './dto/addNewService.dto';
import { Vendor } from 'src/vendor/entity/vendor.entity';
import { UpdateDto } from './dto/updateDto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post('/create-project')
  async createProject(@Body() project:ProjectDto){
     return await this.projectsService.createProject(project)
  }
  @Post('/new-service')
  async newService(@Body() service:NewServiceDto){
    return await this.projectsService.addNewServiceToProject(service)
  }
  @Get('/:id/matches/rebuild')
  async matchingVendorsFroProject(@Param('id',ParseIntPipe)queryID:number){
    return await this.projectsService.findTopVendorsForProject(queryID);
  }
  @Get('/project-Id')
  async getProjectId(@Query('projectId')projectId:number){
    return await this.projectsService.findProjectById(projectId)
  }
  @Patch('updated-project-status')
  async updateStatus(@Body()statusDto:UpdateDto){
    return this.projectsService.updateProject(statusDto);
  }
}
