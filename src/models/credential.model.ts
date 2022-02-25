import { Entity, model, property } from '@loopback/repository';
import { Persona } from './persona.model';

@model()
export class Credential extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;

  @property({
    type: 'number',
  })
  persona_id: number;

  @property({
    type: 'string',
  })
  indy_network?: string;

  @property({
    type: 'string',
  })
  aip_version?: string;

  @property({
    type: 'string',
  })
  credential_format?: string;

  @property({
    type: 'string',
  })
  signature_type?: string;

  @property({
    type: 'string',
  })
  schema_id?: string;

  @property({
    type: 'string',
    index: true,
  })
  connection_id?: string;

  @property({
    type: 'string',
  })
  cred_def_id?: string;

  @property({
    type: 'string',
  })
  cred_rev_id?: string;

  @property({
    type: 'string',
  })
  rev_reg_id?: string;

  @property({
    type: 'string',
    index: true,
  })
  session_id?: string;

  @property({
    type: 'date',
  })
  create_time?: string;

  @property({
    type: 'date',
  })
  update_time?: string;

  @property({
    type: 'string',
  })
  status?: string;

  @property({
    type: 'object',
  })
  attributes?: Persona;

  @property({
    type: 'string',
  })
  result?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Credential>) {
    super(data);
  }
}

export interface CredentialRelations {
  // describe navigational properties here
}

export type CredentialWithRelations = Credential & CredentialRelations;
