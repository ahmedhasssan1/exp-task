import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Projects } from './entity/projects.entity';
import { Repository } from 'typeorm';
import { ProjectDto } from './dto/project_dto';
import { ClientsService } from 'src/clients/clients.service';
import { NewServiceDto } from './dto/addNewService.dto';
import { Vendor } from 'src/vendor/entity/vendor.entity';
import { MatchesService } from 'src/matches/matches.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Projects) private ProjectRepo: Repository<Projects>,
    @InjectRepository(Vendor) private VendorRepo: Repository<Vendor>,
    private readonly matchesService: MatchesService,
    private readonly clientsService: ClientsService,
  ) {}

  async createProject(project: ProjectDto): Promise<Projects> {
    const client_exist = await this.clientsService.findClient(project.client_id);
    const project_exist = this.ProjectRepo.create({
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
      throw new NotFoundException('This project does not exist');
    }

    project_exist.service_nedded.push(service.service);
    return await this.ProjectRepo.save(project_exist);
  }

  async findProjectById(ProjectId: number): Promise<Projects> {
    const project = await this.ProjectRepo.findOne({ where: { id: ProjectId } });

    if (!project) {
      throw new NotFoundException('There is no project with this ID');
    }
    return project;
  }

  async findTopVendorsForProject(projectId: number) {
    // 1. Find project
    const project = await this.findProjectById(projectId);

    // 2. Get needed services
    const neededServices = project.service_nedded ?? [];
    if (neededServices.length === 0) return [];

    // 3. Fetch all vendors
    const vendors = await this.VendorRepo.find();

    // 4. Calculate scores
    const scoredVendors = vendors
      .map((vendor) => {
        const vendorServices = Array.isArray(vendor.service_offered)
          ? vendor.service_offered.map((s) => s.trim())
          : [];

        const servicesOverlap = vendorServices.filter((s) =>
          neededServices.includes(s),
        ).length;

        const inSameCountry = Array.isArray(vendor.countries_supported)
          ? vendor.countries_supported.includes(project.country)
          : false;

        if (!inSameCountry) return null; // Skip vendors outside the country

        const score =
          servicesOverlap * 2 +
          (vendor.rating ?? 0) +
          (vendor.response_sla_hours ?? 0) +
          (inSameCountry ? 5 : 0);

        return {
          ...vendor,
          score,
          vendorId: vendor.id,
        };
      })
      .filter((vendor) => vendor !== null)
      .sort((a, b) => (b as any).score - (a as any).score);

    // 5. Save matches
    for (const v of scoredVendors) {
      await this.matchesService.createOrUpdateMatch({
        projectId,
        vendorId: v!.vendorId,
        score: v!.score,
      });
    }

    return scoredVendors;
  }
}
