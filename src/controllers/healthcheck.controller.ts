import { inject } from '@loopback/core';
import { repository } from '@loopback/repository';
import {
  get,
  Request,
  response,
  Response,
  RestBindings,
} from '@loopback/rest';
import { AcapyService } from '../services/acapy.service';
import {PostgresDataSource} from '../datasources';
import { SchemaRepository} from '../repositories';

/**
 * A simple controller to bounce back http requests
 */
export class HealthCheckController {
  constructor(
    @inject('datasources.postgres') private dataSource: PostgresDataSource,
    @repository(SchemaRepository) public schemaRepo: SchemaRepository,
    @inject(RestBindings.Http.REQUEST) private req: Request,
    @inject(RestBindings.Http.RESPONSE) private res: Response,
    @inject('services.AcapyService') private acapyService: AcapyService,
  ) { }

  @get('/status/live')
  @response(200, {
    description: 'Live response',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          title: 'Live Response',
          properties: {
            body: {
              alive: {type: 'boolean'},
            },
          },
        },
      },
    },
  })
  async healthCheck(): Promise<any> {
    
      return this.res.send({
        alive: true
      });
    
  }

  @get('/status/ready')
  @response(200, {
    description: 'Rediness response',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          title: 'Readiness Response',
          properties: {
            body: {
              ready: {type: 'boolean'},
            },
          },
        },
      },
    },
  })
  async readiness(): Promise<any> {
    let acapyData = await this.acapyService.ready();
    if (acapyData['ready'] && this.dataSource.connected && await this.schemaRepo.exists(1)) {
      return this.res.send({
        ready: true,
      });
    } else {
      throw new Error();
    }
  }
}
