import { SpeakersRepository } from './../repositories/speakers-repository';
import { PresentationsRepository } from './../repositories/presentations-repository';
import AppError from '../util/app-error';

interface Speaker {
  name: string;
  company: string;
  email: string;
  bio: string;
}

interface CreatePresentationUseCaseRequest {
  presentation: string;
  details: string;
  room: number;
  speaker: Speaker;
}

export class CreatePresentationUseCase {

  constructor(
    private presentationsRepository: PresentationsRepository,
    private speakersRepository: SpeakersRepository,
  ) { }

  async execute({ presentation, details, room, speaker }: CreatePresentationUseCaseRequest) {
    const { id: speakerId } = await this.speakersRepository.create({ name: speaker.name, company: speaker.company, email: speaker.email, bio: speaker.bio });

    await this.presentationsRepository.create({ presentation, details, room, speakerId });
  }

}