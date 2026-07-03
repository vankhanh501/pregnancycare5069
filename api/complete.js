export default async function handler(req, res) {
    const r = await fetch('https://api.minepi.com/v2/payments/' + req.body.paymentId + '/complete', {
        method: 'POST',
        headers: {
            'Authorization': req.headers.authorization,
            'Content-Type': 'application/json'
        }
    });
    res.status(r.status).json(await r.json());
}
