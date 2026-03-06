const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3001;

const DATA_DIR = path.join(__dirname, 'data');
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');
const CUSTOMERS_FILE = path.join(DATA_DIR, 'customers.json');
const APPOINTMENTS_FILE = path.join(DATA_DIR, 'appointments.json');
const INSTAGRAM_CONTACTS_FILE = path.join(DATA_DIR, 'instagram_contacts.json');

app.use(cors());
app.use(express.json({ limit: '10mb' }));

async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (err) {
    console.error('Data dir oluşturulamadı:', err);
  }
}

async function readJsonFile(filePath, defaultValue = []) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') return defaultValue;
    console.error('Dosya okuma hatası:', filePath, err);
    return defaultValue;
  }
}

async function writeJsonFile(filePath, data) {
  await ensureDataDir();
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
}

app.get('/api/settings', async (req, res) => {
  try {
    const settings = await readJsonFile(SETTINGS_FILE, {});
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/settings', async (req, res) => {
  try {
    const settings = req.body;
    await writeJsonFile(SETTINGS_FILE, settings);
    res.json({ success: true, settings });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/customers', async (req, res) => {
  try {
    const customers = await readJsonFile(CUSTOMERS_FILE, []);
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/customers', async (req, res) => {
  try {
    const customers = await readJsonFile(CUSTOMERS_FILE, []);
    const newCustomer = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date().toISOString(),
    };
    customers.push(newCustomer);
    await writeJsonFile(CUSTOMERS_FILE, customers);
    res.json({ success: true, customer: newCustomer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/customers/:id', async (req, res) => {
  try {
    const customers = await readJsonFile(CUSTOMERS_FILE, []);
    const index = customers.findIndex((c) => c.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Müşteri bulunamadı' });
    customers[index] = { ...customers[index], ...req.body, updatedAt: new Date().toISOString() };
    await writeJsonFile(CUSTOMERS_FILE, customers);
    res.json({ success: true, customer: customers[index] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/customers/:id', async (req, res) => {
  try {
    const customers = await readJsonFile(CUSTOMERS_FILE, []);
    const filtered = customers.filter((c) => c.id !== req.params.id);
    await writeJsonFile(CUSTOMERS_FILE, filtered);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/appointments', async (req, res) => {
  try {
    const appointments = await readJsonFile(APPOINTMENTS_FILE, []);
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/appointments', async (req, res) => {
  try {
    const appointments = await readJsonFile(APPOINTMENTS_FILE, []);
    const newAppointment = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date().toISOString(),
    };
    appointments.push(newAppointment);
    await writeJsonFile(APPOINTMENTS_FILE, appointments);
    res.json({ success: true, appointment: newAppointment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/appointments/:id', async (req, res) => {
  try {
    const appointments = await readJsonFile(APPOINTMENTS_FILE, []);
    const index = appointments.findIndex((a) => a.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Randevu bulunamadı' });
    appointments[index] = { ...appointments[index], ...req.body, updatedAt: new Date().toISOString() };
    await writeJsonFile(APPOINTMENTS_FILE, appointments);
    res.json({ success: true, appointment: appointments[index] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/appointments/:id', async (req, res) => {
  try {
    const appointments = await readJsonFile(APPOINTMENTS_FILE, []);
    const filtered = appointments.filter((a) => a.id !== req.params.id);
    await writeJsonFile(APPOINTMENTS_FILE, filtered);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/instagram-contacts', async (req, res) => {
  try {
    const contacts = await readJsonFile(INSTAGRAM_CONTACTS_FILE, []);
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/instagram-contacts', async (req, res) => {
  try {
    const contacts = await readJsonFile(INSTAGRAM_CONTACTS_FILE, []);
    const newContact = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date().toISOString(),
    };
    contacts.push(newContact);
    await writeJsonFile(INSTAGRAM_CONTACTS_FILE, contacts);
    res.json({ success: true, contact: newContact });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/instagram-campaign/send', async (req, res) => {
  try {
    const { imageBase64, message } = req.body;
    const contacts = await readJsonFile(INSTAGRAM_CONTACTS_FILE, []);
    return res.json({
      success: true,
      message: `Kampanya ${contacts.length} kişiye gönderildi`,
      sentCount: contacts.length,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

ensureDataDir().then(() => {
  app.listen(PORT, () => {
    console.log(`Salon API sunucusu http://localhost:${PORT} adresinde çalışıyor`);
  });
});
