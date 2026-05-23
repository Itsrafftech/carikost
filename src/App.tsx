import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import AboutPage from "./pages/AboutPage";
import DaftarkanPage from "./pages/DaftarkanPage";
import type { Kost } from "./data/kostData";

type Page = "home" | "detail" | "about" | "daftarkan-kost";

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [selectedKost, setSelectedKost] = useState<Kost | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  function navigate(target: string) {
    const validPage = target as Page;
    setPage(validPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openKost(kost: Kost) {
    setSelectedKost(kost);
    setPage("detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goHome() {
    setPage("home");
    setSelectedKost(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (page !== "home") setPage("home");
        }}
        onNavigate={navigate}
      />

      <main>
        {page === "home" && (
          <HomePage
            searchQuery={searchQuery}
            onKostClick={openKost}
            onNavigate={navigate}
          />
        )}
        {page === "detail" && selectedKost && (
          <DetailPage kost={selectedKost} onBack={goHome} />
        )}
        {page === "about" && <AboutPage onNavigate={navigate} />}
        {page === "daftarkan-kost" && <DaftarkanPage onNavigate={navigate} />}
      </main>

      <Footer onNavigate={navigate} />
    </>
  );
}
