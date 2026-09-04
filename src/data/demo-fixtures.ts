import { addVenueCalendarDays, venueDateTime } from '@/domain/time';
import type { Activity, DemoState } from '@/domain/types';

const user = {
  id: 'usr_sarah',
  name: 'Sarah Reyes',
  email: 'sarah@example.test',
  phone: '+63 917 000 0000',
};

const activities: Activity[] = [
  {
    id: 'act_toddler_time',
    slug: 'toddler-time',
    name: 'Toddler Time',
    shortDescription: 'Gentle movement and guided play for little explorers.',
    description: 'A calm, playful session for toddlers to explore movement, balance, and social play in a safe environment.',
    minAge: 1,
    maxAge: 3,
    durationMinutes: 45,
    priceMinor: 35000,
    currency: 'PHP',
    instructorName: 'Coach Mia',
    locationName: 'PlayNest Activity Center',
    imageKey: 'toddler-time',
  },
  {
    id: 'act_little_explorers',
    slug: 'little-explorers',
    name: 'Little Explorers',
    shortDescription: 'Movement, balance, coordination, and playful challenges.',
    description: 'A guided activity class that helps young children build confidence, balance, coordination, and body awareness through age-appropriate play.',
    minAge: 3,
    maxAge: 5,
    durationMinutes: 45,
    priceMinor: 40000,
    currency: 'PHP',
    instructorName: 'Coach Anna',
    locationName: 'PlayNest Activity Center',
    imageKey: 'little-explorers',
  },
  {
    id: 'act_junior_gymnastics',
    slug: 'junior-gymnastics',
    name: 'Junior Gymnastics',
    shortDescription: 'A fun introduction to gymnastics fundamentals.',
    description: 'An energetic beginner-friendly session covering basic gymnastics movement, coordination, strength, and confidence.',
    minAge: 5,
    maxAge: 8,
    durationMinutes: 45,
    priceMinor: 45000,
    currency: 'PHP',
    instructorName: 'Coach Alex',
    locationName: 'PlayNest Activity Center',
    imageKey: 'junior-gymnastics',
  },
  {
    id: 'act_open_play',
    slug: 'open-play',
    name: 'Open Play',
    shortDescription: 'Flexible supervised play in the PlayNest activity space.',
    description: 'A relaxed open-play session where children can explore the activity space at their own pace.',
    minAge: 2,
    maxAge: 10,
    durationMinutes: 90,
    priceMinor: 30000,
    currency: 'PHP',
    instructorName: 'PlayNest Team',
    locationName: 'PlayNest Activity Center',
    imageKey: 'open-play',
  },
];

export function createDemoState(now: Date): DemoState {
  const date = addVenueCalendarDays(now, 7);
  const juniorGymnasticsId = 'act_junior_gymnastics';

  return {
    version: 1,
    fixtureCreatedAt: now.toISOString(),
    nextBookingNumber: 1,
    user,
    children: [
      {
        id: 'child_emma',
        parentId: user.id,
        firstName: 'Emma',
        lastName: 'Reyes',
        dateOfBirth: '2021-04-12',
        emergencyContact: '+63 917 000 0000',
      },
      {
        id: 'child_lucas',
        parentId: user.id,
        firstName: 'Lucas',
        lastName: 'Reyes',
        dateOfBirth: '2023-03-08',
        emergencyContact: '+63 917 000 0000',
      },
    ],
    activities,
    sessions: [
      { id: `ses_jg_${date}_0900`, activityId: juniorGymnasticsId, startsAt: venueDateTime(date, '09:00'), capacity: 10, seededBookedCount: 5, status: 'scheduled' },
      { id: `ses_jg_${date}_1100`, activityId: juniorGymnasticsId, startsAt: venueDateTime(date, '11:00'), capacity: 10, seededBookedCount: 8, status: 'scheduled' },
      { id: `ses_jg_${date}_1400`, activityId: juniorGymnasticsId, startsAt: venueDateTime(date, '14:00'), capacity: 10, seededBookedCount: 6, status: 'scheduled' },
      { id: `ses_jg_${date}_1600`, activityId: juniorGymnasticsId, startsAt: venueDateTime(date, '16:00'), capacity: 10, seededBookedCount: 10, status: 'scheduled' },
    ],
    bookings: [],
  };
}
