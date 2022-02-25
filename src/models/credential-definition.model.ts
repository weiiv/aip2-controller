import { Entity, model, property } from '@loopback/repository';

@model({
  settings: { postgresql: { table: 'credential_definition' } }
})
export class CredentialDefinition extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    index: true,
  })
  credential_definition_id: string;

  @property({
    type: 'string',
    required: true,
  })
  tag: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<CredentialDefinition>) {
    super(data);
  }
}

export interface CredentialDefinitionRelations {
  // describe navigational properties here
}

export type CredentialDefinitionWithRelations = CredentialDefinition & CredentialDefinitionRelations;
