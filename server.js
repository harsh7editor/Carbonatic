const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'smart-city-traveler-frontend/build')));

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

// API Routes
app.get('/api/places', (req, res) => {
    const { query, category, city } = req.query;
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

    res.json({
        content: filteredPlaces,
        totalElements: filteredPlaces.length,
        totalPages: 1,
        size: filteredPlaces.length,
        number: 0
    });
});

app.get('/api/places/:id', (req, res) => {
    const placeId = parseInt(req.params.id);
    const place = mockPlaces.find(p => p.id === placeId);
    
    if (place) {
        res.json(place);
    } else {
        res.status(404).json({ error: 'Place not found' });
    }
});

app.get('/api/trips', (req, res) => {
    res.json(mockTrips);
});

app.post('/api/trips', (req, res) => {
    const tripData = req.body;
    const newTrip = {
        id: mockTrips.length + 1,
        ...tripData,
        createdAt: new Date().toISOString()
    };
    mockTrips.push(newTrip);
    res.status(201).json(newTrip);
});

app.get('/api/reviews/place/:id', (req, res) => {
    const placeId = parseInt(req.params.id);
    const reviews = mockReviews.filter(r => r.placeId === placeId);
    res.json(reviews);
});

app.post('/api/reviews', (req, res) => {
    const reviewData = req.body;
    const newReview = {
        id: mockReviews.length + 1,
        ...reviewData,
        username: "DemoUser",
        createdAt: new Date().toISOString()
    };
    mockReviews.push(newReview);
    res.status(201).json(newReview);
});

app.post('/api/auth/signin', (req, res) => {
    const { username, password } = req.body;
    
    if (username && password) {
        const token = 'mock-jwt-token-' + Date.now();
        res.json({
            accessToken: token,
            tokenType: 'Bearer',
            id: 1,
            username: username,
            email: username + '@example.com',
            roles: ['USER']
        });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

app.post('/api/auth/signup', (req, res) => {
    const userData = req.body;
    res.status(201).json({ message: 'User registered successfully!' });
});

// Serve React App
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'smart-city-traveler-frontend/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Smart City Traveler running on port ${PORT}`);
    console.log(`📡 API available at /api/*`);
    console.log(`🌐 Frontend available at /`);
});