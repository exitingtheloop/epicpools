/*
  # Insert sample projects and categories
  
  This migration adds initial data for:
  - Project categories
  - Projects
  - Project category mappings
  - Project assets
*/

-- Insert project categories
INSERT INTO project_categories (id, name) VALUES
  ('c1b21c3a-1234-4a85-9876-1234567890ab', 'modern'),
  ('c2b21c3a-1234-4a85-9876-1234567890ac', 'classic'),
  ('c3b21c3a-1234-4a85-9876-1234567890ad', 'luxury'),
  ('c4b21c3a-1234-4a85-9876-1234567890ae', 'resort'),
  ('c5b21c3a-1234-4a85-9876-1234567890af', 'spa'),
  ('c6b21c3a-1234-4a85-9876-1234567890a1', 'natural'),
  ('c7b21c3a-1234-4a85-9876-1234567890a2', 'unique');

-- Insert projects
INSERT INTO projects (id, title, type, location, description, completion_date) VALUES
  (
    '11b21c3a-1234-4a85-9876-1234567890ab',
    'Modern Oasis',
    'Infinity Pool',
    'Malibu, CA',
    'This stunning oceanfront infinity pool blends seamlessly with the horizon, creating an endless vista that merges with the Pacific. The design incorporates clean lines, premium stone finishes, and a minimalist aesthetic that complements the contemporary architecture of the home.',
    '2024-06-01'
  ),
  (
    '12b21c3a-1234-4a85-9876-1234567890ac',
    'Coastal Retreat',
    'Spa & Jacuzzi',
    'Newport Beach, CA',
    'This luxury spa installation was designed to provide the homeowners with a private retreat right in their backyard. The spa features custom hydrotherapy jets, LED chromatherapy lighting, and a waterfall feature that creates a soothing ambient sound.',
    '2024-04-01'
  ),
  (
    '13b21c3a-1234-4a85-9876-1234567890ad',
    'Mountain Escape',
    'Resort Style Pool',
    'Aspen, CO',
    'Designed for a luxury mountain retreat, this heated pool and spa combination creates a perfect winter getaway. The design includes natural stone elements that blend with the surrounding landscape, a fire feature for ambiance, and an advanced heating system for year-round enjoyment.',
    '2023-12-01'
  ),
  (
    '14b21c3a-1234-4a85-9876-1234567890ae',
    'Mediterranean Villa',
    'Classic Pool',
    'Santa Barbara, CA',
    'This elegant pool design draws inspiration from Mediterranean architecture with its azure blue tiles, classic detailing, and surrounding terracotta stonework. The design includes a raised spa with spillover, custom mosaic tile work, and an adjacent outdoor kitchen area.',
    '2023-08-01'
  ),
  (
    '15b21c3a-1234-4a85-9876-1234567890af',
    'Urban Sanctuary',
    'Rooftop Pool',
    'Los Angeles, CA',
    'Perched on top of a luxury penthouse, this rooftop pool offered unique design challenges. Our team created a sleek, modern design with structural reinforcement, smart automation, and stunning city views. The glass edge design creates a dramatic visual effect against the city skyline.',
    '2023-05-01'
  ),
  (
    '16b21c3a-1234-4a85-9876-1234567890a1',
    'Tropical Lagoon',
    'Natural Pool',
    'Laguna Beach, CA',
    'This natural swimming pool was designed to mimic a tropical lagoon with its free-form shape, beach entry, and lush surrounding landscaping. The design includes natural stone waterfalls, hidden grottos, and environmentally friendly filtration systems.',
    '2023-07-01'
  );

-- Insert project category mappings
INSERT INTO project_category_mappings (project_id, category_id) VALUES
  ('11b21c3a-1234-4a85-9876-1234567890ab', 'c1b21c3a-1234-4a85-9876-1234567890ab'),
  ('11b21c3a-1234-4a85-9876-1234567890ab', 'c3b21c3a-1234-4a85-9876-1234567890ad'),
  ('12b21c3a-1234-4a85-9876-1234567890ac', 'c5b21c3a-1234-4a85-9876-1234567890af'),
  ('12b21c3a-1234-4a85-9876-1234567890ac', 'c1b21c3a-1234-4a85-9876-1234567890ab'),
  ('13b21c3a-1234-4a85-9876-1234567890ad', 'c4b21c3a-1234-4a85-9876-1234567890ae'),
  ('13b21c3a-1234-4a85-9876-1234567890ad', 'c3b21c3a-1234-4a85-9876-1234567890ad'),
  ('14b21c3a-1234-4a85-9876-1234567890ae', 'c2b21c3a-1234-4a85-9876-1234567890ac'),
  ('14b21c3a-1234-4a85-9876-1234567890ae', 'c3b21c3a-1234-4a85-9876-1234567890ad'),
  ('15b21c3a-1234-4a85-9876-1234567890af', 'c1b21c3a-1234-4a85-9876-1234567890ab'),
  ('15b21c3a-1234-4a85-9876-1234567890af', 'c7b21c3a-1234-4a85-9876-1234567890a2'),
  ('16b21c3a-1234-4a85-9876-1234567890a1', 'c6b21c3a-1234-4a85-9876-1234567890a1'),
  ('16b21c3a-1234-4a85-9876-1234567890a1', 'c7b21c3a-1234-4a85-9876-1234567890a2');

