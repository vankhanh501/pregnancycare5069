export default async function handler(req, res) {
    console.log('🔵 Complete called');
    console.log('Body:', JSON.stringify(req.body));
    
    const { paymentId, txid } = req.body;
    const auth = req.headers.authorization;
    
    try {
        const r = await fetch('https://api.minepi.com/v2/payments/' + paymentId + '/complete', {
            method: 'POST',
            headers: {
                'Authorization': auth,
                'Content-Type': 'application/json'
            }
        });
        
        const d = await r.json();
        console.log('🟢 Complete response:', JSON.stringify(d));
        res.status(r.status).json(d);
    } catch (error) {
        console.log('🔴 Complete error:', error.message);
        res.status(500).json({ error: error.message });
    }
}
