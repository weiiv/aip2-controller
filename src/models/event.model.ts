import { Entity, model, property } from '@loopback/repository';

@model()
export class Event extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;

  @property({
    type: 'string',
    index: true,
  })
  ref_key_name?: string;

  @property({
    type: 'string',
    index: true,
  })
  ref_key_value?: string;

  @property({
    type: 'string',
  })
  event_type?: string;

  @property({
    type: 'string',
  })
  event_state?: string;

  @property({
    type: 'date',
  })
  create_time?: string;

  @property({
    type: 'string',
  })
  message?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Event>) {
    super(data);
  }
}

export interface EventRelations {
  // describe navigational properties here
}

export type EventWithRelations = Event & EventRelations;
