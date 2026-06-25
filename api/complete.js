export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    
    const { paymentId, txid } = req.body;
    const auth = req.headers.authorization;

    try {
        const r = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/complete`, {
            method: 'POST',
            headers: { 'Authorization': auth, 'Content-Type': 'application/json' }
        });
        res.json(await r.json());
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}
