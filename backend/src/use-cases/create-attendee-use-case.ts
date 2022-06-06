import { AttendeesRepository } from '../repositories/attendees-repository';
import AppError from '../util/app-error';

interface CreateAttendeeUseCaseRequest {
  name: string;
  company: string;
  email: string;
}

export class CreateAttendeeUseCase {

  constructor(
    private attendeeRepository: AttendeesRepository,
  ) { }

  async execute({ name, email, company }: CreateAttendeeUseCaseRequest) {

    const attendeeFound = await this.attendeeRepository.get(email);
    if (attendeeFound)
      throw new AppError("This e-mail is already used.");

    await this.attendeeRepository.create({ name, company, email });
  }
}