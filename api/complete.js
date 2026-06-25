export default async function handler(req, res) {
    // Cho phép CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    const { paymentId, txid } = req.body;
    const auth = req.headers.authorization;
    
    console.log('Completing payment:', paymentId, txid);

    try {
        const response = await fetch('https://api.minepi.com/v2/payments/' + paymentId + '/complete', {
            method: 'POST',
            headers: {
                'Authorization': auth,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log('Complete response:', data);
        res.json(data);
    } catch (error) {
        console.error('Complete error:', error);
        res.status(500).json({ error: error.message });
    }
}
