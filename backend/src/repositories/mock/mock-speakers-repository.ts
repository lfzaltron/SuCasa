import { SpeakersRepository, SpeakerCreateData, Speaker } from './../speakers-repository';

export class MockSpeakersRepository implements SpeakersRepository {
  repo: Speaker[] = [];

  async create(speaker: SpeakerCreateData) {
    const mock = {
      ...speaker,
      id: Math.random()
    };
    this.repo.push(mock);
    return mock;
  }
}