import { ListPresentationsUseCase } from './list-presentations-use-case';
import { MockSpeakersRepository } from './../repositories/mock/mock-speakers-repository';
import { CreatePresentationUseCase } from './create-presentation-use-case';
import { MockPresentationsRepository } from './../repositories/mock/mock-presentations-repository';

let presentationRepository: MockPresentationsRepository;
let speakerRepository: MockSpeakersRepository;
let createPresentationUseCase: CreatePresentationUseCase;
let listPresentationsUseCase: ListPresentationsUseCase;



describe('List Presentations Use Case', () => {
  beforeEach(async () => {
    presentationRepository = new MockPresentationsRepository();
    speakerRepository = new MockSpeakersRepository();
    createPresentationUseCase = new CreatePresentationUseCase(presentationRepository, speakerRepository);
    listPresentationsUseCase = new ListPresentationsUseCase(presentationRepository);
  })

  it('Should be able to list presentations', async () => {
    const presentation = {
      presentation: "the pressentation",
      details: "presentation details",
      room: 700,
      speaker: {
        bio: "bio",
        company: "company",
        email: "email",
        name: "name",
      }
    };
    await createPresentationUseCase.execute(presentation);
    const list = await listPresentationsUseCase.execute();

    expect(list).toEqual([{ ...presentation, id: 1 }]);
  })

});

