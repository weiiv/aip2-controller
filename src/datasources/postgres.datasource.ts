import { inject, lifeCycleObserver, LifeCycleObserver } from '@loopback/core';
import { juggler } from '@loopback/repository';
import * as helper from '../helpers';

const config = {
  name: 'postgres',
  connector: 'postgresql',
  url: helper.getEnv('PG_CONNSTR', 'base64'),
  min: helper.getEnvObj('PG_POOLMIN'),
  max: helper.getEnvObj('PG_POOLMAX'),
  idleTimeoutMillis: helper.getEnv('PG_POOLIDLE'),
  ssl: helper.getEnvObj('PG_CONNSSL')
}

@lifeCycleObserver('datasource')
export class PostgresDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'postgres';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.postgres', { optional: true })
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
