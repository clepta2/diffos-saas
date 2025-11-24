// GET/POST /api/inventory
import { supabase } from './db.js';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        if (req.method === 'GET') {
            const { data, error } = await supabase
                .from('inventory')
                .select('*')
                .order('name', { ascending: true });

            if (error) throw error;
            return res.status(200).json({ success: true, data: data || [] });
        }

        if (req.method === 'POST') {
            const itemData = req.body;

            if (!itemData.id || !itemData.name) {
                return res.status(400).json({ success: false, error: 'Missing required fields: id, name' });
            }

            const { data, error } = await supabase
                .from('inventory')
                .insert([itemData])
                .select()
                .single();

            if (error) throw error;
            return res.status(201).json({ success: true, data });
        }

        return res.status(405).json({ success: false, error: 'Method not allowed' });
    } catch (error) {
        console.error('Inventory API Error:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
}
