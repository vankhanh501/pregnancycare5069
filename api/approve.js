javascript
export default async function handler(req, res) {
    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    
    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    try {
        const { paymentId } = req.body;
        const auth = req.headers.authorization;

        console.log('✅ Approve payment:', paymentId);

        const response = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
            method: 'POST',
            headers: {
                'Authorization': auth,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        console.log('✅ Approve response:', data);
        res.status(response.status).json(data);

    } catch (error) {
        console.error('❌ Approve error:', error.message);
        res.status(500).json({ error: error.message });
    }
}
