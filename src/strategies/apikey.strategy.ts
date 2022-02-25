import { inject } from '@loopback/core';
import { AuthenticationStrategy } from '@loopback/authentication';
import { HttpErrors, Request, RestBindings } from '@loopback/rest';
import { securityId, UserProfile } from '@loopback/security';
import * as helper from '../helpers';

export interface User {
  id: string;
  username: string;
  password: string;
}

export class ApiKeyAuthenticationStrategy implements AuthenticationStrategy {
  name: string = 'apikey';

  constructor(
    @inject(RestBindings.Http.REQUEST) private request: Request,
  ) { }

  async authenticate(request: Request): Promise<UserProfile | undefined> {
    if (this.request.headers['x-api-key'] == helper.getEnv('CONTROLLER_APIKEY')) {
      const user: User = {
        id: '1',
        username: 'apikey',
        password: ''
      }
      return { [securityId]: user.id, ...user };
    } else {
      const error = new HttpErrors.Unauthorized('Invalid API Key.');
      throw error;
    }
  }
}
