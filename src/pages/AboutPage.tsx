interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export default function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="static-page">
      <h1>🏠 Tentang CariKost</h1>
      <p style={{ marginBottom: "16px", color: "#FF5A1F", fontWeight: 600 }}>
        Platform Pencarian Kost Mahasiswa IPB University
      </p>

      <p>
        <strong>CariKost</strong> adalah platform digital yang membantu mahasiswa IPB University
        menemukan tempat tinggal sementara (kost) yang nyaman, terjangkau, dan dekat dengan
        kampus. Kami menghubungkan ribuan pencari kost dengan pemilik kost terpercaya di
        kawasan Dramaga, Babakan, Cilibende, Balumbang Jaya, dan sekitarnya.
      </p>

      <h2 style={{ marginTop: "28px", marginBottom: "8px", fontSize: "1.2rem", fontWeight: 700 }}>
        🎯 Misi Kami
      </h2>
      <p>
        Mempermudah proses pencarian kost bagi mahasiswa IPB dengan menyediakan informasi
        yang lengkap, transparan, dan dapat diakses kapan saja. Setiap listing mencantumkan
        foto nyata, fasilitas lengkap, harga jelas, dan kontak langsung pemilik via WhatsApp.
      </p>

      <h2 style={{ marginTop: "28px", marginBottom: "8px", fontSize: "1.2rem", fontWeight: 700 }}>
        📍 Mengapa CariKost?
      </h2>
      <ul style={{ paddingLeft: "20px", color: "#555", lineHeight: "2" }}>
        <li>✅ Informasi jarak akurat dari Gerbang Utama IPB</li>
        <li>✅ Filter canggih: harga, fasilitas, jarak, tipe kost</li>
        <li>✅ Kontak langsung pemilik via WhatsApp — tanpa perantara</li>
        <li>✅ Data diperbarui secara berkala</li>
        <li>✅ Gratis untuk pencari kost</li>
      </ul>

      <h2 style={{ marginTop: "28px", marginBottom: "8px", fontSize: "1.2rem", fontWeight: 700 }}>
        📬 Kontak
      </h2>
      <p>
        Email: <a href="mailto:carikost@ipb.ac.id" style={{ color: "#FF5A1F" }}>carikost@ipb.ac.id</a>
        <br />
        WhatsApp Admin:{" "}
        <a
          href="https://wa.me/6281234567000"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#25D366", fontWeight: 600 }}
        >
          +62 812-3456-7000
        </a>
      </p>

      <div style={{ marginTop: "32px" }}>
        <button
          onClick={() => onNavigate("home")}
          style={{
            background: "#FF5A1F",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "12px 24px",
            fontSize: "1rem",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          ← Kembali ke Beranda
        </button>
      </div>
    </div>
  );
}
