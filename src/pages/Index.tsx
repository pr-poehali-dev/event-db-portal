import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";
import { EventItem, fetchEvents } from "@/lib/events-api";
import { LOGO_URL, SECTIONS, Section } from "./Index/constants";
import HomeSection from "./Index/HomeSection";
import EventsSection from "./Index/EventsSection";
import { AboutSection, ContactsSection, GallerySection } from "./Index/InfoSections";

const Index = () => {
  const [active, setActive] = useState<Section>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    fetchEvents()
      .then(setEvents)
      .catch(() => setEvents([]));
  }, []);

  const navigate = (s: Section) => {
    setActive(s);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0f0c0a", color: "#f0e8d8" }}>
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f0c0a]/90 backdrop-blur-md border-b border-yellow-600/10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => navigate("home")} className="flex items-center gap-3 group">
            <div className="h-12 bg-white rounded-sm flex items-center justify-center px-2 py-1">
              <img
                src={LOGO_URL}
                alt="ДК им. И.П. Романенко"
                className="h-full w-auto object-contain"
              />
            </div>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {SECTIONS.map(s => (
              <button
                key={s.id}
                onClick={() => navigate(s.id)}
                className={`nav-link text-sm ${active === s.id ? "active" : "text-white/60"}`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Mobile burger */}
          <button className="md:hidden text-white/60" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-yellow-600/10 bg-[#0f0c0a]/95">
            {SECTIONS.map(s => (
              <button
                key={s.id}
                onClick={() => navigate(s.id)}
                className={`block w-full text-left px-4 py-3 text-sm border-b border-white/5 transition-colors ${
                  active === s.id ? "text-yellow-400 bg-red-900/10" : "text-white/60 hover:text-white/90"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* CONTENT */}
      <div className={active === "home" ? "" : "pt-16"}>
        {active === "home" && (
          <div className="pt-16">
            <HomeSection onNavigate={navigate} events={events} />
          </div>
        )}
        {active === "events" && <EventsSection events={events} />}
        {active === "about" && <AboutSection />}
        {active === "gallery" && <GallerySection />}
        {active === "contacts" && <ContactsSection />}
      </div>

      {/* FOOTER */}
      <footer className="border-t border-yellow-600/10 py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-white/30 text-xs text-center md:text-left">
            © 2025 МБУК «Дворец культуры имени И.П. Романенко» г. Сысерть
          </div>
          <div className="flex gap-4">
            {SECTIONS.map(s => (
              <button key={s.id} onClick={() => navigate(s.id)} className="text-white/25 hover:text-yellow-500/50 text-xs transition-colors">
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
