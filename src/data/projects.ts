// Mock project data
export interface Project {
  id: string;
  title: string;
  type: string;
  location: string;
  completionDate: string;
  description: string;
  categories: string[];
  features: string[];
  coverImage: string;
  images: string[];
}

export const projects: Project[] = [
  {
    id: 'modern-oasis',
    title: 'Modern Oasis',
    type: 'Infinity Pool',
    location: 'Malibu, CA',
    completionDate: 'June 2024',
    description: 'This stunning oceanfront infinity pool blends seamlessly with the horizon, creating an endless vista that merges with the Pacific. The design incorporates clean lines, premium stone finishes, and a minimalist aesthetic that complements the contemporary architecture of the home.',
    categories: ['modern', 'luxury'],
    features: ['infinity-edge', 'waterFeature', 'lighting', 'automation'],
    coverImage: 'https://images.pexels.com/photos/261327/pexels-photo-261327.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    images: [
      'https://images.pexels.com/photos/261327/pexels-photo-261327.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
      'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
      'https://images.pexels.com/photos/261395/pexels-photo-261395.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
      'https://images.pexels.com/photos/53464/sheraton-palace-hotel-lobby-architecture-san-francisco-53464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750'
    ]
  },
  {
    id: 'coastal-retreat',
    title: 'Coastal Retreat',
    type: 'Spa & Jacuzzi',
    location: 'Newport Beach, CA',
    completionDate: 'April 2024',
    description: 'This luxury spa installation was designed to provide the homeowners with a private retreat right in their backyard. The spa features custom hydrotherapy jets, LED chromatherapy lighting, and a waterfall feature that creates a soothing ambient sound.',
    categories: ['spa', 'modern'],
    features: ['spa', 'lighting', 'waterFeature'],
    coverImage: 'https://images.pexels.com/photos/261041/pexels-photo-261041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    images: [
      'https://images.pexels.com/photos/261041/pexels-photo-261041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
      'https://images.pexels.com/photos/221457/pexels-photo-221457.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
      'https://images.pexels.com/photos/261332/pexels-photo-261332.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
      'https://images.pexels.com/photos/260447/pexels-photo-260447.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750'
    ]
  },
  {
    id: 'mountain-escape',
    title: 'Mountain Escape',
    type: 'Resort Style Pool',
    location: 'Aspen, CO',
    completionDate: 'December 2023',
    description: 'Designed for a luxury mountain retreat, this heated pool and spa combination creates a perfect winter getaway. The design includes natural stone elements that blend with the surrounding landscape, a fire feature for ambiance, and an advanced heating system for year-round enjoyment.',
    categories: ['resort', 'luxury'],
    features: ['spa', 'fireFeature', 'heating', 'naturalStone'],
    coverImage: 'https://images.pexels.com/photos/53464/sheraton-palace-hotel-lobby-architecture-san-francisco-53464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    images: [
      'https://images.pexels.com/photos/53464/sheraton-palace-hotel-lobby-architecture-san-francisco-53464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
      'https://images.pexels.com/photos/261101/pexels-photo-261101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
      'https://images.pexels.com/photos/261330/pexels-photo-261330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
      'https://images.pexels.com/photos/221416/pexels-photo-221416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750'
    ]
  },
  {
    id: 'mediterranean-villa',
    title: 'Mediterranean Villa',
    type: 'Classic Pool',
    location: 'Santa Barbara, CA',
    completionDate: 'August 2023',
    description: 'This elegant pool design draws inspiration from Mediterranean architecture with its azure blue tiles, classic detailing, and surrounding terracotta stonework. The design includes a raised spa with spillover, custom mosaic tile work, and an adjacent outdoor kitchen area.',
    categories: ['classic', 'luxury'],
    features: ['spa', 'customTile', 'outdoorKitchen'],
    coverImage: 'https://images.pexels.com/photos/261422/pexels-photo-261422.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    images: [
      'https://images.pexels.com/photos/261422/pexels-photo-261422.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
      'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
      'https://images.pexels.com/photos/261038/pexels-photo-261038.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
      'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750'
    ]
  },
  {
    id: 'urban-sanctuary',
    title: 'Urban Sanctuary',
    type: 'Rooftop Pool',
    location: 'Los Angeles, CA',
    completionDate: 'May 2023',
    description: 'Perched on top of a luxury penthouse, this rooftop pool offered unique design challenges. Our team created a sleek, modern design with structural reinforcement, smart automation, and stunning city views. The glass edge design creates a dramatic visual effect against the city skyline.',
    categories: ['modern', 'unique'],
    features: ['infinity-edge', 'lighting', 'automation'],
    coverImage: 'https://images.pexels.com/photos/261106/pexels-photo-261106.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    images: [
      'https://images.pexels.com/photos/261106/pexels-photo-261106.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
      'https://images.pexels.com/photos/263186/pexels-photo-263186.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
      'https://images.pexels.com/photos/221457/pexels-photo-221457.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
      'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750'
    ]
  },
  {
    id: 'tropical-lagoon',
    title: 'Tropical Lagoon',
    type: 'Natural Pool',
    location: 'Laguna Beach, CA',
    completionDate: 'July 2023',
    description: 'This natural swimming pool was designed to mimic a tropical lagoon with its free-form shape, beach entry, and lush surrounding landscaping. The design includes natural stone waterfalls, hidden grottos, and environmentally friendly filtration systems.',
    categories: ['natural', 'unique'],
    features: ['beachEntry', 'waterFeature', 'naturalStone'],
    coverImage: 'https://images.pexels.com/photos/261283/pexels-photo-261283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    images: [
      'https://images.pexels.com/photos/261283/pexels-photo-261283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
      'https://images.pexels.com/photos/261411/pexels-photo-261411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
      'https://images.pexels.com/photos/261248/pexels-photo-261248.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
      'https://images.pexels.com/photos/261155/pexels-photo-261155.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750'
    ]
  },
];