import React, { useEffect, useState, useRef } from 'react';
import { getInstagramContacts, createInstagramContact, sendInstagramCampaign, getCustomers } from '../api';

export default function InstagramCampaign() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [sending, setSending] = useState(false);
  const [showAddContact, setShowAddContact] = useState(false);
  const [campaignImage, setCampaignImage] = useState(null);
  const [campaignMessage, setCampaignMessage] = useState('');
  const [newContact, setNewContact] = useState({ instagramUsername: '', name: '' });
  const fileInputRef = useRef(null);

  const loadContacts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getInstagramContacts();
      setContacts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Instagram kişileri yüklenemedi.');
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Lütfen bir görsel dosyası seçin (JPG, PNG, GIF).');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setCampaignImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSendCampaign = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!campaignImage && !campaignMessage.trim()) {
      setError('Lütfen en az bir görsel veya mesaj ekleyin.');
      return;
    }
    if (contacts.length === 0) {
      setError('Gönderecek Instagram kişisi yok. Önce kişi ekleyin.');
      return;
    }
    setSending(true);
    try {
      const res = await sendInstagramCampaign(campaignImage, campaignMessage.trim());
      setSuccess(res.data?.message || `Kampanya ${contacts.length} kişiye gönderildi.`);
      setCampaignImage(null);
      setCampaignMessage('');
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Kampanya gönderilemedi.');
    } finally {
      setSending(false);
    }
  };

  const handleImportFromCustomers = async () => {
    setError(null);
    try {
      const res = await getCustomers();
      const customers = Array.isArray(res.data) ? res.data : [];
      const withInstagram = customers.filter((c) => c.instagramUsername?.trim());
      if (withInstagram.length === 0) {
        setError('Instagram kullanıcı adı olan müşteri bulunamadı.');
        return;
      }
      let added = 0;
      const existing = new Set(contacts.map((c) => c.instagramUsername?.toLowerCase()));
      for (const c of withInstagram) {
        const uname = c.instagramUsername.trim().replace(/^@/, '');
        if (existing.has(uname.toLowerCase())) continue;
        await createInstagramContact({
          instagramUsername: uname.startsWith('@') ? uname : `@${uname}`,
          name: `${c.name || ''} ${c.surname || ''}`.trim(),
        });
        existing.add(uname.toLowerCase());
        added++;
      }
      setSuccess(`${added} müşteri Instagram listesine eklendi.`);
      loadContacts();
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Aktarım başarısız.');
    }
  };

  const handleAddContact = async (e) => {
    e.preventDefault();
    if (!newContact.instagramUsername?.trim()) {
      setError('Instagram kullanıcı adı gerekli.');
      return;
    }
    setError(null);
    try {
      await createInstagramContact({
        instagramUsername: newContact.instagramUsername.trim(),
        name: (newContact.name || '').trim(),
      });
      setSuccess('Instagram kişisi eklendi.');
      setNewContact({ instagramUsername: '', name: '' });
      setShowAddContact(false);
      loadContacts();
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Kişi eklenemedi.');
    }
  };

  if (loading) {
    return (
      <div className="page">
        <h1>Instagram Kampanya</h1>
        <p className="loading">Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>📸 Instagram Görsel Kampanya</h1>
      <p className="page-desc">
        Tüm Instagram müşterilerinize görsel mesaj gönderin. Önce aşağıdan kişi ekleyin, sonra kampanya oluşturun.
      </p>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="instagram-grid">
        <div className="card instagram-card">
          <h2>Kampanya Oluştur</h2>
          <form onSubmit={handleSendCampaign}>
            <div className="form-row">
              <label>Görsel</label>
              <div className="image-upload-area" onClick={() => fileInputRef.current?.click()}>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  style={{ display: 'none' }}
                />
                {campaignImage ? (
                  <img src={campaignImage} alt="Kampanya" className="campaign-preview" />
                ) : (
                  <span>Görsel seçmek için tıklayın</span>
                )}
              </div>
            </div>
            <div className="form-row">
              <label>Mesaj (isteğe bağlı)</label>
              <textarea
                value={campaignMessage}
                onChange={(e) => setCampaignMessage(e.target.value)}
                placeholder="Kampanya mesajınız..."
                rows={4}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block" disabled={sending || contacts.length === 0}>
              {sending ? 'Gönderiliyor...' : `Tüm Kişilere Gönder (${contacts.length} kişi)`}
            </button>
          </form>
        </div>

        <div className="card instagram-card">
          <div className="card-header-row">
            <h2>Instagram Kişileri</h2>
            <div className="btn-group">
              <button className="btn btn-secondary btn-sm" onClick={handleImportFromCustomers}>
                Müşterilerden Aktar
              </button>
              <button className="btn btn-secondary btn-sm" onClick={() => setShowAddContact(!showAddContact)}>
                + Kişi Ekle
              </button>
            </div>
          </div>

          {showAddContact && (
            <form onSubmit={handleAddContact} className="add-contact-form">
              <input
                type="text"
                value={newContact.instagramUsername}
                onChange={(e) => setNewContact((p) => ({ ...p, instagramUsername: e.target.value }))}
                placeholder="Instagram @kullaniciadi"
                required
              />
              <input
                type="text"
                value={newContact.name}
                onChange={(e) => setNewContact((p) => ({ ...p, name: e.target.value }))}
                placeholder="İsim (isteğe bağlı)"
              />
              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddContact(false)}>İptal</button>
                <button type="submit" className="btn btn-primary">Ekle</button>
              </div>
            </form>
          )}

          {contacts.length === 0 ? (
            <p className="empty-state">Henüz Instagram kişisi yok. "Kişi Ekle" ile ekleyin.</p>
          ) : (
            <ul className="contact-list">
              {contacts.map((c) => (
                <li key={c.id}>
                  <span className="contact-name">@{c.instagramUsername}</span>
                  {c.name && <span className="contact-extra">{c.name}</span>}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
