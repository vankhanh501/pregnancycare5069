export default async function handler(req, res) {
    console.log('🔵 Approve called');
    console.log('Body:', JSON.stringify(req.body));
    console.log('Auth:', req.headers.authorization ? 'Yes' : 'No');
    
    const { paymentId } = req.body;
    const auth = req.headers.authorization;
    
    try {
        const r = await fetch('https://api.minepi.com/v2/payments/' + paymentId + '/approve', {
            method: 'POST',
            headers: {
                'Authorization': auth,
                'Content-Type': 'application/json'
            }
        });
        
        const d = await r.json();
        console.log('🟢 Approve response:', JSON.stringify(d));
        res.status(r.status).json(d);
    } catch (error) {
        console.log('🔴 Approve error:', error.message);
        res.status(500).json({ error: error.message });
    }
}
