import { inject } from '@loopback/core';
import { authenticate } from '@loopback/authentication';
import { LoggingBindings, WinstonLogger } from '@loopback/logging';
import {
  repository,
} from '@loopback/repository';
import {
  post,
  getModelSchemaRef,
  response,
  Request,
  RestBindings,
  HttpErrors
} from '@loopback/rest';
import { Schema } from '../models';
import { SchemaRepository } from '../repositories';
import { AcapyService } from '../services/acapy.service';
import * as schemaData from '../config/schemas.json';

@authenticate('apikey')
export class SchemaController {
  constructor(
    @inject(RestBindings.Http.REQUEST) private request: Request,
    @repository(SchemaRepository) public schemaRepository: SchemaRepository,
    @inject('services.AcapyService') private serviceProxyService: AcapyService,
    @inject(LoggingBindings.WINSTON_LOGGER) private logger: WinstonLogger,
  ) { }

  @post('/schemas')
  @response(200, {
    description: 'Schema model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Schema)
      },
    },
  })
  async create(): Promise<Schema> {
    const idx = 0;

    var proxyRes = await this.serviceProxyService.createschema(
      schemaData[idx].schema_name,
      schemaData[idx].schema_version,
      schemaData[idx].attributes,
      schemaData[idx].revocable,
      schemaData[idx].tag,
      schemaData[idx].public);
    this.logger.debug(this.request.path, { payload: proxyRes });

    let result = await this.schemaRepository.create({
      "schema_id": proxyRes.schema_id,
      "schema_name": proxyRes.schema.name,
      "schema_version": proxyRes.schema.version,
      "tag": schemaData[idx].tag
    });
    this.logger.info(this.request.path, { payload: result });
    return result;
  }
}
