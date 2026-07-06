javascript
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    const { paymentId } = req.body;
    const auth = req.headers.authorization;
    const response = await fetch('https://api.minepi.com/v2/payments/' + paymentId + '/approve', {
        method: 'POST',
        headers: { 'Authorization': auth, 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    return res.status(response.status).json(data);
}
```
4. **Commit new file** ✅

**Tạo file api/complete.js:**
1. **Add file** → **Create new file**
2. **File name:** `api/complete.js`
3. **Nội dung:**
```javascript
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    const { paymentId, txid } = req.body;
    const auth = req.headers.authorization;
    const response = await fetch('https://api.minepi.com/v2/payments/' + paymentId + '/complete', {
        method: 'POST',
        headers: { 'Authorization': auth, 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    return res.status(response.status).json(data);
}
