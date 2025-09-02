import {
  forwardRef,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Projects } from './entity/projects.entity';
import { Repository } from 'typeorm';
import { ProjectDto } from './dto/project_dto';
import { ClientsService } from 'src/clients/clients.service';
import { NewServiceDto } from './dto/addNewService.dto';
import { Vendor } from 'src/vendor/entity/vendor.entity';
import { MatchesService } from 'src/matches/matches.service';
import { VendorService } from 'src/vendor/vendor.service';
import { UpdateDto } from './dto/updateDto';

@Injectable()
export class ProjectsService {
  private readonly logger = new Logger(VendorService.name);

  constructor(
    @InjectRepository(Projects) private ProjectRepo: Repository<Projects>,
    @InjectRepository(Vendor) private VendorRepo: Repository<Vendor>,
    @Inject(forwardRef(() => MatchesService))
    private readonly matchesService: MatchesService,
    private readonly clientsService: ClientsService,
  ) {}

  async createProject(project: ProjectDto): Promise<Projects> {
    const client_exist = await this.clientsService.findClient(project.clientId);

    const project_exist = this.ProjectRepo.create({
      country: project.country,
      service_nedded: project.service_nedded,
      budget: project.budget,
      status: project.status,
      name: project.name,
      client: client_exist,
    });

    return await this.ProjectRepo.save(project_exist);
  }

  async addNewServiceToProject(service: NewServiceDto) {
    const project_exist = await this.ProjectRepo.findOne({
      where: { id: service.projectId },
    });

    if (!project_exist) {
      throw new NotFoundException('This project does not exist');
    }

    project_exist.service_nedded.push(service.service);
    return await this.ProjectRepo.save(project_exist);
  }

  async findProjectById(ProjectId: number): Promise<Projects> {
    const project = await this.ProjectRepo.findOne({
      where: { id: ProjectId },
    });

    if (!project) {
      throw new NotFoundException('There is no project with this ID');
    }

    return project;
  }

  async findTopVendorsForProject(projectId: number) {
    const project = await this.findProjectById(projectId);

    const neededServices = project.service_nedded ?? [];
    if (neededServices.length === 0) return [];

    const vendors = await this.VendorRepo.find();

    //  Filter vendors supporting the project's country
    const filterCountry = vendors.filter((vendor) =>
      vendor.countries_supported.includes(project.country),
    );

    // If no vendors support this country, return empty
    if (filterCountry.length === 0) {
      return [];
    }
    
    const scoredVendors = filterCountry
      .map((vendor) => {
        const vendorServices = Array.isArray(vendor.service_offered)
          ? vendor.service_offered.map((s) => s.trim())
          : [];

        const servicesOverlap = vendorServices.filter((s) =>
          neededServices.includes(s),
        ).length;

        const score =
          servicesOverlap * 2 +
          (vendor.rating ?? 0) +
          (vendor.response_sla_hours ?? 0) +
          5;
        vendor.rating+=3;
        return {
          ...vendor,
          score,
          vendorId: vendor.id,
        };
      })
      .sort((a, b) => b.score - a.score);

    for (const v of scoredVendors) {
      v.rating+=3;
      await this.VendorRepo.update(v.id,{rating:v.rating});
      await this.matchesService.createOrUpdateMatch({
        projectId,
        vendorId: v.vendorId,
        score: v.score,
      });
    }

    return scoredVendors;
  }
  async filterActiveProjects() {
    this.logger.log(`Fetching active projects...`);
    const projects = await this.ProjectRepo.find({
      where: { status: 'active' },
      select: ['id', 'name', 'status'], // ✅ Ensure 'name' is fetched
    });

    console.log('Active Projects:', projects);

    for (const project of projects) {
      console.log(
        `🔄 Refreshing matches for project: ${project.name} Project'}`,
      );
    }
  }
  async updateProject(updatedto: UpdateDto): Promise<Projects | null> {
    const project = await this.ProjectRepo.findOne({
      where: { id: updatedto.id },
    });

    if (!project) {
      throw new NotFoundException('This project no longer exists');
    }

    await this.ProjectRepo.update(updatedto.id, {
      ...updatedto,
    });
    return await this.ProjectRepo.findOne({ where: { id: updatedto.id } });
  }
}
