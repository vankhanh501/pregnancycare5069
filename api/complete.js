javascript
const https = require('https');

module.exports = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const paymentId = req.body.paymentId;
    const txid = req.body.txid;
    const auth = req.headers.authorization;

    const postData = JSON.stringify({});

    const options = {
        hostname: 'api.minepi.com',
        path: '/v2/payments/' + paymentId + '/complete',
        method: 'POST',
        headers: {
            'Authorization': auth,
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    const request = https.request(options, (response) => {
        let data = '';
        response.on('data', (chunk) => { data += chunk; });
        response.on('end', () => {
            try {
                const json = JSON.parse(data);
                return res.status(response.statusCode).json(json);
            } catch (e) {
                return res.status(500).json({ error: 'Parse error' });
            }
        });
    });

    request.on('error', (error) => {
        return res.status(500).json({ error: error.message });
    });

    request.write(postData);
    request.end();
};
