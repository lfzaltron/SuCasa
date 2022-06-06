import { AttendeesOnPresentationsRepository, AttendeesOnPresentationsGetData, AttendeesOnPresentationsCreateData, AttendeesOnPresentations } from './../attendees-on-presentations-repository';

export class MockAttendeesOnPresentationsRepository implements AttendeesOnPresentationsRepository {
  repo: AttendeesOnPresentations[] = [];

  async create({ presentationId, attendeeEmail }: AttendeesOnPresentationsCreateData) {
    this.repo.push({ presentationId, attendeeId: attendeeEmail, registered: new Date() });
  }

  async get({ attendeeEmail, presentationId }: AttendeesOnPresentationsGetData) {
    const result = this.repo.find(curr => curr.attendeeId === attendeeEmail && curr.presentationId === presentationId);
    return result ? result : null;
  }
}
