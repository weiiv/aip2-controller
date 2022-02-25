import {Entity, model, property} from '@loopback/repository';

@model()
export class Schema extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;
  
  @property({
    type: 'string',
    required: true,
  })
  schema_name: string;

  @property({
    type: 'string',
    required: true,
  })
  schema_version: string;

  @property({
    type: 'string',
    required: true,
    index: true,
  })
  schema_id: string;

  @property({
    type: 'string',
    required: true,
  })
  tag: string;
  
  constructor(data?: Partial<Schema>) {
    super(data);
  }
}

export interface SchemaRelations {
  // describe navigational properties here¸¸
}

export type SchemaWithRelations = Schema & SchemaRelations;
