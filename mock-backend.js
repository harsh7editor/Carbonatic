const http = require('http');
const url = require('url');

// Mock data
const mockPlaces = [
    {
        id: 1,
        name: "Central Park",
        description: "Iconic urban park in Manhattan with beautiful landscapes and recreational activities.",
        category: "ATTRACTION",
        city: "New York",
        latitude: 40.785091,
        longitude: -73.968285,
        averageRating: 4.8,
        totalReviews: 1250,
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400"
    },
    {
        id: 2,
        name: "The Plaza Hotel",
        description: "Luxurious historic hotel overlooking Central Park with world-class amenities.",
        category: "HOTEL",
        city: "New York",
        latitude: 40.7648,
        longitude: -73.9748,
        averageRating: 4.9,
        totalReviews: 890,
        imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400"
    },
    {
        id: 3,
        name: "Joe's Pizza",
        description: "Famous New York-style pizza joint serving authentic slices since 1975.",
        category: "RESTAURANT",
        city: "New York",
        latitude: 40.7505,
        longitude: -73.9934,
        averageRating: 4.6,
        totalReviews: 2100,
        imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400"
    },
    {
        id: 4,
        name: "Times Square",
        description: "The crossroads of the world with bright lights, Broadway shows, and shopping.",
        category: "ATTRACTION",
        city: "New York",
        latitude: 40.7580,
        longitude: -73.9855,
        averageRating: 4.5,
        totalReviews: 3200,
        imageUrl: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400"
    },
    {
        id: 5,
        name: "Fifth Avenue",
        description: "Famous shopping street with luxury boutiques and flagship stores.",
        category: "SHOPPING",
        city: "New York",
        latitude: 40.7505,
        longitude: -73.9934,
        averageRating: 4.7,
        totalReviews: 1800,
        imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400"
    },
    {
        id: 6,
        name: "Statue of Liberty",
        description: "Iconic symbol of freedom and democracy, accessible by ferry.",
        category: "ATTRACTION",
        city: "New York",
        latitude: 40.6892,
        longitude: -74.0445,
        averageRating: 4.8,
        totalReviews: 4500,
        imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400"
    }
];

const mockTrips = [
    {
        id: 1,
        title: "NYC Weekend Getaway",
        description: "Perfect weekend exploring the Big Apple",
        startDate: "2024-01-15",
        endDate: "2024-01-17",
        status: "PLANNING",
        places: [1, 2, 3, 4],
        createdAt: "2024-01-10T10:00:00Z"
    },
    {
        id: 2,
        title: "Food Tour of Manhattan",
        description: "Culinary adventure through NYC's best restaurants",
        startDate: "2024-02-01",
        endDate: "2024-02-03",
        status: "CONFIRMED",
        places: [3, 5],
        createdAt: "2024-01-20T14:30:00Z"
    }
];

const mockReviews = [
    {
        id: 1,
        placeId: 1,
        userId: 1,
        username: "TravelLover123",
        content: "Absolutely beautiful park! Perfect for a morning jog or afternoon picnic.",
        rating: 5,
        createdAt: "2024-01-05T09:15:00Z"
    },
    {
        id: 2,
        placeId: 3,
        userId: 2,
        username: "FoodieExplorer",
        content: "Best pizza in NYC! The classic slice is incredible. Long lines but worth the wait.",
        rating: 5,
        createdAt: "2024-01-08T18:45:00Z"
    }
];

