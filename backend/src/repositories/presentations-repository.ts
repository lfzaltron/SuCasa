export interface PresentationCreateData {
  presentation: string;
  details: string;
  room: number;
  speakerId: number;
}

export interface Presentation {
  id: number;
  presentation: string;
  details: string;
  room: number;
  speaker: {
    name: string;
    company: string;
    email: string;
    bio: string;
  };
}

export interface Attendee {
  email: string;
}

export interface PresentationAddAttendeesData {
  presentationId: number;
  attendeeEmail: string;
}

export interface PresentationsRepository {
  create: (data: PresentationCreateData) => Promise<Presentation>;
  list: () => Promise<Presentation[]>;
  get: (presentationId: number) => Promise<Presentation | null>;
}