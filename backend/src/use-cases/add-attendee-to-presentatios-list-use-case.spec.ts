import { MockSpeakersRepository } from './../repositories/mock/mock-speakers-repository';
import { CreatePresentationUseCase } from './create-presentation-use-case';
import { MockAttendeesOnPresentationsRepository } from './../repositories/mock/mock-attendees-on-presentations-repository';
import { MockPresentationsRepository } from './../repositories/mock/mock-presentations-repository';
import { AddAttendeeToPresentatiosListUseCase } from './add-attendee-to-presentatios-list-use-case';
import AppError from '../util/app-error';
import { MockAttendeesRepository } from './../repositories/mock/mock-attendees-repository';
import { CreateAttendeeUseCase } from './create-attendee-use-case';

let presentationRepository: MockPresentationsRepository;
let attendeesRepository: MockAttendeesRepository;
let attendeesOnPresentationsRepository: MockAttendeesOnPresentationsRepository;
let addAttendeeToPresentatiosUseCase: AddAttendeeToPresentatiosListUseCase;
let speakerRepository: MockSpeakersRepository;
let createAttendeeUseCase: CreateAttendeeUseCase;
let createPresentationUseCase: CreatePresentationUseCase;

describe('Add Attendee to Presentation Use Case', () => {
  beforeEach(async () => {
    attendeesRepository = new MockAttendeesRepository();
    presentationRepository = new MockPresentationsRepository();
    attendeesOnPresentationsRepository = new MockAttendeesOnPresentationsRepository();
    addAttendeeToPresentatiosUseCase = new AddAttendeeToPresentatiosListUseCase(presentationRepository, attendeesRepository, attendeesOnPresentationsRepository);
    createAttendeeUseCase = new CreateAttendeeUseCase(attendeesRepository);
    speakerRepository = new MockSpeakersRepository();
    createPresentationUseCase = new CreatePresentationUseCase(presentationRepository, speakerRepository);

    await createAttendeeUseCase.execute({ name: "luis", company: "co", email: "attendee@mail.com" });
    await createPresentationUseCase.execute({
      presentation: "the pressentation",
      details: "presentation details",
      room: 700,
      speaker: {
        name: "Bill",
        company: "micros",
        email: "bill@pro.com",
        bio: "Bill's bio"
      }
    });
  })

  it('Should be able to add an attendee to a presentation', async () => {
    await expect(addAttendeeToPresentatiosUseCase.execute({
      attendeeEmail: "attendee@mail.com",
      presentationId: 1
    })).resolves.not.toThrow();
  })

  it('Should not be able to add an invalid attendee to a presentation', async () => {
    await expect(addAttendeeToPresentatiosUseCase.execute({
      attendeeEmail: "invalid@mail.com",
      presentationId: 1
    })).rejects.toBeInstanceOf(AppError);
  })

  it('Should not be able to add an attendee to an invalid presentation', async () => {
    await expect(addAttendeeToPresentatiosUseCase.execute({
      attendeeEmail: "attendee@mail.com",
      presentationId: 2
    })).rejects.toBeInstanceOf(AppError);
  })

  it('Should not be able to add an attendee to a presentation twice', async () => {
    await addAttendeeToPresentatiosUseCase.execute({
      attendeeEmail: "attendee@mail.com",
      presentationId: 1
    });

    await expect(addAttendeeToPresentatiosUseCase.execute({
      attendeeEmail: "attendee@mail.com",
      presentationId: 1
    })).rejects.toBeInstanceOf(AppError);
  })

});

