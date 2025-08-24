import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectDto } from './dto/project_dto';
import { NewServiceDto } from './dto/addNewService.dto';
import { Vendor } from 'src/vendor/entity/vendor.entity';

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
  @Get('/vendors-matching-project')
  async matchingVendorsFroProject(@Query('queryID')queryID:number){
    return await this.projectsService.findVendorForProject(queryID);
  }
}
