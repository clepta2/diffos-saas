// GET/POST /api/sales
import { conn } from './db.js';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        if (req.method === 'GET') {
            const result = await conn.execute('SELECT * FROM sales ORDER BY date DESC');
            return res.status(200).json({ success: true, data: result.rows });
        }

        if (req.method === 'POST') {
            const { id, client, items, total, payment_method } = req.body;

            if (!id || !client || !items || !total) {
                return res.status(400).json({ success: false, error: 'Missing required fields' });
            }

            await conn.execute(
                'INSERT INTO sales (id, client, items, total, payment_method) VALUES (?, ?, ?, ?, ?)',
                [id, client, items, total, payment_method || null]
            );

            const result = await conn.execute('SELECT * FROM sales WHERE id = ?', [id]);
            return res.status(201).json({ success: true, data: result.rows[0] });
        }

        return res.status(405).json({ success: false, error: 'Method not allowed' });
    } catch (error) {
        console.error('Sales API Error:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
}
