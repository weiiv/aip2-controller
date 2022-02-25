import {inject} from '@loopback/core';
import {
  Request,
  RestBindings,
  get,post,
  response,
  ResponseObject,
} from '@loopback/rest';

/**
 * OpenAPI response for ping()
 */
const PING_RESPONSE: ResponseObject = {
  description: 'Ping Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        title: 'PingResponse',
        properties: {
          greeting: {type: 'string'},
          date: {type: 'string'},
          url: {type: 'string'},
          body: {
            type: 'object',
            properties: {
              'Content-Type': {type: 'string'},
            },
            additionalProperties: true,
          },
        },
      },
    },
  },
};

/**
 * A simple controller to bounce back http requests
 */
export class PingController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}

  // Map to `GET /ping`
  @post('/ping')
  @response(200)
  ping(): object {
    // Reply with a greeting, the current time, the url, and request headers
    console.log('request', this.req)

    return {
      greeting: 'Hello from LoopBack',
      date: new Date(),
      url: this.req.url,
      body: Object.assign({}, this.req.body),
    };
  }
}
