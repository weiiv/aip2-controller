import { inject } from '@loopback/core';
import { DefaultCrudRepository } from '@loopback/repository';
import { PostgresDataSource } from '../datasources';
import { Schema, SchemaRelations } from '../models';

export class SchemaRepository extends DefaultCrudRepository<
  Schema,
  typeof Schema.prototype.id,
  SchemaRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(Schema, dataSource);
  }
}
