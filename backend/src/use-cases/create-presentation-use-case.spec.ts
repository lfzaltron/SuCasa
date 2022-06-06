import { MockSpeakersRepository } from './../repositories/mock/mock-speakers-repository';
import { CreatePresentationUseCase } from './create-presentation-use-case';
import { MockPresentationsRepository } from './../repositories/mock/mock-presentations-repository';

let presentationRepository: MockPresentationsRepository;
let speakerRepository: MockSpeakersRepository;
let createPresentationUseCase: CreatePresentationUseCase;

describe('Create Presentation Use Case', () => {
  beforeEach(async () => {
    presentationRepository = new MockPresentationsRepository();
    speakerRepository = new MockSpeakersRepository();
    createPresentationUseCase = new CreatePresentationUseCase(presentationRepository, speakerRepository);
  })

  it('Should be able to create a presentation', async () => {
    await expect(createPresentationUseCase.execute({
      presentation: "the pressentation",
      details: "presentation details",
      room: 700,
      speaker: {
        name: "Bill",
        company: "micros",
        email: "bill@pro.com",
        bio: "Bill's bio"
      }
    })).resolves.not.toThrow();
  })

});

