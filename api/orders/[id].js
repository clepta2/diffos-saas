// PUT/DELETE /api/orders/[id] - Update or delete a specific order
import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { id } = req.query;

    if (!id) {
        return res.status(400).json({
            success: false,
            error: 'Order ID is required'
        });
    }

    try {
        if (req.method === 'GET') {
            const result = await sql`
        SELECT * FROM service_orders WHERE id = ${id}
      `;

            if (result.rows.length === 0) {
                return res.status(404).json({
                    success: false,
                    error: 'Order not found'
                });
            }

            return res.status(200).json({
                success: true,
                data: result.rows[0]
            });
        }

        if (req.method === 'PUT') {
            const updates = req.body;

            // Build dynamic update query
            const allowedFields = [
                'client', 'subject', 'device', 'brand', 'model', 'serial',
                'imei', 'color', 'capacity', 'pattern_code', 'services',
                'observations', 'chip', 'deadline', 'status'
            ];

            const setClause = [];
            const values = [];
            let paramIndex = 1;

            for (const [key, value] of Object.entries(updates)) {
                if (allowedFields.includes(key)) {
                    setClause.push(`${key} = $${paramIndex}`);
                    values.push(value);
                    paramIndex++;
                }
            }

            if (setClause.length === 0) {
                return res.status(400).json({
                    success: false,
                    error: 'No valid fields to update'
                });
            }

            // Add updated_at
            setClause.push(`updated_at = CURRENT_TIMESTAMP`);
            values.push(id);

            const query = `
        UPDATE service_orders
        SET ${setClause.join(', ')}
        WHERE id = $${paramIndex}
        RETURNING *
      `;

            const result = await sql.query(query, values);

            if (result.rows.length === 0) {
                return res.status(404).json({
                    success: false,
                    error: 'Order not found'
                });
            }

            return res.status(200).json({
                success: true,
                data: result.rows[0]
            });
        }

        if (req.method === 'DELETE') {
            const result = await sql`
        DELETE FROM service_orders WHERE id = ${id}
        RETURNING *
      `;

            if (result.rows.length === 0) {
                return res.status(404).json({
                    success: false,
                    error: 'Order not found'
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Order deleted successfully',
                data: result.rows[0]
            });
        }

        return res.status(405).json({
            success: false,
            error: 'Method not allowed'
        });

    } catch (error) {
        console.error('Order [id] API Error:', error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}
