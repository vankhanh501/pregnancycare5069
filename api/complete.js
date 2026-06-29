export default async function handler(req, res) {
    try {
        const { paymentId, txid } = req.body;
        const auth = req.headers.authorization;

        console.log('✅ Complete request:', paymentId, txid);

        const response = await fetch('https://api.minepi.com/v2/payments/' + paymentId + '/complete', {
            method: 'POST',
            headers: { 'Authorization': auth, 'Content-Type': 'application/json' }
        });

        const data = await response.json();
        console.log('✅ Complete response:', data);

        res.status(response.status).json(data);
    } catch (error) {
        console.error('❌ Complete error:', error.message);
        res.status(500).json({ error: error.message });
    }
}
