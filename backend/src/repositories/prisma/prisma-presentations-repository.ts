import { prisma } from './../../prisma';
import { PresentationCreateData, PresentationsRepository, PresentationAddAttendeesData, Presentation } from '../presentations-repository';

export class PrismaPresentationsRepository implements PresentationsRepository {
  async create({ presentation, details, room, speakerId }: PresentationCreateData) {
    return await prisma.presentation.create({
      data: {
        presentation,
        details,
        room,
        speakerId
      },
      select: {
        id: true,
        presentation: true,
        details: true,
        room: true,
        speaker: true
      }
    });
  }

  async list() {
    return prisma.presentation.findMany({
      select: {
        id: true,
        presentation: true,
        details: true,
        room: true,
        speaker: true
      }
    });
  }

  async get(id: number) {
    return prisma.presentation.findUnique({
      where: {
        id
      },
      select: {
        id: true,
        presentation: true,
        details: true,
        room: true,
        speaker: true
      }
    });
  }
}