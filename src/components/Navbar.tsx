import { useState } from "react";
import { Search, Menu, X } from "lucide-react";

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onNavigate: (page: string) => void;
}

export default function Navbar({ searchQuery, onSearchChange, onNavigate }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  function go(page: string) {
    setMenuOpen(false);
    onNavigate(page);
  }

  return (
    <nav className="navbar">
      <button className="navbar__logo" onClick={() => go("home")}>
        🏠 CariKost
      </button>

      {/* Desktop search */}
      <div className="navbar__search">
        <Search size={16} color="#999" />
        <input
          type="text"
          placeholder="Cari nama kost, area, atau tipe..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Cari kost"
        />
      </div>

      {/* Desktop actions */}
      <div className="navbar__actions">
        <button
          className="navbar__btn navbar__btn--outline"
          onClick={() => onNavigate("daftarkan-kost")}
        >
          Pasang Kost
        </button>
        <button
          className="navbar__btn navbar__btn--outline"
          onClick={() => alert("Fitur login segera hadir!")}
        >
          Masuk
        </button>
        <button
          className="navbar__btn navbar__btn--solid"
          onClick={() => alert("Fitur daftar segera hadir!")}
        >
          Daftar
        </button>
      </div>

      {/* Mobile hamburger */}
      <button
        className="navbar__hamburger"
        aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((o) => !o)}
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile dropdown panel */}
      {menuOpen && (
        <div className="navbar__mobile-menu">
          <div className="navbar__mobile-search">
            <Search size={16} color="#999" />
            <input
              type="text"
              placeholder="Cari nama kost, area, atau tipe..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              aria-label="Cari kost"
            />
          </div>

          <button className="navbar__mobile-link" onClick={() => go("home")}>
            🏠 Beranda
          </button>
          <button className="navbar__mobile-link" onClick={() => go("daftarkan-kost")}>
            ➕ Pasang Kost
          </button>
          <button className="navbar__mobile-link" onClick={() => go("about")}>
            ℹ️ Tentang Kami
          </button>

          <div className="navbar__mobile-actions">
            <button
              className="navbar__btn navbar__btn--outline"
              onClick={() => { setMenuOpen(false); alert("Fitur login segera hadir!"); }}
            >
              Masuk
            </button>
            <button
              className="navbar__btn navbar__btn--solid"
              onClick={() => { setMenuOpen(false); alert("Fitur daftar segera hadir!"); }}
            >
              Daftar
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
