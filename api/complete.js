javascript
export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Only POST allowed' });
    }
    
    const { paymentId, txid } = req.body;
    const auth = req.headers.authorization;
    
    fetch('https://api.minepi.com/v2/payments/' + paymentId + '/complete', {
        method: 'POST',
        headers: {
            'Authorization': auth,
            'Content-Type': 'application/json'
        }
    })
    .then(r => r.json())
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.status(500).json({ error: err.message });
    });
}
