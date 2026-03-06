import React, { useEffect, useState } from 'react';
import { getSettings, saveSettings } from '../api';

export default function Settings() {
  const [form, setForm] = useState({
    salonName: '',
    address: '',
    phone: '',
    email: '',
    instagramUsername: '',
    workingHours: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    getSettings()
      .then((res) => {
        if (!cancelled && res.data && typeof res.data === 'object') {
          setForm((prev) => ({
            ...prev,
            salonName: res.data.salonName || '',
            address: res.data.address || '',
            phone: res.data.phone || '',
            email: res.data.email || '',
            instagramUsername: res.data.instagramUsername || '',
            workingHours: res.data.workingHours || '',
          }));
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.response?.data?.error || err.message || 'Ayarlar yüklenemedi.');
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setSaving(true);
    try {
      await saveSettings(form);
      setSuccess('Ayarlar başarıyla kaydedildi.');
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Ayarlar kaydedilemedi.');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="page">
        <h1>Ayarlar</h1>
        <p className="loading">Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Ayarlar</h1>
      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Salon Adı</label>
            <input
              type="text"
              value={form.salonName}
              onChange={(e) => handleChange('salonName', e.target.value)}
              placeholder="Salon adınız"
            />
          </div>
          <div className="form-row">
            <label>Adres</label>
            <input
              type="text"
              value={form.address}
              onChange={(e) => handleChange('address', e.target.value)}
              placeholder="Adres"
            />
          </div>
          <div className="form-row">
            <label>Telefon</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="05XX XXX XX XX"
            />
          </div>
          <div className="form-row">
            <label>E-posta</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="ornek@email.com"
            />
          </div>
          <div className="form-row">
            <label>Instagram Kullanıcı Adı</label>
            <input
              type="text"
              value={form.instagramUsername}
              onChange={(e) => handleChange('instagramUsername', e.target.value)}
              placeholder="@kullaniciadi"
            />
          </div>
          <div className="form-row">
            <label>Çalışma Saatleri</label>
            <input
              type="text"
              value={form.workingHours}
              onChange={(e) => handleChange('workingHours', e.target.value)}
              placeholder="Örn: 09:00 - 20:00"
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Kaydediliyor...' : 'Kaydet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
