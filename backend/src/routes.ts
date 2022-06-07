import express from 'express';
import { ListPresentationsUseCase } from './use-cases/list-presentations-use-case';
import { CreateAttendeeUseCase } from './use-cases/create-attendee-use-case';
import { AddAttendeeToPresentatiosListUseCase } from './use-cases/add-attendee-to-presentatios-list-use-case';
import { CreatePresentationUseCase } from './use-cases/create-presentation-use-case';
import { PrismaAttendeesRepository } from './repositories/prisma/prisma-attendees-repository';
import { PrismaSpeakersRepository } from './repositories/prisma/prisma-speakers-repository';
import { PrismaPresentationsRepository } from './repositories/prisma/prisma-presentations-repository';
import { PrismaAttendeesOnPresentationsRepository } from './repositories/prisma/prisma-attendees-on-presentations-repository';

export const routes = express.Router();

routes.get('/presentations', async (_, res) => {
  const presentationsRepository = new PrismaPresentationsRepository();
  const listPresentationUseCase = new ListPresentationsUseCase(presentationsRepository);
  const presentations = await listPresentationUseCase.execute();

  res.json(presentations).send();
});

routes.post('/presentations', async (req, res) => {
  const {details, presentation, room, speaker} = req.body;

  const presentationsRepository = new PrismaPresentationsRepository();
  const speakersRepository = new PrismaSpeakersRepository();
  const createPresentationUseCase = new CreatePresentationUseCase(presentationsRepository, speakersRepository);
  await createPresentationUseCase.execute({details, presentation, room, speaker});

  res.status(201).send();
});

routes.post('/attendees', async (req, res) => {
  const {name, company, email} = req.body;

  const attendeesRepository = new PrismaAttendeesRepository();
  const createAttendeeUseCase = new CreateAttendeeUseCase(attendeesRepository);
  await createAttendeeUseCase.execute({name, company, email});

  res.status(201).send();
});

routes.post('/presentation/:presentation_id/attendees', async (req, res) => {
  const presentationId = parseInt(req.params.presentation_id);
  const attendeeEmail = req.body.email;

  const presentationsRepository = new PrismaPresentationsRepository();
  const attendeesRepository = new PrismaAttendeesRepository();
  const attendeesOnPresentationsRepository = new PrismaAttendeesOnPresentationsRepository();
  const addUserToPresentationUseCase = new AddAttendeeToPresentatiosListUseCase(presentationsRepository, attendeesRepository, attendeesOnPresentationsRepository);
  await addUserToPresentationUseCase.execute({presentationId, attendeeEmail});

  res.status(201).send();
});