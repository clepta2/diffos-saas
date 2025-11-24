// GET/POST /api/clients
import { supabase } from './db.js';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        if (req.method === 'GET') {
            const { search } = req.query;
            let query = supabase.from('clients').select('*');

            if (search) {
                query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`);
            }

            query = query.order('created_at', { ascending: false });
            const { data, error } = await query;

            if (error) throw error;
            return res.status(200).json({ success: true, data: data || [] });
        }

        if (req.method === 'POST') {
            const clientData = req.body;

            if (!clientData.id || !clientData.name) {
                return res.status(400).json({ success: false, error: 'Missing required fields: id, name' });
            }

            const { data, error } = await supabase
                .from('clients')
                .insert([clientData])
                .select()
                .single();

            if (error) throw error;
            return res.status(201).json({ success: true, data });
        }

        return res.status(405).json({ success: false, error: 'Method not allowed' });
    } catch (error) {
        console.error('Clients API Error:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
}
