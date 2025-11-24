// GET /api/init-db - Initialize database tables (run once)
import { initDB } from './db.js';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({
            success: false,
            error: 'Method not allowed'
        });
    }

    try {
        const result = await initDB();

        if (result.success) {
            return res.status(200).json({
                success: true,
                message: 'Database initialized successfully',
                tables: [
                    'service_orders',
                    'clients',
                    'sales',
                    'invoices',
                    'inventory',
                    'expenses'
                ]
            });
        } else {
            return res.status(500).json({
                success: false,
                error: result.error
            });
        }
    } catch (error) {
        console.error('Init DB Error:', error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}
