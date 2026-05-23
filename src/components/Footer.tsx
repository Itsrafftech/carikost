interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="footer">
      <p>
        🏠 <strong>CariKost</strong> — Platform Pencarian Kost Mahasiswa IPB University ·{" "}
        © 2025 CariKost
      </p>
      <p style={{ marginTop: "6px" }}>
        <button
          onClick={() => onNavigate("about")}
          style={{ background: "none", border: "none", cursor: "pointer", color: "#FF5A1F", fontWeight: 600, fontSize: "inherit" }}
        >
          Tentang Kami
        </button>
        {" · "}
        <button
          onClick={() => onNavigate("daftarkan-kost")}
          style={{ background: "none", border: "none", cursor: "pointer", color: "#FF5A1F", fontWeight: 600, fontSize: "inherit" }}
        >
          Daftarkan Kost
        </button>
        {" · "}
        <span>Kontak: carikost@ipb.ac.id</span>
      </p>
    </footer>
  );
}
