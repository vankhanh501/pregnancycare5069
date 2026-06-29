export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    const { paymentId, txid } = req.body;
    const auth = req.headers.authorization;
    
    const r = await fetch('https://api.minepi.com/v2/payments/' + paymentId + '/complete', {
        method: 'POST',
        headers: {
            'Authorization': auth,
            'Content-Type': 'application/json'
        }
    });
    
    const d = await r.json();
    res.status(r.status).json(d);
}
