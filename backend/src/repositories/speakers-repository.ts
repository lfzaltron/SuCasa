export interface SpeakerCreateData {
  name: string;
  company: string;
  email: string;
  bio: string;
}

export interface Speaker {
  id: number;
  name: string;
  company: string;
  email: string;
  bio: string;
}

export interface SpeakersRepository {
  create: (data: SpeakerCreateData) => Promise<Speaker>;
}