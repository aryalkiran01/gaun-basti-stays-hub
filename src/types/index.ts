
export type UserRole = 'guest' | 'host' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  rating: number;
  reviewCount: number;
  images: string[];
  amenities: string[];
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  hostId: string;
}

export interface Booking {
  id: string;
  listingId: string;
  userId: string;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
}
