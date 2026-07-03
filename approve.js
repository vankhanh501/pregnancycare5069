javascript
const https = require('https');

module.exports = (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }
    
    const paymentId = req.body.paymentId;
    const auth = req.headers.authorization;
    
    const options = {
        hostname: 'api.minepi.com',
        path: '/v2/payments/' + paymentId + '/approve',
        method: 'POST',
        headers: {
            'Authorization': auth,
            'Content-Type': 'application/json'
        }
    };
    
    const request = https.request(options, (response) => {
        let body = '';
        response.on('data', (chunk) => { body += chunk; });
        response.on('end', () => {
            try { res.status(200).json(JSON.parse(body)); }
            catch (e) { res.status(500).json({ error: 'Parse error' }); }
        });
    });
    
    request.on('error', (error) => {
        res.status(500).json({ error: error.message });
    });
    
    request.end();
};
