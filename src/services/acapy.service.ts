import { getService, juggler } from '@loopback/service-proxy';
import { inject, Provider } from '@loopback/core';
import { AcapyDataSource } from '../datasources/acapy.datasource';

export interface SchemaServiceProxyResponseData {
   schema: {
      id: string;
      name: string;
      version: string;
      ver: string;
      seqNo: number;
      attrNames: Array<string>;
   };
   schema_id: string;
}

export interface CredentialDefitionServiceProxyResponseData {
   credential_definition_id: string;
}

export interface AcapyService {
   [methodName: string]: (...args: any[]) => Promise<any>;
}

export class AcapyServiceProvider implements Provider<AcapyService> {
   constructor(
      @inject('datasources.acapy')
      protected dataSource: juggler.DataSource = new AcapyDataSource(),
   ) { }
   value(): Promise<AcapyService> {
      return getService(this.dataSource);
   }
}
