import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data', 'contact-info.json');

const ensureDataDir = () => {
  const dir = path.dirname(dataPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(dataPath)) {
    const defaultData = {
      phone: '+91 9835968923',
      email: 'connect@staffbooster.com',
      address: 'Omakara Apt 102\n401404 Palghar'
    };
    fs.writeFileSync(dataPath, JSON.stringify(defaultData, null, 2));
  }
};

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
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
      return res.status(500).json({ error: 'Failed to read contact info' });
    }
  }

  if (req.method === 'PUT') {
    try {
      const data = req.body;
      fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update contact info' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}