// GET/POST /api/expenses
import { supabase } from './db.js';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        if (req.method === 'GET') {
            const { data, error } = await supabase
                .from('expenses')
                .select('*')
                .order('date', { ascending: false });

            if (error) throw error;
            return res.status(200).json({ success: true, data: data || [] });
        }

        if (req.method === 'POST') {
            const expenseData = req.body;

            if (!expenseData.id || !expenseData.description || !expenseData.amount) {
                return res.status(400).json({ success: false, error: 'Missing required fields: id, description, amount' });
            }

            const { data, error } = await supabase
                .from('expenses')
                .insert([expenseData])
                .select()
                .single();

            if (error) throw error;
            return res.status(201).json({ success: true, data });
        }

        return res.status(405).json({ success: false, error: 'Method not allowed' });
    } catch (error) {
        console.error('Expenses API Error:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
}
