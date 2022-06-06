import { AttendeesRepository, AttendeeCreateData, Attendee } from '../attendees-repository';

export class MockAttendeesRepository implements AttendeesRepository {
  repo: Attendee[] = [];

  async create(mock: AttendeeCreateData) {
    this.repo.push(mock);
    return mock;
  }

  async get(email: string) {
    const found = this.repo.find(attendee => attendee.email === email);
    return found ? found : null;
  }
}