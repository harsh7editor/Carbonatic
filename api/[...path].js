export default async function handler(req, res) {
  const { method } = req;
  const path = '/' + (req.query.path ? req.query.path.join('/') : '');

  // Simple in-memory data (mock)
  // Note: This resets on every cold start; fine for demo purposes
  const globalAny = global;
  if (!globalAny.__mockData) {
    globalAny.__mockData = {
      places: [
        {
          id: 1,
          name: 'Central Park',
          description: 'Iconic urban park in Manhattan with beautiful landscapes and recreational activities.',
          category: 'ATTRACTION',
          city: 'New York',
          latitude: 40.785091,
          longitude: -73.968285,
          averageRating: 4.8,
          totalReviews: 1250,
          imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'
        },
        {
          id: 2,
          name: 'The Plaza Hotel',
          description: 'Luxurious historic hotel overlooking Central Park with world-class amenities.',
          category: 'HOTEL',
          city: 'New York',
          latitude: 40.7648,
          longitude: -73.9748,
          averageRating: 4.9,
          totalReviews: 890,
          imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400'
        },
        {
          id: 3,
          name: "Joe's Pizza",
          description: 'Famous New York-style pizza joint serving authentic slices since 1975.',
          category: 'RESTAURANT',
          city: 'New York',
          latitude: 40.7505,
          longitude: -73.9934,
          averageRating: 4.6,
          totalReviews: 2100,
          imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400'
        }
      ],
      trips: [
        {
          id: 1,
          title: 'NYC Weekend Getaway',
          description: 'Perfect weekend exploring the Big Apple',
          startDate: '2024-01-15',
          endDate: '2024-01-17',
          status: 'PLANNING',
          places: [1, 2, 3, 4],
          createdAt: '2024-01-10T10:00:00Z'
        }
      ],
      reviews: [
        {
          id: 1,
          placeId: 1,
          userId: 1,
          username: 'TravelLover123',
          content: 'Absolutely beautiful park! Perfect for a morning jog or afternoon picnic.',
          rating: 5,
          createdAt: '2024-01-05T09:15:00Z'
        }
      ]
    };
  }
  const { places, trips, reviews } = globalAny.__mockData;

  // Helpers
  const send = (status, data) => res.status(status).json(data);

  // Routes
  try {
    // Places
    if (path === '/api/places' && method === 'GET') {
      const { query, category, city } = req.query;
      let filtered = [...places];
      if (query) {
        const q = String(query).toLowerCase();
        filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || (p.city || '').toLowerCase().includes(q));
      }
      if (category) {
        filtered = filtered.filter(p => p.category === category);
      }
      if (city) {
        const c = String(city).toLowerCase();
        filtered = filtered.filter(p => (p.city || '').toLowerCase().includes(c));
      }
      return send(200, { content: filtered, totalElements: filtered.length, totalPages: 1, size: filtered.length, number: 0 });
    }

    if (path.startsWith('/api/places/') && method === 'GET') {
      const id = parseInt(path.split('/')[3]);
      const place = places.find(p => p.id === id);
      return place ? send(200, place) : send(404, { error: 'Place not found' });
    }

    // Trips
    if (path === '/api/trips' && method === 'GET') {
      return send(200, trips);
    }
    if (path === '/api/trips' && method === 'POST') {
      const data = req.body || {};
      const newTrip = { id: trips.length + 1, ...data, createdAt: new Date().toISOString() };
      trips.push(newTrip);
      return send(201, newTrip);
    }

    // Reviews
    if (path.startsWith('/api/reviews/place/') && method === 'GET') {
      const id = parseInt(path.split('/')[4]);
      const list = reviews.filter(r => r.placeId === id);
      return send(200, list);
    }
    if (path === '/api/reviews' && method === 'POST') {
      const data = req.body || {};
      const newReview = { id: reviews.length + 1, ...data, username: 'DemoUser', createdAt: new Date().toISOString() };
      reviews.push(newReview);
      return send(201, newReview);
    }

    // Auth
    if (path === '/api/auth/signin' && method === 'POST') {
      const { username, password } = req.body || {};
      if (username && password) {
        return send(200, {
          accessToken: 'mock-jwt-token-' + Date.now(),
          tokenType: 'Bearer',
          id: 1,
          username,
          email: `${username}@example.com`,
          roles: ['USER']
        });
      }
      return send(401, { error: 'Invalid credentials' });
    }
    if (path === '/api/auth/signup' && method === 'POST') {
      return send(201, { message: 'User registered successfully!' });
    }

    return send(404, { error: 'Not found' });
  } catch (e) {
    return send(500, { error: 'Server error', details: e?.message || String(e) });
  }
}

export const config = {
  api: {
    bodyParser: true
  }
};


