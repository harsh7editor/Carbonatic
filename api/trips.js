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

export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method === 'GET') {
        res.status(200).json(mockTrips);
    } else if (req.method === 'POST') {
        const tripData = req.body;
        const newTrip = {
            id: mockTrips.length + 1,
            ...tripData,
            createdAt: new Date().toISOString()
        };
        mockTrips.push(newTrip);
        res.status(201).json(newTrip);
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}