
export interface AttendeesOnPresentationsCreateData {
  presentationId: number;
  attendeeEmail: string;
}

export interface AttendeesOnPresentationsGetData {
  presentationId: number;
  attendeeEmail: string;
}

export interface AttendeesOnPresentations {
  attendeeId: string;
  presentationId: number;
  registered: Date;
}

export interface AttendeesOnPresentationsRepository {
  create: (data: AttendeesOnPresentationsCreateData) => Promise<void>;
  get: (data: AttendeesOnPresentationsGetData) => Promise<AttendeesOnPresentations | null>;
}