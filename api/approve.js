javascript
const https = require('https');

module.exports = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }
    
    const paymentId = req.body.paymentId;
    const auth = req.headers.authorization;
    
    const data = JSON.stringify({});
    
    const options = {
        hostname: 'api.minepi.com',
        path: '/v2/payments/' + paymentId + '/approve',
        method: 'POST',
        headers: {
            'Authorization': auth,
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };
    
    const request = https.request(options, (response) => {
        let body = '';
        response.on('data', (chunk) => { body += chunk; });
        response.on('end', () => {
            try {
                const json = JSON.parse(body);
                res.status(200).json(json);
            } catch (e) {
                res.status(500).json({ error: 'Parse error' });
            }
        });
    });
    
    request.on('error', (error) => {
        res.status(500).json({ error: error.message });
    });
    
    request.write(data);
    request.end();
};
