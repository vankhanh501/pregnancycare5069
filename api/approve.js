javascript
export default async function handler(req, res) {
    try {
        if (req.method !== 'POST') {
            return res.status(405).json({ error: 'Method not allowed' });
        }

        const { paymentId } = req.body;

        if (!paymentId) {
            return res.status(400).json({ error: 'Missing paymentId' });
        }

        const response = await fetch('https://api.minepi.com/v2/payments/' + paymentId + '/approve', {
            method: 'POST',
            headers: {
                'Authorization': req.headers.authorization,
                'Content-Type': 'application/json'
            },
            body: '{}'
        });

        const data = await response.json();
        return res.status(response.status).json(data);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
