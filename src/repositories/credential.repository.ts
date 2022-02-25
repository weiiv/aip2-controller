import { inject } from '@loopback/core';
import { DefaultCrudRepository } from '@loopback/repository';
import { PostgresDataSource } from '../datasources';

import { Credential, CredentialRelations } from '../models';

export class CredentialRepository extends DefaultCrudRepository<
  Credential,
  typeof Credential.prototype.id,
  CredentialRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(Credential, dataSource);
  }
}
