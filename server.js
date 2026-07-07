const express = require('express');
const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') return res.status(200).end();
    next();
});

app.post('/api/approve', async (req, res) => {
    try {
        const { paymentId } = req.body;
        const auth = req.headers.authorization;
        const response = await fetch('https://api.minepi.com/v2/payments/' + paymentId + '/approve', {
            method: 'POST',
            headers: { 'Authorization': auth, 'Content-Type': 'application/json' },
            body: '{}'
        });
        const data = await response.json();
        res.status(response.status).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/complete', async (req, res) => {
    try {
        const { paymentId, txid } = req.body;
        const auth = req.headers.authorization;
        const response = await fetch('https://api.minepi.com/v2/payments/' + paymentId + '/complete', {
            method: 'POST',
            headers: { 'Authorization': auth, 'Content-Type': 'application/json' },
            body: '{}'
        });
        const data = await response.json();
        res.status(response.status).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on port ' + PORT));
