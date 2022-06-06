import { prisma } from '../../prisma';
import { AttendeesRepository, AttendeeCreateData } from '../attendees-repository';

export class PrismaAttendeesRepository implements AttendeesRepository {
  async create({ name, company, email }: AttendeeCreateData) {
    return await prisma.attendee.create({
      data: {
        name,
        company,
        email
      }
    });
  }

  async get(email: string) {
    return prisma.attendee.findUnique({
      where: {
        email
      }
    });
  }
}