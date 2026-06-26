javascript
export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');

    // Xử lý OPTIONS request (preflight)
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Chỉ cho phép POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Only POST allowed' });
    }

    try {
        // Log để debug
        console.log('Request body:', JSON.stringify(req.body));
        
        const { paymentId } = req.body;
        const auth = req.headers.authorization;

        console.log('Payment ID:', paymentId);
        console.log('Auth exists:', !!auth);

        // Kiểm tra dữ liệu
        if (!paymentId) {
            return res.status(400).json({ error: 'Missing paymentId', body: req.body });
        }
        if (!auth) {
            return res.status(400).json({ error: 'Missing Authorization header' });
        }

        // Gọi Pi API
        const response = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
            method: 'POST',
            headers: {
                'Authorization': auth,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        console.log('Pi API response:', JSON.stringify(data));

        return res.status(response.status).json(data);

    } catch (error) {
        console.error('Server error:', error.message);
        return res.status(500).json({ error: error.message, stack: error.stack });
    }
}
