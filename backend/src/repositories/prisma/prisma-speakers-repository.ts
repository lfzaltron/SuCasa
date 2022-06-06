import { prisma } from './../../prisma';
import { SpeakersRepository, SpeakerCreateData } from './../speakers-repository';

export class PrismaSpeakersRepository implements SpeakersRepository {
  async create({ name, company, email, bio }: SpeakerCreateData) {
    return prisma.speaker.create({
      data: {
        name,
        company,
        email,
        bio
      }
    });
  }
}