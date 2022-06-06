import { PresentationCreateData, PresentationsRepository, PresentationAddAttendeesData, Presentation } from '../presentations-repository';

export class MockPresentationsRepository implements PresentationsRepository {
  repo: Presentation[] = [];

  async create({ presentation, details, room, speakerId }: PresentationCreateData) {
    const mock = {
      id: this.repo.length + 1,
      details,
      presentation,
      room,
      speaker: {
        bio: "bio",
        company: "company",
        email: "email",
        name: "name"
      }
    };
    this.repo.push(mock);
    return mock;
  }

  async list() {
    return this.repo;
  }

  async get(id: number) {
    const found = this.repo.find(press => press.id === id);
    return found ? found : null;
  }
}