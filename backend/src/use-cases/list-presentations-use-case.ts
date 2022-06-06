import { PresentationsRepository } from './../repositories/presentations-repository';

export class ListPresentationsUseCase {

  constructor(
    private presentationsRepository: PresentationsRepository,
  ) { }

  async execute() {
    return this.presentationsRepository.list();
  }

}