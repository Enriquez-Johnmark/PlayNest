export type BookingStatus = 'confirmed' | 'completed' | 'cancelled';
export type SessionStatus = 'scheduled' | 'cancelled';

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

export type Child = {
  id: string;
  parentId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  emergencyContact: string;
  notes?: string;
};

export type Activity = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  minAge: number;
  maxAge: number;
  minAgeMonths?: number;
  maxAgeMonths?: number;
  durationMinutes: number;
  priceMinor: number;
  currency: 'PHP' | 'USD';
  instructorName: string;
  locationName: string;
  imageKey: string;
};

export type Session = {
  id: string;
  activityId: string;
  startsAt: string;
  capacity: number;
  seededBookedCount: number;
  status: SessionStatus;
};

export type Booking = {
  id: string;
  reference: string;
  submissionId: string;
  careNotes?: string;
  userId: string;
  childId: string;
  sessionId: string;
  status: BookingStatus;
  createdAt: string;
};

export type DemoState = {
  version: 1;
  fixtureCreatedAt: string;
  nextBookingNumber: number;
  user: User;
  children: Child[];
  activities: Activity[];
  sessions: Session[];
  bookings: Booking[];
};

export type BookingDetails = {
  booking: Booking;
  child: Child;
  session: Session;
  activity: Activity;
};
