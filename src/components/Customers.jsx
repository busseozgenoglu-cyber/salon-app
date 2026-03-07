import React, { useEffect, useState } from 'react';
import {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from '../api';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: '',
    surname: '',
    phone: '',
    email: '',
    instagramUsername: '',
    notes: '',
  });

  const loadCustomers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getCustomers();
      setCustomers(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Müşteriler yüklenemedi.');
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!form.name?.trim()) {
      setError('Lütfen müşteri adını girin.');
      return;
    }
    try {
      const payload = {
        name: form.name.trim(),
        surname: (form.surname || '').trim(),
        phone: (form.phone || '').trim(),
        email: (form.email || '').trim(),
        instagramUsername: (form.instagramUsername || '').trim(),
        notes: (form.notes || '').trim(),
      };
      if (editingId) {
        await updateCustomer(editingId, payload);
        setSuccess('Müşteri güncellendi.');
      } else {
        await createCustomer(payload);
        setSuccess('Müşteri eklendi.');
      }
      setShowForm(false);
      setEditingId(null);
      setForm({ name: '', surname: '', phone: '', email: '', instagramUsername: '', notes: '' });
      loadCustomers();
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Müşteri kaydedilemedi.');
    }
  };

  const handleEdit = (c) => {
    setForm({
      name: c.name || '',
      surname: c.surname || '',
      phone: c.phone || '',
      email: c.email || '',
      instagramUsername: c.instagramUsername || '',
      notes: c.notes || '',
    });
    setEditingId(c.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bu müşteriyi silmek istediğinize emin misiniz?')) return;
    setError(null);
    try {
      await deleteCustomer(id);
      setSuccess('Müşteri silindi.');
      loadCustomers();
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Müşteri silinemedi.');
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm({ name: '', surname: '', phone: '', email: '', instagramUsername: '', notes: '' });
  };

  if (loading) {
    return (
      <div className="page">
        <h1>Müşteriler</h1>
        <p className="loading">Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Müşteriler</h1>
        <button className="btn btn-primary" onClick={() => { resetForm(); setShowForm(true); }}>
          + Yeni Müşteri
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {showForm && (
        <div className="card form-card">
          <h2>{editingId ? 'Müşteri Düzenle' : 'Yeni Müşteri'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row form-row-2">
              <div>
                <label>Ad *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  placeholder="Ad"
                  required
                />
              </div>
              <div>
                <label>Soyad</label>
                <input
                  type="text"
                  value={form.surname}
                  onChange={(e) => setForm((p) => ({ ...p, surname: e.target.value }))}
                  placeholder="Soyad"
                />
              </div>
            </div>
            <div className="form-row form-row-2">
              <div>
                <label>Telefon</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                  placeholder="05XX XXX XX XX"
                />
              </div>
              <div>
                <label>E-posta</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  placeholder="ornek@email.com"
                />
              </div>
            </div>
            <div className="form-row">
              <label>Instagram</label>
              <input
                type="text"
                value={form.instagramUsername}
                onChange={(e) => setForm((p) => ({ ...p, instagramUsername: e.target.value }))}
                placeholder="@kullaniciadi"
              />
            </div>
            <div className="form-row">
              <label>Notlar</label>
              <textarea
                value={form.notes}
                onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
                rows={2}
                placeholder="Notlar"
              />
            </div>
            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={resetForm}>
                İptal
              </button>
              <button type="submit" className="btn btn-primary">
                {editingId ? 'Güncelle' : 'Kaydet'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="card">
        <h2>Müşteri Listesi</h2>
        {customers.length === 0 ? (
          <p className="empty-state">Henüz müşteri yok.</p>
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Ad Soyad</th>
                  <th>Telefon</th>
                  <th>E-posta</th>
                  <th>İşlem</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => (
                  <tr key={c.id}>
                    <td>{c.name} {c.surname || ''}</td>
                    <td>{c.phone || '-'}</td>
                    <td>{c.email || '-'}</td>
                    <td>
                      <button className="btn-sm" onClick={() => handleEdit(c)}>Düzenle</button>
                      <button className="btn-sm btn-danger" onClick={() => handleDelete(c.id)}>Sil</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
