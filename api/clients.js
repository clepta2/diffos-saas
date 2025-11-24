// GET/POST /api/clients - List and create clients
import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        if (req.method === 'GET') {
            const { search } = req.query;

            let query = 'SELECT * FROM clients';
            const values = [];

            if (search) {
                query += ' WHERE name ILIKE $1 OR email ILIKE $1 OR phone ILIKE $1';
                values.push(`%${search}%`);
            }

            query += ' ORDER BY created_at DESC';

            const result = await sql.query(query, values);

            return res.status(200).json({
                success: true,
                data: result.rows
            });
        }

        if (req.method === 'POST') {
            const { id, name, email, phone, company, address } = req.body;

            // Validate required fields
            if (!id || !name) {
                return res.status(400).json({
                    success: false,
                    error: 'Missing required fields: id, name'
                });
            }

            const result = await sql`
        INSERT INTO clients (id, name, email, phone, company, address)
        VALUES (${id}, ${name}, ${email || null}, ${phone || null}, ${company || null}, ${address || null})
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
        console.error('Clients API Error:', error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}
