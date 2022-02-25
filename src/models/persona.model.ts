import { Entity, model, property } from '@loopback/repository';

@model()
export class Persona extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    postgresql: { columnName: 'first_name' },
  })
  firstName: string;

  @property({
    type: 'string',
    postgresql: { columnName: 'middle_name' },
  })
  middleName?: string;

  @property({
    type: 'string',
    postgresql: { columnName: 'last_name' },
  })
  lastName?: string;

  @property({
    type: 'string',
    postgresql: { columnName: 'birth_date' },
  })
  birthDate?: string;

  @property({
    type: 'string',
    postgresql: { columnName: 'civic_ddress' },
  })
  civicAddress?: string;

  @property({
    type: 'string',
  })
  city?: string;

  @property({
    type: 'string',
  })
  province?: string;

  @property({
    type: 'string',
    postgresql: { columnName: 'postal_code' },
  })
  postalCode?: string;

  @property({
    type: 'string',
  })
  country?: string;

  @property({
    type: 'string',
  })
  location?: string;

  @property({
    type: 'string',
  })
  photo?: string;

  constructor(data?: Partial<Persona>) {
    super(data);
  }
}

export interface PersonaRelations {
  // describe navigational properties here
}

export type PersonaWithRelations = Persona & PersonaRelations;


