export default async function handler(req, res) {
    const { paymentId } = req.body;
    const auth = req.headers.authorization;
    
    const response = await fetch('https://api.minepi.com/v2/payments/' + paymentId + '/approve', {
        method: 'POST',
        headers: {
            'Authorization': auth,
            'Content-Type': 'application/json'
        }
    });
    
    const data = await response.json();
    res.status(response.status).json(data);
}
