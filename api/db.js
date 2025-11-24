// Database connection helper for PlanetScale
import { connect } from '@planetscale/database';

// Create connection
const config = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
};

export const conn = connect(config);

// Initialize database tables
export async function initDB() {
  try {
    // Service Orders Table
    await conn.execute(`
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
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Clients Table
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS clients (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        phone VARCHAR(50),
        company VARCHAR(255),
        address TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Sales Table
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS sales (
        id VARCHAR(50) PRIMARY KEY,
        client VARCHAR(255) NOT NULL,
        items TEXT NOT NULL,
        total DECIMAL(10, 2) NOT NULL,
        payment_method VARCHAR(50),
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Invoices Table
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS invoices (
        id VARCHAR(50) PRIMARY KEY,
        client VARCHAR(255) NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        status VARCHAR(50) DEFAULT 'unpaid',
        issue_date DATE,
        due_date DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Inventory Table
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS inventory (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100),
        quantity INT DEFAULT 0,
        price DECIMAL(10, 2),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Expenses Table
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS expenses (
        id VARCHAR(50) PRIMARY KEY,
        description VARCHAR(255) NOT NULL,
        category VARCHAR(100),
        amount DECIMAL(10, 2) NOT NULL,
        date DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    return { success: true };
  } catch (error) {
    console.error('Database initialization error:', error);
    return { success: false, error: error.message };
  }
}
