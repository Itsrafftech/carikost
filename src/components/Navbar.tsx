import { Search, Menu, Home } from "lucide-react";

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onNavigate: (page: string) => void;
}

export default function Navbar({ searchQuery, onSearchChange, onNavigate }: NavbarProps) {
  return (
    <nav className="navbar">
      <button
        className="navbar__logo"
        onClick={() => onNavigate("home")}
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        🏠 CariKost
      </button>

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
        <button
          className="navbar__hamburger"
          aria-label="Menu"
          onClick={() => onNavigate("about")}
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Mobile-only bottom strip: link row */}
      <button
        className="navbar__hamburger"
        style={{ marginLeft: 0 }}
        aria-label="Beranda"
        onClick={() => onNavigate("home")}
      >
        <Home size={20} />
      </button>
    </nav>
  );
}
