export type DietaryTag = 'vegan' | 'vegetarian' | 'gluten-free' | 'chef-pick' | 'signature';

export interface MenuItem {
  id: string;
  name: string;
  category: 'coffee' | 'tea' | 'bakery' | 'brunch' | 'plates' | 'desserts';
  price: number;
  description: string;
  calories?: number;
  caffeineLevel?: 'None' | 'Low' | 'Medium' | 'High';
  origin?: string;
  tastingNotes?: string[];
  allergens?: string[];
  tags: DietaryTag[];
  popular?: boolean;
  options?: {
    milks?: string[];
    sweetness?: string[];
    temperatures?: string[];
    additions?: { name: string; price: number }[];
  };
  visualTheme: {
    bgGradient: string;
    accentColor: string;
    iconName: 'coffee' | 'cup' | 'croissant' | 'egg' | 'salad' | 'cake' | 'sparkles' | 'wine';
  };
}

export type ZoneId = 'conservatory' | 'bar' | 'alcove' | 'terrace';

export interface DiningZone {
  id: ZoneId;
  name: string;
  subtitle: string;
  description: string;
  atmosphere: string;
  idealFor: string;
  capacity: string;
}

export type TableStatus = 'available' | 'reserved' | 'occupied';

export interface CafeTable {
  id: string;
  tableNumber: number;
  name: string;
  zone: ZoneId;
  capacity: number;
  shape: 'round' | 'rect' | 'booth';
  features: string[];
  status: TableStatus;
  x: number; // percentage coordinate for floor plan SVG/grid (0-100)
  y: number; // percentage coordinate for floor plan SVG/grid (0-100)
  currentReservationId?: string;
}

export type MealPeriod = 'breakfast' | 'brunch' | 'afternoon_tea' | 'dinner';

export interface Reservation {
  id: string;
  confirmationCode: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  mealPeriod: MealPeriod;
  partySize: number;
  zoneId: ZoneId;
  tableId: string;
  specialRequests?: string;
  occasion?: 'casual' | 'anniversary' | 'birthday' | 'business' | 'date_night';
  status: 'confirmed' | 'seated' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface CartCustomization {
  milk?: string;
  sweetness?: string;
  temperature?: string;
  decaf?: boolean;
  selectedAdditions?: string[];
  specialInstructions?: string;
}

export interface CartItem {
  cartItemId: string;
  menuItem: MenuItem;
  quantity: number;
  customization: CartCustomization;
  itemTotal: number;
}

export interface OrderReceipt {
  orderId: string;
  orderNumber: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  serviceType: 'dine_in' | 'pickup';
  tableNumber?: string;
  estimatedPickupMinutes?: number;
  customerName: string;
  customerPhone: string;
  createdAt: string;
  status: 'received' | 'brewing' | 'ready' | 'completed';
}
