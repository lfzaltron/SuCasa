import { AttendeesOnPresentationsRepository } from './../repositories/attendees-on-presentations-repository';
import { AttendeesRepository } from './../repositories/attendees-repository';
import { PresentationsRepository } from '../repositories/presentations-repository';
import AppError from '../util/app-error';

interface AddAttendeeToPresentatiosListUseCaseRequest {
  presentationId: number;
  attendeeEmail: string;
}

export class AddAttendeeToPresentatiosListUseCase {

  constructor(
    private presentationsRepository: PresentationsRepository,
    private attendeeRepository: AttendeesRepository,
    private attendeesOnPresentationsRepository: AttendeesOnPresentationsRepository
  ) { }

  async execute({ presentationId, attendeeEmail }: AddAttendeeToPresentatiosListUseCaseRequest) {
    const presentation = await this.presentationsRepository.get(presentationId);
    if (!presentation)
      throw new AppError("presentation id is not valid.");

    const attendee = await this.attendeeRepository.get(attendeeEmail);
    if (!attendee)
      throw new AppError("attendee's email is not valid.");

    const attendeeOnPresentation = await this.attendeesOnPresentationsRepository.get({ presentationId, attendeeEmail });
    if (attendeeOnPresentation)
      throw new AppError("This attendee is already on the list for this presentation.");

    this.attendeesOnPresentationsRepository.create({ presentationId, attendeeEmail });
  }

}