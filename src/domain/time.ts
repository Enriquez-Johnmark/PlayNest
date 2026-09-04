import { DomainError } from './errors';

const venueTimeZone = 'Asia/Manila';

function manilaDateParts(now: Date): { year: number; month: number; day: number } {
  const values = new Intl.DateTimeFormat('en-CA', {
    timeZone: venueTimeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now);

  const getPart = (type: Intl.DateTimeFormatPartTypes) => Number(values.find((part) => part.type === type)?.value);

  return { year: getPart('year'), month: getPart('month'), day: getPart('day') };
}

export function addVenueCalendarDays(now: Date, days: number): string {
  const { year, month, day } = manilaDateParts(now);
  const result = new Date(Date.UTC(year, month - 1, day + days));
  return result.toISOString().slice(0, 10);
}

export function venueDateTime(date: string, time: string): string {
  return `${date}T${time}:00+08:00`;
}

export function calculateChildAge(dateOfBirth: string, now: Date): number {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateOfBirth);

  if (!match) {
    throw new DomainError('UNKNOWN', 'Date of birth must use YYYY-MM-DD.');
  }

  const birthYear = Number(match[1]);
  const birthMonth = Number(match[2]);
  const birthDay = Number(match[3]);
  const today = manilaDateParts(now);
  const birthdayHasPassed = today.month > birthMonth || (today.month === birthMonth && today.day >= birthDay);

  return today.year - birthYear - (birthdayHasPassed ? 0 : 1);
}

/** Completed months, using the same venue calendar as year-based eligibility. */
export function calculateChildAgeInMonths(dateOfBirth: string, now: Date): number {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateOfBirth);
  if (!match) throw new DomainError('UNKNOWN', 'Date of birth must use YYYY-MM-DD.');
  const today = manilaDateParts(now);
  return (today.year - Number(match[1])) * 12 + today.month - Number(match[2]) - (today.day < Number(match[3]) ? 1 : 0);
}
