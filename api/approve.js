export default async function handler(req, res) {
    try {
        const { paymentId } = req.body;
        const auth = req.headers.authorization;

        console.log('✅ Approve request:', paymentId);

        const response = await fetch('https://api.minepi.com/v2/payments/' + paymentId + '/approve', {
            method: 'POST',
            headers: { 'Authorization': auth, 'Content-Type': 'application/json' }
        });

        const data = await response.json();
        console.log('✅ Approve response:', data);

        res.status(response.status).json(data);
    } catch (error) {
        console.error('❌ Approve error:', error.message);
        res.status(500).json({ error: error.message });
    }
}