// CORS headers
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
};

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const method = req.method;

    // Handle CORS preflight
    if (method === 'OPTIONS') {
        res.writeHead(200, corsHeaders);
        res.end();
        return;
    }

    // Set CORS headers for all responses
    Object.keys(corsHeaders).forEach(key => {
        res.setHeader(key, corsHeaders[key]);
    });

    console.log(`${method} ${path}`);

    // Routes
    if (path === '/api/places' && method === 'GET') {
        const { query, category, city } = parsedUrl.query;
        let filteredPlaces = [...mockPlaces];

        if (query) {
            filteredPlaces = filteredPlaces.filter(place =>
                place.name.toLowerCase().includes(query.toLowerCase()) ||
                place.description.toLowerCase().includes(query.toLowerCase()) ||
                place.city.toLowerCase().includes(query.toLowerCase())
            );
        }

        if (category) {
            filteredPlaces = filteredPlaces.filter(place => place.category === category);
        }

        if (city) {
            filteredPlaces = filteredPlaces.filter(place => 
                place.city.toLowerCase().includes(city.toLowerCase())
            );
        }

        res.writeHead(200);
        res.end(JSON.stringify({
            content: filteredPlaces,
            totalElements: filteredPlaces.length,
            totalPages: 1,
            size: filteredPlaces.length,
            number: 0
        }));
    }
    else if (path.startsWith('/api/places/') && method === 'GET') {
        const placeId = parseInt(path.split('/')[3]);
        const place = mockPlaces.find(p => p.id === placeId);
        
        if (place) {
            res.writeHead(200);
            res.end(JSON.stringify(place));
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ error: 'Place not found' }));
        }
    }
    else if (path === '/api/trips' && method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify(mockTrips));
    }
    else if (path === '/api/trips' && method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const tripData = JSON.parse(body);
                const newTrip = {
                    id: mockTrips.length + 1,
                    ...tripData,
                    createdAt: new Date().toISOString()
                };
                mockTrips.push(newTrip);
                res.writeHead(201);
                res.end(JSON.stringify(newTrip));
            } catch (error) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
        });
    }
    else if (path.startsWith('/api/reviews/place/') && method === 'GET') {
        const placeId = parseInt(path.split('/')[4]);
        const reviews = mockReviews.filter(r => r.placeId === placeId);
        res.writeHead(200);
        res.end(JSON.stringify(reviews));
    }
    else if (path === '/api/reviews' && method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const reviewData = JSON.parse(body);
                const newReview = {
                    id: mockReviews.length + 1,
                    ...reviewData,
                    username: "DemoUser",
                    createdAt: new Date().toISOString()
                };
                mockReviews.push(newReview);
                res.writeHead(201);
                res.end(JSON.stringify(newReview));
            } catch (error) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
        });
    }
    else if (path === '/api/auth/signin' && method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const { username, password } = JSON.parse(body);
                if (username && password) {
                    const token = 'mock-jwt-token-' + Date.now();
                    res.writeHead(200);
                    res.end(JSON.stringify({
                        accessToken: token,
                        tokenType: 'Bearer',
                        id: 1,
                        username: username,
                        email: username + '@example.com',
                        roles: ['USER']
                    }));
                } else {
                    res.writeHead(401);
                    res.end(JSON.stringify({ error: 'Invalid credentials' }));
                }
            } catch (error) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
        });
    }
    else if (path === '/api/auth/signup' && method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const userData = JSON.parse(body);
                res.writeHead(201);
                res.end(JSON.stringify({ message: 'User registered successfully!' }));
            } catch (error) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
        });
    }
    else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Not found' }));
    }
});

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
server.listen(PORT, () => {
    console.log(`🚀 Smart City Traveler Mock Backend running on http://localhost:${PORT}`);
    console.log(`📡 API Endpoints:`);
    console.log(`   GET  /api/places - Get all places`);
    console.log(`   GET  /api/places/{id} - Get place by ID`);
    console.log(`   GET  /api/trips - Get user trips`);
    console.log(`   POST /api/trips - Create new trip`);
    console.log(`   GET  /api/reviews/place/{id} - Get reviews for place`);
    console.log(`   POST /api/reviews - Create review`);
    console.log(`   POST /api/auth/signin - User login`);
    console.log(`   POST /api/auth/signup - User registration`);
    console.log(`\n🌐 Frontend: http://localhost:3000`);
    console.log(`🔧 Backend API: http://localhost:${PORT}/api`);
});
