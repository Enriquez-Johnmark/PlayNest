const dateFormatter = new Intl.DateTimeFormat('en-PH', {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
  timeZone: 'Asia/Manila',
});

const timeFormatter = new Intl.DateTimeFormat('en-PH', {
  hour: 'numeric',
  minute: '2-digit',
  timeZone: 'Asia/Manila',
});

export function formatVenueDate(startsAt: string): string {
  return dateFormatter.format(new Date(startsAt));
}

export function formatVenueTime(startsAt: string): string {
  return timeFormatter.format(new Date(startsAt));
}