-- Insert project assets
INSERT INTO project_assets (project_id, url, type, is_cover, "order") VALUES
  ('11b21c3a-1234-4a85-9876-1234567890ab', 'https://images.pexels.com/photos/261327/pexels-photo-261327.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', 'image', true, 1),
  ('11b21c3a-1234-4a85-9876-1234567890ab', 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', 'image', false, 2),
  ('11b21c3a-1234-4a85-9876-1234567890ab', 'https://images.pexels.com/photos/261395/pexels-photo-261395.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', 'image', false, 3),
  ('11b21c3a-1234-4a85-9876-1234567890ab', 'https://images.pexels.com/photos/53464/sheraton-palace-hotel-lobby-architecture-san-francisco-53464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', 'image', false, 4),
  
  ('12b21c3a-1234-4a85-9876-1234567890ac', 'https://images.pexels.com/photos/261041/pexels-photo-261041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', 'image', true, 1),
  ('12b21c3a-1234-4a85-9876-1234567890ac', 'https://images.pexels.com/photos/221457/pexels-photo-221457.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', 'image', false, 2),
  ('12b21c3a-1234-4a85-9876-1234567890ac', 'https://images.pexels.com/photos/261332/pexels-photo-261332.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', 'image', false, 3),
  ('12b21c3a-1234-4a85-9876-1234567890ac', 'https://images.pexels.com/photos/260447/pexels-photo-260447.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', 'image', false, 4),
  
  ('13b21c3a-1234-4a85-9876-1234567890ad', 'https://images.pexels.com/photos/53464/sheraton-palace-hotel-lobby-architecture-san-francisco-53464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', 'image', true, 1),
  ('13b21c3a-1234-4a85-9876-1234567890ad', 'https://images.pexels.com/photos/261101/pexels-photo-261101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', 'image', false, 2),
  ('13b21c3a-1234-4a85-9876-1234567890ad', 'https://images.pexels.com/photos/261330/pexels-photo-261330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', 'image', false, 3),
  ('13b21c3a-1234-4a85-9876-1234567890ad', 'https://images.pexels.com/photos/221416/pexels-photo-221416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', 'image', false, 4),
  
  ('14b21c3a-1234-4a85-9876-1234567890ae', 'https://images.pexels.com/photos/261422/pexels-photo-261422.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', 'image', true, 1),
  ('14b21c3a-1234-4a85-9876-1234567890ae', 'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', 'image', false, 2),
  ('14b21c3a-1234-4a85-9876-1234567890ae', 'https://images.pexels.com/photos/261038/pexels-photo-261038.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', 'image', false, 3),
  ('14b21c3a-1234-4a85-9876-1234567890ae', 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', 'image', false, 4),
  
  ('15b21c3a-1234-4a85-9876-1234567890af', 'https://images.pexels.com/photos/261106/pexels-photo-261106.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', 'image', true, 1),
  ('15b21c3a-1234-4a85-9876-1234567890af', 'https://images.pexels.com/photos/263186/pexels-photo-263186.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', 'image', false, 2),
  ('15b21c3a-1234-4a85-9876-1234567890af', 'https://images.pexels.com/photos/221457/pexels-photo-221457.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', 'image', false, 3),
  ('15b21c3a-1234-4a85-9876-1234567890af', 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', 'image', false, 4),
  
  ('16b21c3a-1234-4a85-9876-1234567890a1', 'https://images.pexels.com/photos/261283/pexels-photo-261283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', 'image', true, 1),
  ('16b21c3a-1234-4a85-9876-1234567890a1', 'https://images.pexels.com/photos/261411/pexels-photo-261411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', 'image', false, 2),
  ('16b21c3a-1234-4a85-9876-1234567890a1', 'https://images.pexels.com/photos/261248/pexels-photo-261248.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', 'image', false, 3),
  ('16b21c3a-1234-4a85-9876-1234567890a1', 'https://images.pexels.com/photos/261155/pexels-photo-261155.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', 'image', false, 4);