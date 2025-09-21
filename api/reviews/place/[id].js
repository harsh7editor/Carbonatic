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
        const reviews = mockReviews.filter(r => r.placeId === placeId);
        res.status(200).json(reviews);
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}