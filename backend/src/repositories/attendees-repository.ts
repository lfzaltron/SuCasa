export interface AttendeeCreateData {
  name: string;
  company: string;
  email: string;
}

export interface Attendee {
  name: string;
  company: string;
  email: string;
}

export interface AttendeesRepository {
  create: (data: AttendeeCreateData) => Promise<Attendee>;
  get: (attendeeEmail: string) => Promise<Attendee | null>;
}