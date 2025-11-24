// PUT/DELETE /api/orders/[id]
import { supabase } from '../db.js';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ success: false, error: 'Order ID is required' });
    }

    try {
        if (req.method === 'GET') {
            const { data, error } = await supabase
                .from('service_orders')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            if (!data) return res.status(404).json({ success: false, error: 'Order not found' });

            return res.status(200).json({ success: true, data });
        }

        if (req.method === 'PUT') {
            const updates = req.body;

            const { data, error } = await supabase
                .from('service_orders')
                .update(updates)
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;
            if (!data) return res.status(404).json({ success: false, error: 'Order not found' });

            return res.status(200).json({ success: true, data });
        }

        if (req.method === 'DELETE') {
            const { data, error } = await supabase
                .from('service_orders')
                .delete()
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;
            if (!data) return res.status(404).json({ success: false, error: 'Order not found' });

            return res.status(200).json({ success: true, message: 'Order deleted successfully', data });
        }

        return res.status(405).json({ success: false, error: 'Method not allowed' });
    } catch (error) {
        console.error('Order [id] API Error:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
}
