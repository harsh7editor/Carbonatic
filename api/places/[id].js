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

export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method === 'GET') {
        const { id } = req.query;
        const placeId = parseInt(id);
        const place = mockPlaces.find(p => p.id === placeId);
        
        if (place) {
            res.status(200).json(place);
        } else {
            res.status(404).json({ error: 'Place not found' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}