import { inject } from '@loopback/core';
import { DefaultCrudRepository } from '@loopback/repository';
import { PostgresDataSource } from '../datasources';

import { CredentialDefinition, CredentialDefinitionRelations } from '../models';

export class CredentialDefinitionRepository extends DefaultCrudRepository<
  CredentialDefinition,
  typeof CredentialDefinition.prototype.id,
  CredentialDefinitionRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(CredentialDefinition, dataSource);
  }
}
