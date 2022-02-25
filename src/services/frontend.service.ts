import { getService, juggler } from '@loopback/service-proxy';
import { inject, Provider } from '@loopback/core';
import { FrontendDataSource } from '../datasources/frontend.datasource';

export interface FrontendService {
   [methodName: string]: (...args: any[]) => Promise<any>;
}

export class FrontendServiceProvider implements Provider<FrontendService> {
   constructor(
      @inject('datasources.frontend')
      protected dataSource: juggler.DataSource = new FrontendDataSource(),
   ) { }
   value(): Promise<FrontendService> {
      return getService(this.dataSource);
   }
}
