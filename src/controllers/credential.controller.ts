import { inject } from '@loopback/core';
import { authenticate } from '@loopback/authentication';
import { LoggingBindings, WinstonLogger } from '@loopback/logging';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import { Credential } from '../models';
import { CredentialRepository, PersonaRepository } from '../repositories';
import { AcapyService } from '../services/acapy.service';

@authenticate('apikey')
export class CredentialController {
  constructor(
    @repository(CredentialRepository) public credentialRepository: CredentialRepository,
    @repository(PersonaRepository) public personaRepository: PersonaRepository,
    @inject(LoggingBindings.WINSTON_LOGGER) private logger: WinstonLogger,
    @inject('services.AcapyService') private acapyService: AcapyService,
  ) { }

  @post('/credential')
  @response(200)
  async create(
    @param.header.string('x-session-id') sessionId: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Credential, {
            title: 'NewCredential',
            exclude: ['id'],
          }),
        },
      },
    })
    credential: Omit<Credential, 'id'>,
  ): Promise<any> {
    this.logger.log('info', '/credential', { payload: credential });
    let persona: any = await this.personaRepository.findById(credential.persona_id);
    let invitation = await this.acapyService.createInvitation();

    credential.session_id = sessionId;
    credential.connection_id = invitation.connection_id;
    credential.create_time = new Date().toISOString();
    credential.attributes = persona;
    credential = await this.credentialRepository.create(credential);

    return {
      connectionId: invitation.connection_id,
      invitationUrl: invitation.invitation_url,
    };
  }

  @get('/credentials')
  @response(200, {
    description: 'Array of Credential model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Credential, { includeRelations: true }),
        },
      },
    },
  })
  async findCredential(
    @param.filter(Credential) filter?: Filter<Credential>,
  ): Promise<Credential[]> {
    return this.credentialRepository.find(filter);
  }

  @get('/credentials/count')
  @response(200, {
    description: 'Credential model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async count(@param.where(Credential) where?: Where<Credential>): Promise<Count> {
    return this.credentialRepository.count(where);
  }

  @get('/credential')
  @response(200, {
    description: 'Array of Credential model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Credential, { includeRelations: true }),
        },
      },
    },
  })
  async find(@param.filter(Credential) filter?: Filter<Credential>): Promise<Credential[]> {
    return this.credentialRepository.find(filter);
  }

  @patch('/credential')
  @response(200, {
    description: 'Credential PATCH success count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Credential, { partial: true }),
        },
      },
    })
    credential: Credential,
    @param.where(Credential) where?: Where<Credential>,
  ): Promise<Count> {
    return this.credentialRepository.updateAll(credential, where);
  }

  @get('/credentials/{id}')
  @response(200, {
    description: 'Credential model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Credential, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Credential, { exclude: 'where' })
    filter?: FilterExcludingWhere<Credential>,
  ): Promise<Credential> {
    return this.credentialRepository.findById(id, filter);
  }

  @patch('/credentials/{id}')
  @response(204, {
    description: 'Credential PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Credential, { partial: true }),
        },
      },
    })
    credential: Credential,
  ): Promise<void> {
    await this.credentialRepository.updateById(id, credential);
  }

  @put('/credentials/{id}')
  @response(204, {
    description: 'Credential PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() credential: Credential,
  ): Promise<void> {
    await this.credentialRepository.replaceById(id, credential);
  }

  @del('/credentials/{id}')
  @response(204, {
    description: 'Credential DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.credentialRepository.deleteById(id);
  }
}
