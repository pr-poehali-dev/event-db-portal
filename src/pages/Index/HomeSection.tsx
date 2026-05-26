import Icon from "@/components/ui/icon";
import { EventItem } from "@/lib/events-api";
import { Badge, DANCE_IMG, GoldDivider, HALL_IMG, HERO_IMG, Section } from "./constants";

const HomeSection = ({ onNavigate, events }: { onNavigate: (s: Section) => void; events: EventItem[] }) => (
  <div>
    {/* Hero */}
    <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
      <img src={HERO_IMG} alt="Дворец культуры" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0f0c0a]" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <div className="animate-fade-in-up">
          <p className="text-yellow-500/80 text-sm tracking-[0.3em] uppercase mb-3 font-light">МБУК г. Сысерть</p>
          <h1 className="font-['Cormorant_Garamond'] text-5xl md:text-7xl font-bold text-white leading-tight mb-2">
            Дворец культуры
          </h1>
          <p className="font-['Cormorant_Garamond'] text-2xl md:text-3xl font-light italic text-yellow-400/90 mb-6">
            имени И.П. Романенко
          </p>
          <GoldDivider />
          <p className="text-white/60 text-sm tracking-widest uppercase mt-4">г. Сысерть, Свердловская область</p>
        </div>
        <div className="flex gap-4 mt-8 animate-fade-in-up delay-300">
          <button
            onClick={() => onNavigate("events")}
            className="px-7 py-3 bg-red-700 hover:bg-red-600 text-white font-medium text-sm tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-red-900/50"
          >
            Афиша декабря
          </button>
          <button
            onClick={() => onNavigate("about")}
            className="px-7 py-3 border border-yellow-600/40 hover:border-yellow-500/70 text-yellow-400/80 hover:text-yellow-300 font-medium text-sm tracking-wide transition-all duration-300"
          >
            Об учреждении
          </button>
        </div>
      </div>
    </div>

    {/* Quick info cards */}
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <p className="text-yellow-600/70 text-xs tracking-[0.4em] uppercase mb-3">Наша деятельность</p>
        <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl text-white/90">Культура объединяет</h2>
        <GoldDivider />
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { icon: "Music", title: "Концерты и спектакли", desc: "Профессиональные постановки, юбилейные концерты и гастрольные показы на главной сцене города.", img: HALL_IMG },
          { icon: "Users", title: "Творческие студии", desc: "Танцевальные коллективы, вокальные ансамбли, театральные и народные объединения для всех возрастов.", img: DANCE_IMG },
          { icon: "Calendar", title: "Городские события", desc: "Праздничные программы, патриотические акции, детские интерактивные шоу и новогодние ёлки.", img: HERO_IMG },
        ].map((item, i) => (
          <div key={i} className={`event-card rounded-sm overflow-hidden bg-white/[0.03] animate-fade-in-up delay-${(i + 2) * 100}`}>
            <div className="relative h-44 overflow-hidden">
              <img src={item.img} alt={item.title} className="gallery-img w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <Icon name={item.icon} size={16} className="text-yellow-500/70" />
                <h3 className="font-['Cormorant_Garamond'] text-xl text-white/90">{item.title}</h3>
              </div>
              <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Nearest events teaser */}
    <div className="max-w-6xl mx-auto px-4 pb-16">
      <div className="text-center mb-8">
        <p className="text-yellow-600/70 text-xs tracking-[0.4em] uppercase mb-3">Декабрь 2025</p>
        <h2 className="font-['Cormorant_Garamond'] text-3xl text-white/90">Ближайшие события</h2>
        <GoldDivider />
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        {(events || []).slice(0, 4).map((e, i) => (
          <div key={i} className={`event-card rounded-sm bg-white/[0.03] flex gap-4 p-4 animate-fade-in-up delay-${(i + 2) * 100}`}>
            <div className="text-center min-w-[60px]">
              <div className="text-yellow-500 font-['Cormorant_Garamond'] text-2xl font-bold leading-none">{e.date.split(" ")[0]}</div>
              <div className="text-white/40 text-xs">{e.date.split(" ")[1]}</div>
              <div className="text-white/60 text-sm mt-1 font-medium">{e.time}</div>
            </div>
            <div className="border-l border-yellow-600/20 pl-4 flex-1">
              <div className="flex flex-wrap gap-1 mb-1">
                {e.age && <Badge color="gray">{e.age}</Badge>}
                {e.paid && <Badge color="gold">Платно</Badge>}
              </div>
              <p className="text-white/85 text-sm font-medium leading-snug">{e.title}</p>
              <p className="text-white/40 text-xs mt-1">{e.place}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <button
          onClick={() => onNavigate("events")}
          className="px-8 py-3 border border-yellow-600/30 hover:border-yellow-500/60 text-yellow-500/70 hover:text-yellow-400 text-sm tracking-wider uppercase transition-all duration-300"
        >
          Полная афиша декабря
        </button>
      </div>
    </div>
  </div>
);

export default HomeSection;
