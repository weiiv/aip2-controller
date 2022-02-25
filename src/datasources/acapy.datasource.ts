import { juggler } from '@loopback/service-proxy';
import * as helper from '../helpers';

const config = {
   "name": "acapy",
   "connector": "rest",
   "options": {
      "headers": {
         "accept": "application/json",
         "content-type": "application/json"
      }
   },
   "operations": [
      {
         "template": {
            "method": "POST",
            "url": helper.getEnv('AGENT_ADMIN_URL') + "/connections/create-invitation"
         },
         "functions": {
            "createInvitation": []
         }
      },
      {
         "template": {
            "method": "POST",
            "body": {
               "schema_name": "{schema_name}",
               "schema_version": "{schema_version}",
               "attributes": "{attributes}",
               "revocable": "{revocable}",
               "tag": "{tag}",
               "public": "{pub}"
            },
            "url": helper.getEnv('AGENT_ADMIN_URL') + "/schemas"
         },
         "functions": {
            "createschema": ["schema_name", "schema_version",
               "attributes", "revocable", "tag", "pub"]
         }
      },
      {
         "template": {
            "method": "POST",
            "body": {
               "schema_id": "{schema_id}",
               "support_revocation": false,
               "tag": "{tag}"
            },
            "url": helper.getEnv('AGENT_ADMIN_URL') + "/credential-definitions"
         },
         "functions": {
            "createCredentialDefinition": [
               "schema_id",
               "tag"
            ]
         }
      },
      {
         "template": {
            "method": "POST",
            "body": {
               "auto_issue": true,
               "auto_remove": true,
               "comment": "string",
               "connection_id": "{connection_id}",
               "cred_def_id": "{cred_def_id}",
               "credential_preview": {
                  "@type": "did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/issue-credential/1.0/credential-preview",
                  "attributes": [{
                     "name": "name",
                     "value": "{name}"
                  },
                  {
                     "name": "civic_address",
                     "value": "{civicaddress}"
                  },
                  {
                     "name": "city",
                     "value": "{city}"
                  },
                  {
                     "name": "province",
                     "value": "{province}"
                  },
                  {
                     "name": "country",
                     "value": "{country}"
                  },
                  {
                     "name": "postal_code",
                     "value": "{postalcode}"
                  },
                  {
                     "name": "birth_dateint",
                     "value": "{birthdate}"
                  },
                  {
                     "name": "photo",
                     "value": "{photo}"
                  },
                  {
                     "name": "issue_date",
                     "value": "{issueDate}"
                  }]
               },
               "trace": true
            },
            "url": helper.getEnv('AGENT_ADMIN_URL') + "/issue-credential/send-offer"
         },
         "functions": {
            "issuecredential": [
               "connection_id",
               "name",
               "civicaddress",
               "city",
               "province",
               "country",
               "postalcode",
               "birthdate",
               "photo",
               "issueDate",
               "cred_def_id"
            ]
         }
      },
      {
         "template": {
            "method": "GET",
            "url": helper.getEnv('AGENT_ADMIN_URL') + "/status/ready"
         },
         "functions": {
            "ready": []
         }
      }]
}

export class AcapyDataSource extends juggler.DataSource {
   static dataSourceName = 'acapy';
   constructor(dsConfig: object = config) {
      super(dsConfig);
   }
}
