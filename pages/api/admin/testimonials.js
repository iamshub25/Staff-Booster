import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data', 'testimonials.json');

// Ensure data directory exists
const ensureDataDir = () => {
  const dir = path.dirname(dataPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, JSON.stringify([]));
  }
};

export default function handler(req, res) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  ensureDataDir();

  if (req.method === 'GET') {
    try {
      const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
      return res.status(200).json(data);
    } catch (error) {
      console.error('Error reading testimonials:', error);
      return res.status(200).json([]);
    }
  }

  if (req.method === 'POST') {
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    const newTestimonial = {
      id: Date.now(),
      ...req.body,
      createdAt: new Date().toISOString()
    };
    data.push(newTestimonial);
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    return res.status(201).json(newTestimonial);
  }

  if (req.method === 'PUT') {
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    const index = data.findIndex(item => item.id === req.body.id);
    if (index !== -1) {
      data[index] = { ...data[index], ...req.body };
      fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
      return res.status(200).json(data[index]);
    }
    return res.status(404).json({ error: 'Testimonial not found' });
  }

  if (req.method === 'DELETE') {
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    const filteredData = data.filter(item => item.id !== parseInt(req.query.id));
    fs.writeFileSync(dataPath, JSON.stringify(filteredData, null, 2));
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}