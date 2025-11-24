// Database connection helper for Supabase
import { createClient } from '@supabase/supabase-js';

// Create Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize database tables
export async function initDB() {
  try {
    // Note: With Supabase, we'll create tables via SQL Editor in the dashboard
    // This function will verify tables exist

    const tables = [
      'service_orders',
      'clients',
      'sales',
      'invoices',
      'inventory',
      'expenses'
    ];

    const results = [];

    for (const table of tables) {
      const { data, error } = await supabase
        .from(table)
        .select('count')
        .limit(1);

      if (error && error.code === '42P01') {
        results.push({ table, exists: false, error: 'Table does not exist' });
      } else {
        results.push({ table, exists: true });
      }
    }

    const allExist = results.every(r => r.exists);

    return {
      success: allExist,
      message: allExist ? 'All tables exist' : 'Some tables missing - create them in Supabase SQL Editor',
      tables: results
    };
  } catch (error) {
    console.error('Database check error:', error);
    return { success: false, error: error.message };
  }
}

// SQL Schema for Supabase (to be run in SQL Editor)
export const SCHEMA_SQL = `
-- Service Orders Table
CREATE TABLE IF NOT EXISTS service_orders (
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
);

-- Clients Table
CREATE TABLE IF NOT EXISTS clients (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(50),
  company VARCHAR(255),
  address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sales Table
CREATE TABLE IF NOT EXISTS sales (
  id VARCHAR(50) PRIMARY KEY,
  client VARCHAR(255) NOT NULL,
  items TEXT NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  payment_method VARCHAR(50),
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Invoices Table
CREATE TABLE IF NOT EXISTS invoices (
  id VARCHAR(50) PRIMARY KEY,
  client VARCHAR(255) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'unpaid',
  issue_date DATE,
  due_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inventory Table
CREATE TABLE IF NOT EXISTS inventory (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  quantity INTEGER DEFAULT 0,
  price DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Expenses Table
CREATE TABLE IF NOT EXISTS expenses (
  id VARCHAR(50) PRIMARY KEY,
  description VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  amount DECIMAL(10, 2) NOT NULL,
  date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security (RLS)
ALTER TABLE service_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

-- Create policies (allow all for now - add auth later)
CREATE POLICY "Allow all operations" ON service_orders FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON clients FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON sales FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON invoices FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON inventory FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON expenses FOR ALL USING (true);
`;
