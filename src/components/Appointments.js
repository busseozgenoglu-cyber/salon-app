import React, { useEffect, useState } from 'react';
import { format, parseISO, addDays } from 'date-fns';
import { tr } from 'date-fns/locale';

const formatDate = (d) => {
  if (!d) return '-';
  try {
    return format(parseISO(d), 'd MMM yyyy', { locale: tr });
  } catch {
    return d;
  }
};
import {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getCustomers,
} from '../api';

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    customerId: '',
    customerName: '',
    service: '',
    date: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
    time: '10:00',
    notes: '',
  });

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [appRes, custRes] = await Promise.all([getAppointments(), getCustomers()]);
      setAppointments(Array.isArray(appRes.data) ? appRes.data : []);
      setCustomers(Array.isArray(custRes.data) ? custRes.data : []);
    } catch (err) {
      const msg = err.response?.data?.error || err.message || 'Veriler yüklenemedi';
      setError(msg);
      setAppointments([]);
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCustomerSelect = (e) => {
    const id = e.target.value;
    const customer = customers.find((c) => c.id === id);
    setForm((prev) => ({
      ...prev,
      customerId: id,
      customerName: customer ? `${customer.name || ''} ${customer.surname || ''}`.trim() : '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!form.customerName && !form.customerId) {
      setError('Lütfen müşteri seçin veya adını girin.');
      return;
    }
    if (!form.service) {
      setError('Lütfen hizmet seçin.');
      return;
    }
    try {
      const payload = {
        customerId: form.customerId || null,
        customerName: form.customerName || customers.find((c) => c.id === form.customerId)?.name || 'Misafir',
        service: form.service,
        date: form.date,
        time: form.time,
        notes: form.notes || '',
      };
      if (editingId) {
        await updateAppointment(editingId, payload);
        setSuccess('Randevu güncellendi.');
      } else {
        await createAppointment(payload);
        setSuccess('Randevu oluşturuldu.');
      }
      setShowForm(false);
      setEditingId(null);
      setForm({
        customerId: '',
        customerName: '',
        service: '',
        date: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
        time: '10:00',
        notes: '',
      });
      loadData();
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Randevu kaydedilemedi.');
    }
  };

  const handleEdit = (apt) => {
    setForm({
      customerId: apt.customerId || '',
      customerName: apt.customerName || '',
      service: apt.service || '',
      date: apt.date || format(new Date(), 'yyyy-MM-dd'),
      time: apt.time || '10:00',
      notes: apt.notes || '',
    });
    setEditingId(apt.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bu randevuyu silmek istediğinize emin misiniz?')) return;
    setError(null);
    try {
      await deleteAppointment(id);
      setSuccess('Randevu silindi.');
      loadData();
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Randevu silinemedi.');
    }
  };

  if (loading) {
    return (
      <div className="page">
        <h1>Randevular</h1>
        <p className="loading">Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Randevular</h1>
        <button className="btn btn-primary" onClick={() => { setShowForm(true); setEditingId(null); setForm({ customerId: '', customerName: '', service: '', date: format(addDays(new Date(), 1), 'yyyy-MM-dd'), time: '10:00', notes: '' }); }}>
          + Yeni Randevu
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {showForm && (
        <div className="card form-card">
          <h2>{editingId ? 'Randevu Düzenle' : 'Yeni Randevu'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <label>Müşteri</label>
              <select value={form.customerId} onChange={handleCustomerSelect}>
                <option value="">-- Müşteri seçin --</option>
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} {c.surname || ''} - {c.phone || ''}
                  </option>
                ))}
              </select>
            </div>
            {!form.customerId && (
              <div className="form-row">
                <label>Misafir Adı</label>
                <input
                  type="text"
                  value={form.customerName}
                  onChange={(e) => setForm((p) => ({ ...p, customerName: e.target.value }))}
                  placeholder="Ad Soyad"
                />
              </div>
            )}
            <div className="form-row">
              <label>Hizmet</label>
              <select value={form.service} onChange={(e) => setForm((p) => ({ ...p, service: e.target.value }))} required>
                <option value="">-- Seçin --</option>
                <option value="Saç Kesimi">Saç Kesimi</option>
                <option value="Saç Boyama">Saç Boyama</option>
                <option value="Manikür">Manikür</option>
                <option value="Pedikür">Pedikür</option>
                <option value="Cilt Bakımı">Cilt Bakımı</option>
                <option value="Epilasyon">Epilasyon</option>
                <option value="Diğer">Diğer</option>
              </select>
            </div>
            <div className="form-row form-row-2">
              <div>
                <label>Tarih</label>
                <input type="date" value={form.date} onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))} required />
              </div>
              <div>
                <label>Saat</label>
                <input type="time" value={form.time} onChange={(e) => setForm((p) => ({ ...p, time: e.target.value }))} required />
              </div>
            </div>
            <div className="form-row">
              <label>Notlar</label>
              <textarea value={form.notes} onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))} rows={2} />
            </div>
            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={() => { setShowForm(false); setEditingId(null); }}>
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
        <h2>Randevu Listesi</h2>
        {appointments.length === 0 ? (
          <p className="empty-state">Henüz randevu yok.</p>
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Tarih</th>
                  <th>Saat</th>
                  <th>Müşteri</th>
                  <th>Hizmet</th>
                  <th>İşlem</th>
                </tr>
              </thead>
              <tbody>
                {appointments
                  .sort((a, b) => new Date(a.date + 'T' + a.time) - new Date(b.date + 'T' + b.time))
                  .map((apt) => (
                    <tr key={apt.id}>
                      <td>{formatDate(apt.date)}</td>
                      <td>{apt.time || '-'}</td>
                      <td>{apt.customerName || 'Misafir'}</td>
                      <td>{apt.service || '-'}</td>
                      <td>
                        <button className="btn-sm" onClick={() => handleEdit(apt)}>Düzenle</button>
                        <button className="btn-sm btn-danger" onClick={() => handleDelete(apt.id)}>Sil</button>
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
