import { AttendeesOnPresentationsRepository, AttendeesOnPresentationsGetData, AttendeesOnPresentationsCreateData } from './../attendees-on-presentations-repository';
import { prisma } from './../../prisma';

export class PrismaAttendeesOnPresentationsRepository implements AttendeesOnPresentationsRepository {

  async create({ presentationId, attendeeEmail }: AttendeesOnPresentationsCreateData) {
    await prisma.attendeesOnPresentation.create({
      data: {
        attendeeId: attendeeEmail,
        presentationId
      }
    });
  }

  async get({ attendeeEmail, presentationId }: AttendeesOnPresentationsGetData) {
    const [result] = await prisma.attendeesOnPresentation.findMany({
      where: {
        attendeeId: attendeeEmail,
        presentationId
      },
      select: {
        attendeeId: true,
        presentationId: true,
        registered: true,
      }
    });
    return result ? result : null;
  }
}
