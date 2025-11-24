// GET/POST /api/expenses - List and create expenses
import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        if (req.method === 'GET') {
            const result = await sql`
        SELECT * FROM expenses ORDER BY date DESC
      `;

            return res.status(200).json({
                success: true,
                data: result.rows
            });
        }

        if (req.method === 'POST') {
            const { id, description, category, amount, date } = req.body;

            if (!id || !description || !amount) {
                return res.status(400).json({
                    success: false,
                    error: 'Missing required fields: id, description, amount'
                });
            }

            const result = await sql`
        INSERT INTO expenses (id, description, category, amount, date)
        VALUES (${id}, ${description}, ${category || null}, ${amount}, ${date || new Date().toISOString().split('T')[0]})
        RETURNING *
      `;

            return res.status(201).json({
                success: true,
                data: result.rows[0]
            });
        }

        return res.status(405).json({
            success: false,
            error: 'Method not allowed'
        });

    } catch (error) {
        console.error('Expenses API Error:', error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}
