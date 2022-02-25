import { inject } from '@loopback/core';
import { LoggingBindings, WinstonLogger } from '@loopback/logging';
import { repository } from '@loopback/repository';
import {
  post,
  Request,
  requestBody,
  response,
  RestBindings,
} from '@loopback/rest';
import { CredentialRepository, CredentialDefinitionRepository, EventRepository } from '../repositories';
import { FrontendService, AcapyService } from '../services';
import * as helper from '../helpers';

export class WebhookController {
  constructor(
    @repository(CredentialRepository) public credentialRepository: CredentialRepository,
    @repository(CredentialDefinitionRepository) public credentialDefinitionRepository: CredentialDefinitionRepository,
    @repository(EventRepository) public eventRepository: EventRepository,
    @inject(RestBindings.Http.REQUEST) private request: Request,
    @inject(LoggingBindings.WINSTON_LOGGER) private logger: WinstonLogger,
    @inject('services.FrontendService') private frontendService: FrontendService,
    @inject('services.AcapyService') private acapyService: AcapyService,
  ) { }

  @post('/webhooks/topic/connections')
  @response(200)
  async connectionsWebhook(
    @requestBody() webhook: any,
  ): Promise<any> {
    this.logger.debug(`${this.request.method} ${this.request.path}`, { payload: webhook });

    let sessionId: any;
    let credential: any;
    var status: any;
    var message: any;

    try {
      credential = await this.credentialRepository.findOne({
        where: { connection_id: webhook.connection_id },
      });
      sessionId = credential.sessionId;
      await this.credentialRepository.updateById(credential.id, {
        status: webhook.state,
        update_time: new Date().toISOString()
      });
    } catch (err) { }

    helper.logEvent('credential.id', credential.id, 'webhook:connections', webhook.state, JSON.stringify(webhook), this.eventRepository);

    switch (webhook.state) {
      case 'invitation':
        status = 'INVITATION_SENT';
        message = 'Invitation Sent';
        break;
      case 'request':
        status = 'INVITATION_REQUESTED';
        message = 'Invitation Requested';
        break;
      case 'response':
        status = 'INVITATION_ACCEPTED';
        message = 'Invitation Accepted';
        try {
          const credentialDef: any = await this.credentialDefinitionRepository.findById(1);
          const issueDate = new Date();
          const formattedBithDate = credential.attributes.birthDate.replace(/\//g, "");
          await this.acapyService.issuecredential(
            credential.connection_id,
            (credential.attributes.firstName + ' ' + credential.attributes.middleName + ' ' + credential.attributes.lastName).replace('  ', ' '),
            credential.attributes.civicAddress,
            credential.attributes.city,
            credential.attributes.province,
            credential.attributes.country,
            credential.attributes.postalCode,
            formattedBithDate,
            credential.attributes.photo,
            issueDate,
            credentialDef.credential_definition_id
          );
        } catch (err) {
          this.logger.error(err);
          status = 'ERROR';
          message = 'Internal Server Error.';
        }
        break;
      default:
        status = webhook.state.toUpperCase() || 'ERROR';
        message = '';
    }

    if (sessionId) {
      await this.frontendService.pushStatus(sessionId, status, message)
    }
  }

  @post('/webhooks/topic/issue_credential')
  @response(200)
  async issueCredentialWebhook(
    @requestBody() webhook: any,
  ): Promise<any> {
    this.logger.debug(this.request.path, { payload: webhook });

    let sessionId: string = '';
    let credential: any

    try {
      credential = await this.credentialRepository.findOne({
        where: { connection_id: webhook.connection_id },
      });
      sessionId = credential.sessionId;
      await this.credentialRepository.updateById(credential.id, {
        status: webhook.state,
        update_time: new Date().toISOString(),
        result: webhook.state == 'credential_issued' ? JSON.stringify(webhook) : ''
      });
    } catch (err) { }

    helper.logEvent('credential.id', credential.id, 'webhook:issue_credential', webhook.state, JSON.stringify(webhook), this.eventRepository);

    await this.frontendService.pushStatus(sessionId, webhook.state.toUpperCase(), JSON.stringify(webhook));
  }
}
