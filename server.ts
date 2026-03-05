import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";

const db = new Database("gigantao.db");

// Initialize Database Schema
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price REAL NOT NULL,
    image TEXT NOT NULL,
    weight TEXT,
    description TEXT
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    zip_code TEXT NOT NULL,
    items TEXT NOT NULL,
    total REAL NOT NULL,
    status TEXT DEFAULT 'Pendente',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Migration: Ensure weight column exists if table was created earlier
try {
  db.prepare("SELECT weight FROM products LIMIT 1").get();
} catch (e) {
  console.log("Adding weight column to products table...");
  try {
    db.exec("ALTER TABLE products ADD COLUMN weight TEXT");
  } catch (err) {
    console.log("Weight column already exists or error adding it.");
  }
}

// Seed data if empty
const count = db.prepare("SELECT COUNT(*) as count FROM products").get() as { count: number };
if (count.count === 0) {
  console.log("Seeding database...");
  const seedProducts = [
    // Cordões
    { name: 'Cordão Grumet Ouro 18k', category: 'Cordões', price: 4500, weight: '10g', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop', description: 'Cordão Grumet clássico em Ouro 18k maciço.' },
    { name: 'Cordão Veneziana Ouro 18k', category: 'Cordões', price: 2250, weight: '5g', image: 'https://images.unsplash.com/photo-1611085583191-a3b130944ac5?q=80&w=800&auto=format&fit=crop', description: 'Elo veneziana delicado e resistente.' },
    { name: 'Cordão Piastrine Ouro 18k', category: 'Cordões', price: 6750, weight: '15g', image: 'https://images.unsplash.com/photo-1626497748470-283181941bce?q=80&w=800&auto=format&fit=crop', description: 'Design piastrine moderno e sofisticado.' },
    { name: 'Cordão de Prata 925 Italiana', category: 'Cordões', price: 450, weight: '20g', image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=800&auto=format&fit=crop', description: 'Prata 925 legítima com acabamento italiano.' },
    { name: 'Cordão Cartier Ouro 18k', category: 'Cordões', price: 5400, weight: '12g', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop', description: 'Elo Cartier icônico para todas as ocasiões.' },
    { name: 'Cordão Corda Ouro 18k', category: 'Cordões', price: 3600, weight: '8g', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop', description: 'Textura de corda trançada em ouro 18k.' },
    { name: 'Cordão Singapura Ouro 18k', category: 'Cordões', price: 1350, weight: '3g', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop', description: 'Torcido singapura com brilho intenso.' },
    { name: 'Cordão Baiano Ouro 18k', category: 'Cordões', price: 11250, weight: '25g', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop', description: 'Cordão baiano robusto e luxuoso.' },
    { name: 'Cordão Rabo de Rato Prata 925', category: 'Cordões', price: 250, weight: '10g', image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=800&auto=format&fit=crop', description: 'Acabamento liso e flexível em prata.' },
    { name: 'Cordão Cadeado Ouro 18k', category: 'Cordões', price: 8100, weight: '18g', image: 'https://images.unsplash.com/photo-1611085583191-a3b130944ac5?q=80&w=800&auto=format&fit=crop', description: 'Elo cadeado clássico de alta durabilidade.' },

    // Pulseiras
    { name: 'Pulseira Riviera Diamantes', category: 'Pulseiras', price: 8500, weight: '12g', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop', description: 'Pulseira riviera cravejada com zircônias premium.' },
    { name: 'Pulseira Grumet Ouro 18k', category: 'Pulseiras', price: 6750, weight: '15g', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop', description: 'Grumet masculina robusta em ouro 18k.' },
    { name: 'Pulseira de Prata 925 Masculina', category: 'Pulseiras', price: 550, weight: '25g', image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=800&auto=format&fit=crop', description: 'Prata 925 maciça com fecho gaveta.' },
    { name: 'Pulseira Veneziana Ouro 18k', category: 'Pulseiras', price: 1800, weight: '4g', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop', description: 'Veneziana feminina delicada.' },
    { name: 'Pulseira Cartier Ouro 18k', category: 'Pulseiras', price: 4500, weight: '10g', image: 'https://images.unsplash.com/photo-1611085583191-a3b130944ac5?q=80&w=800&auto=format&fit=crop', description: 'Elo Cartier clássico unissex.' },
    { name: 'Pulseira de Pérolas Naturais', category: 'Pulseiras', price: 1200, weight: '8g', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop', description: 'Pérolas cultivadas com fecho em ouro.' },
    { name: 'Pulseira Bracelete Ouro 18k', category: 'Pulseiras', price: 9000, weight: '20g', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop', description: 'Bracelete rígido com design minimalista.' },
    { name: 'Pulseira Elo Português Ouro 18k', category: 'Pulseiras', price: 3150, weight: '7g', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop', description: 'Elo português charmoso e atemporal.' },
    { name: 'Pulseira de Prata 925 Feminina', category: 'Pulseiras', price: 150, weight: '5g', image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=800&auto=format&fit=crop', description: 'Prata 925 leve para o dia a dia.' },
    { name: 'Pulseira Grumet Prata 925', category: 'Pulseiras', price: 650, weight: '30g', image: 'https://images.unsplash.com/photo-1611085583191-a3b130944ac5?q=80&w=800&auto=format&fit=crop', description: 'Grumet larga em prata 925.' },

    // Brincos
    { name: 'Brinco Argola Ouro 18k', category: 'Brincos', price: 1800, weight: '4g', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop', description: 'Argola média clássica em ouro 18k.' },
    { name: 'Brinco Ponto de Luz Diamante', category: 'Brincos', price: 2500, weight: '2g', image: 'https://images.unsplash.com/photo-1635767791024-3d5705ee45d7?q=80&w=800&auto=format&fit=crop', description: 'Zircônia premium com brilho de diamante.' },
    { name: 'Brinco de Prata 925 Zircônia', category: 'Brincos', price: 120, weight: '3g', image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=800&auto=format&fit=crop', description: 'Prata 925 com pedra de zircônia.' },
    { name: 'Brinco de Pérola Ouro 18k', category: 'Brincos', price: 2250, weight: '5g', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop', description: 'Pérola natural com base em ouro.' },
    { name: 'Brinco Ear Cuff Ouro 18k', category: 'Brincos', price: 2700, weight: '6g', image: 'https://images.unsplash.com/photo-1635767791024-3d5705ee45d7?q=80&w=800&auto=format&fit=crop', description: 'Design ear cuff moderno e elegante.' },
    { name: 'Brinco Pendente Ouro 18k', category: 'Brincos', price: 3600, weight: '8g', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop', description: 'Brinco longo pendente para festas.' },
    { name: 'Brinco Argola Prata 925', category: 'Brincos', price: 180, weight: '5g', image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=800&auto=format&fit=crop', description: 'Argola trabalhada em prata 925.' },
    { name: 'Brinco de Ouro 18k Infantil', category: 'Brincos', price: 450, weight: '1g', image: 'https://images.unsplash.com/photo-1635767791024-3d5705ee45d7?q=80&w=800&auto=format&fit=crop', description: 'Brinco pequeno e seguro para crianças.' },
    { name: 'Brinco Trio de Zircônias Prata', category: 'Brincos', price: 150, weight: '4g', image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=800&auto=format&fit=crop', description: 'Kit com três tamanhos de brincos.' },
    { name: 'Brinco Chuveiro Ouro 18k', category: 'Brincos', price: 3150, weight: '7g', image: 'https://images.unsplash.com/photo-1635767791024-3d5705ee45d7?q=80&w=800&auto=format&fit=crop', description: 'Modelo chuveiro cravejado clássico.' },

    // Alianças
    { name: 'Aliança Casamento Ouro 18k 6mm', category: 'Alianças', price: 5400, weight: '12g (par)', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop', description: 'Aliança tradicional de 6mm.' },
    { name: 'Aliança Noivado Ouro 18k 4mm', category: 'Alianças', price: 3600, weight: '8g (par)', image: 'https://images.unsplash.com/photo-1589128777073-263566ae5e4d?q=80&w=800&auto=format&fit=crop', description: 'Aliança delicada para noivado.' },
    { name: 'Aliança Prata 925 Compromisso', category: 'Alianças', price: 350, weight: '10g (par)', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop', description: 'Aliança de compromisso em prata.' },
    { name: 'Aliança Ouro 18k Anatômica 8mm', category: 'Alianças', price: 6750, weight: '15g (par)', image: 'https://images.unsplash.com/photo-1589128777073-263566ae5e4d?q=80&w=800&auto=format&fit=crop', description: 'Conforto anatômico e largura de 8mm.' },
    { name: 'Aliança Ouro Branco 18k', category: 'Alianças', price: 4800, weight: '10g (par)', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop', description: 'Sofisticação do ouro branco.' },
    { name: 'Aliança Ouro Rosé 18k', category: 'Alianças', price: 4200, weight: '9g (par)', image: 'https://images.unsplash.com/photo-1589128777073-263566ae5e4d?q=80&w=800&auto=format&fit=crop', description: 'Tom romântico do ouro rosé.' },
    { name: 'Aliança Prata 925 com Filete Ouro', category: 'Alianças', price: 550, weight: '12g (par)', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop', description: 'Prata with detalhe em ouro 18k.' },
    { name: 'Aliança Ouro 18k com Diamante', category: 'Alianças', price: 6500, weight: '10g (par)', image: 'https://images.unsplash.com/photo-1589128777073-263566ae5e4d?q=80&w=800&auto=format&fit=crop', description: 'Aliança feminina com diamante central.' },
    { name: 'Aliança Casamento Tradicional 2mm', category: 'Alianças', price: 1800, weight: '4g (par)', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop', description: 'Modelo fino e clássico.' },
    { name: 'Aliança de Prata 925 Fosca', category: 'Alianças', price: 280, weight: '8g (par)', image: 'https://images.unsplash.com/photo-1589128777073-263566ae5e4d?q=80&w=800&auto=format&fit=crop', description: 'Acabamento fosco moderno.' },
  ];

  const insert = db.prepare("INSERT INTO products (name, category, price, weight, image, description) VALUES (?, ?, ?, ?, ?, ?)");
  for (const p of seedProducts) {
    insert.run(p.name, p.category, p.price, p.weight, p.image, p.description);
  }
  console.log("Database seeded with 40 products.");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- API Routes ---

  // Products API
  app.get("/api/products", (req, res) => {
    const products = db.prepare("SELECT * FROM products").all();
    res.json(products);
  });

  app.post("/api/products", (req, res) => {
    const { name, category, price, image, weight, description } = req.body;
    const info = db.prepare(
      "INSERT INTO products (name, category, price, image, weight, description) VALUES (?, ?, ?, ?, ?, ?)"
    ).run(name, category, price, image, weight, description);
    res.json({ id: info.lastInsertRowid });
  });

  app.delete("/api/products/:id", (req, res) => {
    db.prepare("DELETE FROM products WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  // Orders API
  app.get("/api/orders", (req, res) => {
    const orders = db.prepare("SELECT * FROM orders ORDER BY created_at DESC").all();
    res.json(orders);
  });

  app.post("/api/orders", (req, res) => {
    const { customer_name, customer_email, customer_phone, address, city, state, zip_code, items, total } = req.body;
    const info = db.prepare(
      "INSERT INTO orders (customer_name, customer_email, customer_phone, address, city, state, zip_code, items, total) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
    ).run(customer_name, customer_email, customer_phone, address, city, state, zip_code, JSON.stringify(items), total);
    res.json({ id: info.lastInsertRowid });
  });

  app.patch("/api/orders/:id", (req, res) => {
    const { status } = req.body;
    db.prepare("UPDATE orders SET status = ? WHERE id = ?").run(status, req.params.id);
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
