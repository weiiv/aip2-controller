import { juggler } from '@loopback/service-proxy';
import * as helper from '../helpers';

const config = {
   "name": "frontend",
   "connector": "rest",
   "options": {
      "headers": {
         "accept": "application/json",
         "content-type": "application/json"
      }
   },

   "operations": [{
      "template": {
         "method": "POST",
         "url": helper.getEnv('FRONTEND_NOTIFY_URL'),
         "body": {
            "sessionId": "{sessionId}",
            "status": "{status}",
            "message": "{message}"
         }
      },
      "functions": {
         "pushStatus": ["sessionId", "status", "message"]
      }
   }]
}

export class FrontendDataSource extends juggler.DataSource {
   static dataSourceName = 'frontend';
   constructor(dsConfig: object = config) {
      super(dsConfig);
   }
}
