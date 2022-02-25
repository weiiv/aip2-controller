import { EventRepository } from "../repositories";

export function getEnv(name: string, encoding?: string): string {
  let value: string = process.env[name] ?? '';

  if (encoding?.toLowerCase() === 'base64') {
    const buffer = Buffer.from(value, 'base64');
    value = buffer.toString('utf-8');
    value = value.replace(/\\n/g, '\n');
  }
  console.log('env[' + name + '] = ' + value);
  return value;
}

export function getEnvObj(name: string, encoding?: string): any {
  return JSON.parse(getEnv(name, encoding));
}

export function logEvent(
  refKeyName: string,
  refKeyValue: string,
  eventType: string,
  eventState: string,
  message: string,
  eventRepository: EventRepository
) {
  return eventRepository.create({
    ref_key_name: refKeyName,
    ref_key_value: refKeyValue,
    event_type: eventType,
    event_state: eventState,
    message: message,
    create_time: new Date().toISOString()
  });
} 