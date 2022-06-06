import AppError from '../util/app-error';
import { MockAttendeesRepository } from './../repositories/mock/mock-attendees-repository';
import { CreateAttendeeUseCase } from './create-attendee-use-case';

let attendeesRepository: MockAttendeesRepository;
let createAttendeeUseCase: CreateAttendeeUseCase;

describe('Create Attendee Use Case', () => {
  beforeEach(() => {
    attendeesRepository = new MockAttendeesRepository();
    createAttendeeUseCase = new CreateAttendeeUseCase(attendeesRepository);
  })

  it('Should be able to add an attendee', async () => {
    await expect(createAttendeeUseCase.execute({
      name: "Luis Fernando Zaltron",
      company: "SuCasa",
      email: "lfzaltron@gmail.com"
    })).resolves.not.toThrow();
  })

  it('Should not be able to add an attendee with an already used email', async () => {
    await createAttendeeUseCase.execute({
      name: "Luis Fernando Zaltron",
      company: "SuCasa",
      email: "lfzaltron@gmail.com"
    });

    await expect(createAttendeeUseCase.execute({
      name: "Luis Fernando",
      company: "My Company",
      email: "lfzaltron@gmail.com"
    })).rejects.toBeInstanceOf(AppError);
  })

});

