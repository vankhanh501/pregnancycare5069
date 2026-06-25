javascript
export default async function handler(req, res) {
    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    
    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    try {
        const { paymentId, txid } = req.body;
        const auth = req.headers.authorization;

        // Kiểm tra dữ liệu
        if (!paymentId) {
            return res.status(400).json({ error: 'Missing paymentId' });
        }
        if (!auth) {
            return res.status(400).json({ error: 'Missing authorization' });
        }

        // Gọi Pi API complete
        const url = `https://api.minepi.com/v2/payments/${paymentId}/complete`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': auth,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        console.log('Response status:', response.status);
        console.log('Response data:', data);

        return res.status(response.status).json(data);

    } catch (error) {
        console.error('Server error:', error.message);
        return res.status(500).json({ error: error.message });
    }
}
