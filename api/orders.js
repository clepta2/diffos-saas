// GET /api/orders - List all service orders
import { conn } from './db.js';

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
            const { status, search } = req.query;

            let query = 'SELECT * FROM service_orders';
            const conditions = [];
            const params = [];

            if (status && status !== 'all') {
                conditions.push('status = ?');
                params.push(status);
            }

            if (search) {
                conditions.push('(client LIKE ? OR id LIKE ? OR device LIKE ?)');
                const searchTerm = `%${search}%`;
                params.push(searchTerm, searchTerm, searchTerm);
            }

            if (conditions.length > 0) {
                query += ' WHERE ' + conditions.join(' AND ');
            }

            query += ' ORDER BY created_at DESC';

            const result = await conn.execute(query, params);

            return res.status(200).json({
                success: true,
                data: result.rows
            });
        }

        if (req.method === 'POST') {
            const {
                id,
                client,
                subject,
                device,
                brand,
                model,
                serial,
                imei,
                color,
                capacity,
                pattern_code,
                services,
                observations,
                chip,
                deadline,
                status = 'open'
            } = req.body;

            if (!id || !client || !subject) {
                return res.status(400).json({
                    success: false,
                    error: 'Missing required fields: id, client, subject'
                });
            }

            const result = await conn.execute(
                `INSERT INTO service_orders (
          id, client, subject, device, brand, model, serial, imei,
          color, capacity, pattern_code, services, observations,
          chip, deadline, status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    id, client, subject, device || null, brand || null,
                    model || null, serial || null, imei || null, color || null,
                    capacity || null, pattern_code || null, services || null,
                    observations || null, chip || null, deadline || null, status
                ]
            );

            // Get the inserted record
            const inserted = await conn.execute(
                'SELECT * FROM service_orders WHERE id = ?',
                [id]
            );

            return res.status(201).json({
                success: true,
                data: inserted.rows[0]
            });
        }

        return res.status(405).json({
            success: false,
            error: 'Method not allowed'
        });

    } catch (error) {
        console.error('Orders API Error:', error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}
