import { CafeTable, Reservation } from '../types/cafe';

export const INITIAL_TABLES: CafeTable[] = [
  // --- CONSERVATORY (Zone: conservatory) ---
  {
    id: 'tbl-101',
    tableNumber: 1,
    name: 'Conservatory Solarium 1',
    zone: 'conservatory',
    capacity: 2,
    shape: 'round',
    features: ['Skylight View', 'Garden Edge'],
    status: 'available',
    x: 18,
    y: 22
  },
  {
    id: 'tbl-102',
    tableNumber: 2,
    name: 'Conservatory Solarium 2',
    zone: 'conservatory',
    capacity: 4,
    shape: 'round',
    features: ['Olive Tree Adjacent', 'Spacious Seating'],
    status: 'available',
    x: 35,
    y: 22
  },
  {
    id: 'tbl-103',
    tableNumber: 3,
    name: 'Garden Greenhouse Pavilion',
    zone: 'conservatory',
    capacity: 6,
    shape: 'rect',
    features: ['Atrium Glass Center', 'Family & Group Friendly'],
    status: 'available',
    x: 25,
    y: 45
  },

  // --- ESPRESSO & ROASTER BAR (Zone: bar) ---
  {
    id: 'tbl-201',
    tableNumber: 4,
    name: 'Brew Bar Seat Alpha',
    zone: 'bar',
    capacity: 2,
    shape: 'round',
    features: ['Barista Sightline', 'High Stools', 'Power Outlets'],
    status: 'available',
    x: 65,
    y: 20
  },
  {
    id: 'tbl-202',
    tableNumber: 5,
    name: 'Brew Bar Seat Beta',
    zone: 'bar',
    capacity: 2,
    shape: 'round',
    features: ['Front Counter', 'Slayer Espresso Watch'],
    status: 'available',
    x: 82,
    y: 20
  },
  {
    id: 'tbl-203',
    tableNumber: 6,
    name: 'The Roaster High-Top',
    zone: 'bar',
    capacity: 4,
    shape: 'rect',
    features: ['Marble High Top', 'Casual Meeting'],
    status: 'available',
    x: 75,
    y: 40
  },

  // --- THE LIBRARY ALCOVE (Zone: alcove) ---
  {
    id: 'tbl-301',
    tableNumber: 7,
    name: 'Emerald Velvet Booth I',
    zone: 'alcove',
    capacity: 4,
    shape: 'booth',
    features: ['Deep Velvet Banquette', 'Quiet Reading Corner', 'Intimate Lighting'],
    status: 'available',
    x: 18,
    y: 75
  },
  {
    id: 'tbl-302',
    tableNumber: 8,
    name: 'Emerald Velvet Booth II',
    zone: 'alcove',
    capacity: 4,
    shape: 'booth',
    features: ['Bookcase Backdrop', 'Private Nook', 'Edison Lamp'],
    status: 'available',
    x: 35,
    y: 75
  },
  {
    id: 'tbl-303',
    tableNumber: 9,
    name: 'The Hearth Grand Table',
    zone: 'alcove',
    capacity: 8,
    shape: 'rect',
    features: ['Solid French Oak', 'Chandelier', 'Communal / Feast Table'],
    status: 'available',
    x: 26,
    y: 92
  },

  // --- THE COBBLESTONE TERRACE (Zone: terrace) ---
  {
    id: 'tbl-401',
    tableNumber: 10,
    name: 'Courtyard Bistro Bistro A',
    zone: 'terrace',
    capacity: 2,
    shape: 'round',
    features: ['Open Air', 'Rosemary Planters', 'Pet Friendly'],
    status: 'available',
    x: 68,
    y: 72
  },
  {
    id: 'tbl-402',
    tableNumber: 11,
    name: 'Courtyard Bistro Bistro B',
    zone: 'terrace',
    capacity: 2,
    shape: 'round',
    features: ['Overhead Heat Lamp', 'Street View'],
    status: 'available',
    x: 84,
    y: 72
  },
  {
    id: 'tbl-403',
    tableNumber: 12,
    name: 'Pergola Lounge Table',
    zone: 'terrace',
    capacity: 6,
    shape: 'rect',
    features: ['Canvas Canopy', 'Heated Bench', 'Evening Lanterns'],
    status: 'available',
    x: 76,
    y: 90
  }
];

// Initial seeded reservations so host stand and bookings lookup feel alive and ready to test
export const INITIAL_RESERVATIONS: Reservation[] = [
  {
    id: 'res-101',
    confirmationCode: 'VS-8241',
    guestName: 'Eleanor Vance',
    guestEmail: 'eleanor.vance@example.com',
    guestPhone: '(555) 234-8901',
    date: '2026-10-05',
    time: '11:30',
    mealPeriod: 'brunch',
    partySize: 4,
    zoneId: 'conservatory',
    tableId: 'tbl-102',
    specialRequests: 'Celebrating mother’s birthday; quiet corner if possible.',
    occasion: 'birthday',
    status: 'confirmed',
    createdAt: '2026-10-04T18:30:00Z'
  },
  {
    id: 'res-102',
    confirmationCode: 'VS-3914',
    guestName: 'Marcus Sterling',
    guestEmail: 'marcus.s@example.com',
    guestPhone: '(555) 902-3411',
    date: '2026-10-05',
    time: '19:00',
    mealPeriod: 'dinner',
    partySize: 2,
    zoneId: 'alcove',
    tableId: 'tbl-301',
    specialRequests: 'Window/nook preferred for anniversary dinner.',
    occasion: 'anniversary',
    status: 'confirmed',
    createdAt: '2026-10-04T19:15:00Z'
  },
  {
    id: 'res-103',
    confirmationCode: 'VS-5520',
    guestName: 'Dr. Julian Chen',
    guestEmail: 'j.chen@example.com',
    guestPhone: '(555) 441-2099',
    date: '2026-10-05',
    time: '09:00',
    mealPeriod: 'breakfast',
    partySize: 2,
    zoneId: 'bar',
    tableId: 'tbl-201',
    specialRequests: 'Near power outlets for coffee meeting.',
    occasion: 'business',
    status: 'confirmed',
    createdAt: '2026-10-04T20:00:00Z'
  }
];
