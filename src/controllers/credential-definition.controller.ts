import { inject } from '@loopback/core';
import { authenticate } from '@loopback/authentication';
import { LoggingBindings, WinstonLogger } from '@loopback/logging';
import {
  post,
  getModelSchemaRef,
  Request,
  response,
  RestBindings
} from '@loopback/rest';
import { repository } from '@loopback/repository';
import { CredentialDefinition } from '../models';
import { CredentialDefinitionRepository } from '../repositories';
import { SchemaRepository } from '../repositories';
import { AcapyService } from '../services/acapy.service';

@authenticate('apikey')
export class CredentialDefinitionController {
  constructor(
    @inject(RestBindings.Http.REQUEST) private request: Request,
    @repository(SchemaRepository) public schemaRepository: SchemaRepository,
    @repository(CredentialDefinitionRepository) public credentialDefinitionRepository: CredentialDefinitionRepository,
    @inject('services.AcapyService') private acapyService: AcapyService,
    @inject(LoggingBindings.WINSTON_LOGGER) private logger: WinstonLogger,
  ) { }

  @post('/credential-definitions')
  @response(200, {
    description: 'CredentialDefinition model instance',
    content: { 'application/json': { schema: getModelSchemaRef(CredentialDefinition) } },
  })
  async create(): Promise<CredentialDefinition> {
    try {
      let result = await this.schemaRepository.findById(1);
      var acapyData = await this.acapyService.createCredentialDefinition(result.schema_id, result.tag);
      this.logger.debug(this.request.path, { payload: acapyData });

      let credef = await this.credentialDefinitionRepository.create({
        credential_definition_id: acapyData.credential_definition_id,
        tag: result.tag
      });
      this.logger.info(this.request.path, { payload: credef });
      return credef;

    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }
}