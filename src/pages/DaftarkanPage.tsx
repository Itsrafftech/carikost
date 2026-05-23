import { useState } from "react";

interface DaftarkanPageProps {
  onNavigate: (page: string) => void;
}

interface FormState {
  namaKost: string;
  namaPemilik: string;
  noWa: string;
  area: string;
  alamat: string;
  tipeKost: string;
  harga: string;
  deskripsi: string;
}

const INITIAL_FORM: FormState = {
  namaKost: "",
  namaPemilik: "",
  noWa: "",
  area: "",
  alamat: "",
  tipeKost: "",
  harga: "",
  deskripsi: "",
};

const AREA_OPTIONS = [
  "Dramaga",
  "Babakan",
  "Cilibende",
  "Balumbang Jaya",
  "Sindang Barang",
  "Taman Cimanggu",
  "Loji",
  "Lainnya",
];

export default function DaftarkanPage({ onNavigate }: DaftarkanPageProps) {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, send form data to backend here
  }

  return (
    <div className="static-page">
      <h1>📋 Daftarkan Kost Anda</h1>
      <p style={{ marginBottom: "8px" }}>
        Pasang kost Anda di CariKost dan jangkau ribuan mahasiswa IPB setiap bulan.
        Isi formulir di bawah dan tim kami akan menghubungi Anda dalam 1×24 jam.
      </p>

      {/* Featured slot promo */}
      <div
        style={{
          background: "#fff1ec",
          border: "2px solid #FF5A1F",
          borderRadius: "10px",
          padding: "14px 18px",
          marginBottom: "20px",
          fontSize: ".88rem",
        }}
      >
        ⭐ <strong>Ingin tampil di Slot Unggulan?</strong> Kost Anda akan muncul di bagian teratas
        halaman utama dan dilihat ribuan mahasiswa setiap hari.{" "}
        <strong style={{ color: "#FF5A1F" }}>Hubungi admin untuk info harga slot.</strong>
      </div>

      {submitted ? (
        <div className="alert-success">
          ✅ Terima kasih, <strong>{form.namaPemilik}</strong>! Formulir pendaftaran kost{" "}
          <strong>"{form.namaKost}"</strong> berhasil dikirim. Tim CariKost akan menghubungi
          Anda di WhatsApp <strong>{form.noWa}</strong> dalam 1×24 jam.
          <div style={{ marginTop: "14px" }}>
            <button
              onClick={() => { setForm(INITIAL_FORM); setSubmitted(false); }}
              style={{ background: "#25D366", color: "#fff", border: "none", borderRadius: "6px", padding: "8px 18px", fontWeight: 700, cursor: "pointer", marginRight: "10px" }}
            >
              Daftar Kost Lain
            </button>
            <button
              onClick={() => onNavigate("home")}
              style={{ background: "#FF5A1F", color: "#fff", border: "none", borderRadius: "6px", padding: "8px 18px", fontWeight: 700, cursor: "pointer" }}
            >
              Ke Beranda
            </button>
          </div>
        </div>
      ) : (
        <form className="daftar-form" onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="namaKost">Nama Kost *</label>
            <input
              id="namaKost"
              name="namaKost"
              type="text"
              placeholder="cth. Kost Melati Dramaga"
              value={form.namaKost}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="namaPemilik">Nama Pemilik *</label>
            <input
              id="namaPemilik"
              name="namaPemilik"
              type="text"
              placeholder="Nama lengkap Anda"
              value={form.namaPemilik}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="noWa">Nomor WhatsApp *</label>
            <input
              id="noWa"
              name="noWa"
              type="tel"
              placeholder="cth. 08123456789"
              value={form.noWa}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="area">Area / Kelurahan *</label>
            <select
              id="area"
              name="area"
              value={form.area}
              onChange={handleChange}
              required
            >
              <option value="">— Pilih area —</option>
              {AREA_OPTIONS.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="alamat">Alamat Lengkap *</label>
            <input
              id="alamat"
              name="alamat"
              type="text"
              placeholder="Jalan, nomor, RT/RW, kode pos"
              value={form.alamat}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="tipeKost">Tipe Kost *</label>
            <select
              id="tipeKost"
              name="tipeKost"
              value={form.tipeKost}
              onChange={handleChange}
              required
            >
              <option value="">— Pilih tipe —</option>
              <option value="putra">Kost Putra</option>
              <option value="putri">Kost Putri</option>
              <option value="campur">Kost Campur</option>
            </select>
          </div>

          <div>
            <label htmlFor="harga">Harga per Bulan (Rp) *</label>
            <input
              id="harga"
              name="harga"
              type="number"
              placeholder="cth. 800000"
              min={100000}
              value={form.harga}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="deskripsi">Deskripsi Singkat</label>
            <textarea
              id="deskripsi"
              name="deskripsi"
              placeholder="Ceritakan keunggulan kost Anda, fasilitas unggulan, dsb."
              value={form.deskripsi}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="daftar-form__submit">
            🚀 Kirim Pendaftaran
          </button>
        </form>
      )}

      <div style={{ marginTop: "24px" }}>
        <button
          onClick={() => onNavigate("home")}
          style={{
            background: "none",
            border: "none",
            color: "#FF5A1F",
            fontWeight: 600,
            fontSize: ".9rem",
            cursor: "pointer",
          }}
        >
          ← Kembali ke Beranda
        </button>
      </div>
    </div>
  );
}
