import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Projects } from './entity/projects.entity';
import { Repository } from 'typeorm';
import { ProjectDto } from './dto/project_dto';
import { ClientsService } from 'src/clients/clients.service';
import { NewServiceDto } from './dto/addNewService.dto';
import { Research } from 'src/documnet/entity/docs.entity';
import { VendorService } from 'src/vendor/vendor.service';
import { Vendor } from 'src/vendor/entity/vendor.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Projects) private ProjectRepo: Repository<Projects>,
    private readonly clientsService: ClientsService,
    private readonly vendorService:VendorService
  ) {}

  async createProject(project: ProjectDto): Promise<Projects> {
    const client_exist = await this.clientsService.findClient(
      project.client_id,
    );
    const project_exist = await this.ProjectRepo.create({
      ...project,
      client: client_exist,
    });
    return await this.ProjectRepo.save(project_exist);
  }
  async addNewServiceToProject(service: NewServiceDto) {
    const project_exist = await this.ProjectRepo.findOne({
      where: { id: service.projectId },
    });
    if (!project_exist) {
      throw new NotFoundException('this project not exist anymore');
    }
    project_exist.service_nedded.push(service.service);
    await this.ProjectRepo.save(project_exist);
    return project_exist;
  }
  async findProjectById(ProjectId: number): Promise<Projects> {
    const project = await this.ProjectRepo.findOne({
      where: { id: ProjectId },
    });
    if (!project) {
      throw new NotFoundException('there no project with this id');
    }
    return project;
  }
  async findVendorForProject(id: number) {
    const project_exist = await this.findProjectById(id);
    const neededServices = project_exist.service_nedded;

    if (!neededServices || neededServices.length === 0) {   
      return [];
    }
    const matchingVendor=await this.vendorService.vendorForProject(neededServices);    
    return matchingVendor;

  }
}
