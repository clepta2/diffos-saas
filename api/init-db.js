// Endpoint to initialize database tables
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
            // Create tables directly using Supabase query
            const queries = [
                `CREATE TABLE IF NOT EXISTS service_orders (
          id VARCHAR(50) PRIMARY KEY,
          client VARCHAR(255) NOT NULL,
          subject VARCHAR(255) NOT NULL,
          device VARCHAR(255),
          brand VARCHAR(100),
          model VARCHAR(100),
          serial VARCHAR(100),
          imei VARCHAR(50),
          color VARCHAR(50),
          capacity VARCHAR(50),
          pattern_code VARCHAR(50),
          services TEXT,
          observations TEXT,
          chip VARCHAR(20),
          deadline VARCHAR(100),
          status VARCHAR(50) DEFAULT 'open',
          date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`,
                `CREATE TABLE IF NOT EXISTS clients (
          id VARCHAR(50) PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255),
          phone VARCHAR(50),
          company VARCHAR(255),
          address TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`,
                `CREATE TABLE IF NOT EXISTS sales (
          id VARCHAR(50) PRIMARY KEY,
          client VARCHAR(255) NOT NULL,
          items TEXT NOT NULL,
          total DECIMAL(10, 2) NOT NULL,
          payment_method VARCHAR(50),
          date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`,
                `CREATE TABLE IF NOT EXISTS invoices (
          id VARCHAR(50) PRIMARY KEY,
          client VARCHAR(255) NOT NULL,
          amount DECIMAL(10, 2) NOT NULL,
          status VARCHAR(50) DEFAULT 'unpaid',
          issue_date DATE,
          due_date DATE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`,
                `CREATE TABLE IF NOT EXISTS inventory (
          id VARCHAR(50) PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          category VARCHAR(100),
          quantity INTEGER DEFAULT 0,
          price DECIMAL(10, 2),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`,
                `CREATE TABLE IF NOT EXISTS expenses (
          id VARCHAR(50) PRIMARY KEY,
          description VARCHAR(255) NOT NULL,
          category VARCHAR(100),
          amount DECIMAL(10, 2) NOT NULL,
          date DATE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`
            ];

            // Execute each query
            for (const query of queries) {
                const { error } = await supabase.rpc('exec', { sql: query });
                if (error) {
                    console.error('Error executing query:', error);
                    // Continue even if table already exists
                }
            }

            // Enable RLS and create policies
            const rlsQueries = [
                'ALTER TABLE service_orders ENABLE ROW LEVEL SECURITY',
                'ALTER TABLE clients ENABLE ROW LEVEL SECURITY',
                'ALTER TABLE sales ENABLE ROW LEVEL SECURITY',
                'ALTER TABLE invoices ENABLE ROW LEVEL SECURITY',
                'ALTER TABLE inventory ENABLE ROW LEVEL SECURITY',
                'ALTER TABLE expenses ENABLE ROW LEVEL SECURITY',
                `CREATE POLICY IF NOT EXISTS "Allow all" ON service_orders FOR ALL USING (true)`,
                `CREATE POLICY IF NOT EXISTS "Allow all" ON clients FOR ALL USING (true)`,
                `CREATE POLICY IF NOT EXISTS "Allow all" ON sales FOR ALL USING (true)`,
                `CREATE POLICY IF NOT EXISTS "Allow all" ON invoices FOR ALL USING (true)`,
                `CREATE POLICY IF NOT EXISTS "Allow all" ON inventory FOR ALL USING (true)`,
                `CREATE POLICY IF NOT EXISTS "Allow all" ON expenses FOR ALL USING (true)`
            ];

            for (const query of rlsQueries) {
                const { error } = await supabase.rpc('exec', { sql: query });
                if (error) {
                    console.error('Error with RLS:', error);
                    // Continue
                }
            }

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
        } catch (error) {
            console.error('Init DB Error:', error);
            return res.status(500).json({
                success: false,
                error: error.message,
                note: 'You may need to create tables manually in Supabase SQL Editor'
            });
        }
    }

    return res.status(405).json({
        success: false,
        error: 'Method not allowed'
    });
}
