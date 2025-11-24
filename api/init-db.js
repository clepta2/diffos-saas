// Endpoint to verify database tables (tables should be created via Supabase SQL Editor)
import { supabase } from './db.js';

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'GET') {
        try {
            const tables = [
                'service_orders',
                'clients',
                'sales',
                'invoices',
                'inventory',
                'expenses'
            ];

            const results = [];

            // Check each table by trying to read from it
            for (const table of tables) {
                const { data, error } = await supabase
                    .from(table)
                    .select('count')
                    .limit(1);

                if (error) {
                    results.push({
                        table,
                        exists: false,
                        error: error.message
                    });
                } else {
                    results.push({
                        table,
                        exists: true
                    });
                }
            }

            const allExist = results.every(r => r.exists);

            return res.status(200).json({
                success: allExist,
                message: allExist ? 'All tables exist and are accessible' : 'Some tables are missing or inaccessible',
                tables: results
            });
        } catch (error) {
            console.error('Init DB Error:', error);
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }

    return res.status(405).json({
        success: false,
        error: 'Method not allowed'
    });
}
