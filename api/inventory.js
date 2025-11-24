// GET/POST /api/inventory
import { conn } from './db.js';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        if (req.method === 'GET') {
            const result = await conn.execute('SELECT * FROM inventory ORDER BY name ASC');
            return res.status(200).json({ success: true, data: result.rows });
        }

        if (req.method === 'POST') {
            const { id, name, category, quantity, price } = req.body;

            if (!id || !name) {
                return res.status(400).json({ success: false, error: 'Missing required fields: id, name' });
            }

            await conn.execute(
                'INSERT INTO inventory (id, name, category, quantity, price) VALUES (?, ?, ?, ?, ?)',
                [id, name, category || null, quantity || 0, price || 0]
            );

            const result = await conn.execute('SELECT * FROM inventory WHERE id = ?', [id]);
            return res.status(201).json({ success: true, data: result.rows[0] });
        }

        return res.status(405).json({ success: false, error: 'Method not allowed' });
    } catch (error) {
        console.error('Inventory API Error:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
}
