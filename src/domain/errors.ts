export type DomainErrorCode =
  | 'ACTIVITY_NOT_FOUND'
  | 'BOOKING_NOT_FOUND'
  | 'CHILD_INELIGIBLE'
  | 'CHILD_NOT_FOUND'
  | 'DUPLICATE_BOOKING'
  | 'PERSISTENCE_FAILED'
  | 'SESSION_CANCELLED'
  | 'SESSION_FULL'
  | 'SESSION_NOT_FOUND'
  | 'SESSION_PAST'
  | 'UNKNOWN';

export class DomainError extends Error {
  readonly code: DomainErrorCode;

  constructor(code: DomainErrorCode, message?: string) {
    super(message ?? code);
    this.name = 'DomainError';
    this.code = code;
  }
}

export function domainErrorMessage(error: unknown): string {
  if (!(error instanceof DomainError)) {
    return "We couldn't save your booking. Your selections are still here. Please try again.";
  }

  switch (error.code) {
    case 'CHILD_INELIGIBLE':
      return 'This activity is not available for this child’s age.';
    case 'DUPLICATE_BOOKING':
      return 'This child already has a booking for that session.';
    case 'SESSION_CANCELLED':
      return 'This session is no longer available. Please choose another time.';
    case 'SESSION_FULL':
      return 'That session just filled up. Please choose another time.';
    case 'SESSION_PAST':
      return 'That session has already started. Please choose another time.';
    default:
      return "We couldn't complete your booking. Your selections are still here. Please try again.";
  }
}
