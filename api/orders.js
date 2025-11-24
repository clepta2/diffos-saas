// GET /api/orders - List all service orders
import { supabase } from './db.js';

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

            let query = supabase
                .from('service_orders')
                .select('*');

            // Filter by status
            if (status && status !== 'all') {
                query = query.eq('status', status);
            }

            // Search filter
            if (search) {
                query = query.or(`client.ilike.%${search}%,id.ilike.%${search}%,device.ilike.%${search}%`);
            }

            // Order by date
            query = query.order('created_at', { ascending: false });

            const { data, error } = await query;

            if (error) throw error;

            return res.status(200).json({
                success: true,
                data: data || []
            });
        }

        if (req.method === 'POST') {
            const orderData = req.body;

            // Validate required fields
            if (!orderData.id || !orderData.client || !orderData.subject) {
                return res.status(400).json({
                    success: false,
                    error: 'Missing required fields: id, client, subject'
                });
            }

            const { data, error } = await supabase
                .from('service_orders')
                .insert([orderData])
                .select()
                .single();

            if (error) throw error;

            return res.status(201).json({
                success: true,
                data
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
