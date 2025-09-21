export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method === 'POST') {
        const { username, password } = req.body;
        
        if (username && password) {
            const token = 'mock-jwt-token-' + Date.now();
            res.status(200).json({
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
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}