import { AttendeesOnPresentationsRepository } from './../repositories/attendees-on-presentations-repository';
import { AttendeesRepository } from '../repositories/attendees-repository';
import { SpeakersRepository } from '../repositories/speakers-repository';
import { PresentationsRepository } from '../repositories/presentations-repository';

interface Speaker {
  name: string;
  company: string;
  email: string;
  bio: string;
}

interface Attendee {
  name: string;
  company: string;
  email: string;
}

interface ImportDataUseCaseRequest {
  presentation: string;
  details: string;
  room: number;
  speaker: Speaker;
  attendees?: Attendee[];
}

export class ImportDataUseCase {

  constructor(
    private presentationsRepository: PresentationsRepository,
    private speakersRepository: SpeakersRepository,
    private attendeeRepository: AttendeesRepository,
    private attendeesOnPresentationsRepository: AttendeesOnPresentationsRepository,
  ) { }

  async execute({ presentation, details, room, speaker, attendees }: ImportDataUseCaseRequest) {
    //TODO: Check everything

    const { id: speakerId } = await this.speakersRepository.create({ name: speaker.name, company: speaker.company, email: speaker.email, bio: speaker.bio });

    const presentationCreated = await this.presentationsRepository.create({ presentation, details, room, speakerId });

    const attendeesPromises = attendees?.map(async ({ name, company, email }) => {
      await this.attendeeRepository.create({ name, company, email });
      return this.attendeesOnPresentationsRepository.create({ attendeeEmail: email, presentationId: presentationCreated.id });
    });

    if (attendeesPromises)
      await Promise.all(attendeesPromises);
  }

}