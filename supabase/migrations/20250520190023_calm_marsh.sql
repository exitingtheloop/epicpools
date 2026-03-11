/*
  # Add testimonials data
  
  This migration adds initial testimonial data with:
  - Customer names
  - Locations
  - Ratings
  - Testimonial text
  - Avatar URLs
  - Featured status
*/

INSERT INTO testimonials (name, location, rating, text, avatar_url, is_featured) VALUES
  (
    'Sarah & Michael Davis',
    'Beverly Hills, CA',
    5,
    'Epic Pools transformed our backyard into a paradise. Their attention to detail and craftsmanship exceeded all expectations.',
    'https://images.pexels.com/photos/5409506/pexels-photo-5409506.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    true
  ),
  (
    'James Wilson',
    'Malibu, CA',
    5,
    'The design team created the perfect infinity pool for our oceanfront property. The result is absolutely stunning.',
    'https://images.pexels.com/photos/6580541/pexels-photo-6580541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    true
  ),
  (
    'Emily & Robert Chen',
    'Laguna Beach, CA',
    5,
    'From concept to completion, working with Epic Pools was a pleasure. They brought our vision to life beautifully.',
    'https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    true
  ),
  (
    'Lisa Thompson',
    'Newport Beach, CA',
    5,
    'The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.',
    'https://images.pexels.com/photos/5834/nature-grass-leaf-green.jpg?auto=compress&cs=tinysrgb&w=1260&h=750',
    false
  ),
  (
    'David & Emma Rodriguez',
    'San Diego, CA',
    5,
    E'Outstanding support and robust features. It\'s rare to find a product that delivers on all its promises.',
    'https://images.pexels.com/photos/6186523/pexels-photo-6186523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    false
  );