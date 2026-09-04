import type { Activity, DemoState } from '@/domain/types';
import { addVenueCalendarDays, venueDateTime } from '@/domain/time';
import { stitchAssets } from './stitch-assets';

/** Display content transcribed from Stitch, kept separate from reservation rules. */
export const stitchCatalog = [
  { id: 'act_forest', name: 'Little Explorers: Forest Sensory Lab', category: 'sensory', age: '18 mos – 3 yrs', minAge: 1, maxAge: 3, price: 24, image: stitchAssets.playnest_activities_feed[2], icon: 'yard', description: 'Tactile discovery using moss, polished cedar disks, and scented lavender dough to promote tactile resilience.', location: 'The Willow Studio (0.8 mi) • West Wing Garden', tags: ['Fine Motor', 'Nature Connection', 'Sensory Tactile'], availability: '3 spots left today • 10:30 AM', action: 'Book Session', actionIcon: 'arrow_forward' },
  { id: 'act_melodies', name: 'Tiny Melodies & Rhythm Circle', category: 'music', age: '6 mos – 2 yrs', minAge: 0, maxAge: 2, price: 20, image: stitchAssets.playnest_activities_feed[3], icon: 'music_note', description: 'Gentle pentatonic chime play, calming lullabies, and rhythmic scarf dancing to soothe developing nervous systems.', location: 'Harmony Hall (1.2 mi) • Acoustic Sunroom', tags: ['Auditory Rhythm', 'Parent Bond', 'Language'], availability: 'Available • Today 2:00 PM & 3:30 PM', action: 'Select Time Slot', actionIcon: 'calendar_month' },
  { id: 'act_atelier', name: 'Messy Art & Finger Paint Atelier', category: 'sensory', age: '2 – 5 yrs', minAge: 2, maxAge: 5, price: 26, image: stitchAssets.playnest_activities_feed[4], icon: 'palette', description: 'Edible non-toxic plant pigments, textured canvas paper, and water splashing trays for unconstrained creative joy.', location: 'Clay & Color Barn (2.0 mi) • Studio A', tags: ['Fine Motor', 'Color Theory', 'Creative Freedom'], availability: 'Only 1 spot left • Tomorrow 9:30 AM', action: 'Claim Last Spot', actionIcon: 'bolt' },
  { id: 'act_yoga', name: 'Gentle Yoga & Baby Bonding', category: 'music', age: '0 – 12 mos', minAge: 0, maxAge: 1, price: 18, image: stitchAssets.playnest_activities_feed[5], icon: 'spa', description: 'Restorative postpartum stretching, gentle infant massage techniques, and peaceful breathwork for caregiver-child harmony.', location: 'The Breathing Room (1.5 mi) • Sanctuary Suite', tags: ['Postnatal Ease', 'Infant Massage', 'Bonding'], availability: 'Fully booked today', action: 'View activity', actionIcon: 'arrow_forward' },
] as const;
export const spotlight = { id: 'act_water_play', name: 'Weekend Sensory Forest & Water Play', price: 24, image: stitchAssets.playnest_home_discovery[2] };
export const soon = [
  { id: 'act_clay', name: 'Little Sculptors & Clay', price: 18, image: stitchAssets.playnest_home_discovery[3], when: 'Today • 2:00 PM', age: 'Toddlers (1–3)', location: 'Cedar Studio • 45 mins' },
  { id: 'act_rhythms', name: 'Gentle Rhythms & Lullabies', price: 16, image: stitchAssets.playnest_home_discovery[4], when: 'Tomorrow • 9:15 AM', age: 'Babies (0–1)', location: 'The Sun Nook • 30 mins' },
  { id: 'act_architects', name: 'Architects of Wonder', price: 22, image: stitchAssets.playnest_home_discovery[5], when: 'Tomorrow • 11:00 AM', age: 'Preschool (3–5)', location: 'Atelier Loft • 60 mins' },
] as const;
const extras = [{ ...spotlight, description: 'Tactile discovery with organic cedar boats, river rocks, and sensory foam.', minAge: 1, maxAge: 4, location: 'The Willow Studio • Room 2B' }, ...soon.map((item, i) => ({ ...item, description: item.name, minAge: i === 1 ? 0 : i === 2 ? 3 : 1, maxAge: i === 1 ? 1 : i === 2 ? 5 : 3 }))];
export const sourceActivities: Activity[] = [...stitchCatalog, ...extras].map((item) => ({ id: item.id, slug: item.id.replace('act_', ''), name: item.name, shortDescription: item.description, description: item.description, minAge: item.minAge, maxAge: item.maxAge, durationMinutes: item.id === 'act_rhythms' ? 30 : item.id === 'act_clay' ? 45 : 60, priceMinor: item.price * 100, currency: 'USD', ...(item.id === 'act_forest' ? { minAgeMonths: 18, maxAgeMonths: 47 } : item.id === 'act_melodies' ? { minAgeMonths: 6, maxAgeMonths: 35 } : item.id === 'act_yoga' ? { minAgeMonths: 0, maxAgeMonths: 12 } : {}), instructorName: 'Miss Clara, M.Ed', locationName: item.location, imageKey: item.id }));
export function activityPhoto(id: string): number { return [...stitchCatalog, spotlight, ...soon].find(item => item.id === id)?.image ?? stitchAssets.playnest_activity_detail_experience_overview[2]; }

/** Add the source demo without deleting any existing family records or bookings. */
export function withStitchFixtures(state: DemoState, now: Date): DemoState {
  if (state.activities.some(activity => activity.id === 'act_forest')) {
    const bookings = state.bookings.filter((booking) => booking.id !== 'bkg_stitch_preview');
    return bookings.length === state.bookings.length ? state : { ...state, bookings };
  }
  const date = addVenueCalendarDays(now, 1);
  const birth = (months: number) => { const d = new Date(addVenueCalendarDays(now, 0) + 'T00:00:00Z'); const day = d.getUTCDate(); d.setUTCDate(1); d.setUTCMonth(d.getUTCMonth() - months); d.setUTCDate(Math.min(day, new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0)).getUTCDate())); return d.toISOString().slice(0, 10); };
  const children = [{ id: 'child_leo', parentId: state.user.id, firstName: 'Leo', lastName: 'Mitchell', dateOfBirth: birth(36), emergencyContact: state.user.phone }, { id: 'child_maya', parentId: state.user.id, firstName: 'Maya', lastName: 'Mitchell', dateOfBirth: birth(18), emergencyContact: state.user.phone }];
  const sessions = sourceActivities.flatMap(activity => ['10:30', '13:00', '15:30'].map((time, index) => ({ id: `${activity.id}_${date}_${index}`, activityId: activity.id, startsAt: venueDateTime(date, time), capacity: 8, seededBookedCount: activity.id === 'act_yoga' ? 8 : activity.id === 'act_forest' && index === 2 ? 5 : [5, 3, 6][index], status: 'scheduled' as const })));
  return { ...state, activities: [...state.activities, ...sourceActivities], children: [...state.children, ...children], sessions: [...state.sessions, ...sessions] };
}
