import { useState } from "react";
import Icon from "@/components/ui/icon";

const LOGO_URL = "https://cdn.poehali.dev/files/bc0981a3-af0a-4b04-bab8-74649f807df8.png";
const HERO_IMG = "https://cdn.poehali.dev/projects/60c580d9-f133-44a9-ae21-c47973b330a2/files/9491702b-5820-4945-a6ca-e1f13adfe62b.jpg";
const HALL_IMG = "https://cdn.poehali.dev/projects/60c580d9-f133-44a9-ae21-c47973b330a2/files/ef961d63-4316-4671-a62e-ae8a8fb754fd.jpg";
const DANCE_IMG = "https://cdn.poehali.dev/projects/60c580d9-f133-44a9-ae21-c47973b330a2/files/828b25cc-0d12-47cb-b02c-d45c80adcca7.jpg";

type Section = "home" | "events" | "about" | "gallery" | "contacts";

// --- DATA ---
const EVENTS_DEC = [
  { date: "01 Пн", time: "12:00", title: 'Городская акция «СТОП-СПИД»', place: "г. Сысерть", resp: "Бажова Д.П., Поспелов Д.А.", count: 100, age: "12+", paid: false },
  { date: "03 Ср", time: "15:00", title: 'Развлекательная программа «Твои добро»', place: "Танцевальный зал", resp: "Сергеева Л.В., Муслынин О.Н.", count: 70, age: "6+", paid: false },
  { date: "04 Чт", time: "15:00", title: 'Программа «Спешите делать добра»', place: "Танцевальный зал", resp: "Бочкарев А.А., Муслынин М.С.", count: 70, age: "", paid: false },
  { date: "09 Вт", time: "14:00", title: 'Тематическая программа «Герои моего Отечества»', place: "Малый зал", resp: "Плетнев В.А., Муслынин М.С.", count: 70, age: "6+", paid: false },
  { date: "11 Чт", time: "18:00", title: 'Генеральная репетиция юбилея Дворца культуры', place: "Концертный зал", resp: "Королева А.В., Муслынин О.Н.", count: 150, age: "", paid: false },
  { date: "12 Пт", time: "14:00", title: '«Знатоки Конституции»', place: "Малый зал", resp: "Поспелов Д.А., Муслынин О.Н.", count: 70, age: "12+", paid: false },
  { date: "13 Сб", time: "18:00", title: 'Спектакль «40 причин для аплодисментов»', place: "Концертный зал", resp: "Королева А.В., Муслынин М.С.", count: 500, age: "", paid: true },
  { date: "17 Ср", time: "15:00", title: 'Праздничная программа «Возьмите счастье в Новый год»', place: "Танцевальный зал", resp: "Сергеева Л.В., Муслынин О.Н.", count: 70, age: "12+", paid: false },
  { date: "19 Пт", time: "12:00", title: 'Патриотический форум СМО «Закрытие года Героев»', place: "Дискозал, Концертный зал", resp: "Бажова Д.П.", count: 300, age: "6+", paid: false },
  { date: "20 Сб", time: "19:00", title: 'Новогодний развлекательный вечер «Максидром»', place: "Танцевальный зал", resp: "Бажова Д.П., Муслынин О.Н.", count: 180, age: "18+", paid: true },
  { date: "21 Вс", time: "18:00", title: 'Спектакль танцевальной студии «Фантези»', place: "Концертный зал", resp: "Муслынин М.С.", count: 250, age: "6+", paid: true },
  { date: "25 Чт", time: "16:00", title: 'Новогодняя развлекательная программа для детей посёлка', place: "п. Асбест", resp: "Плетнев В.А., Вишвцев С.Л.", count: 35, age: "0+", paid: false },
  { date: "26 Пт", time: "14:00", title: 'Семейный спектакль «В поисках новогодней Жар-птицы»', place: "Концертный зал, Дискозал", resp: "Королева А.В., Муслынин М.С.", count: 500, age: "0+", paid: true },
  { date: "27 Сб", time: "18:00", title: 'Семейная интерактивная программа «Новогоднее чудеса»', place: "г. Сысерть, пл. перед Администрацией", resp: "Бажова Д.П., Муслынин М.С.", count: 1000, age: "0+", paid: false },
  { date: "31 Ср", time: "19:00", title: 'Новогодняя программа «Угощаем Новым годом!»', place: "п. Верхняя Сысерть, ул. площадка", resp: "Бутусова Е.В.", count: 200, age: "6+", paid: false },
];

// --- COMPONENTS ---
const GoldDivider = () => (
  <div className="flex items-center gap-3 my-2">
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-yellow-600/50 to-transparent" />
    <div className="w-1.5 h-1.5 rotate-45 bg-yellow-600/60" />
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-yellow-600/50 to-transparent" />
  </div>
);

const Badge = ({ children, color = "red" }: { children: React.ReactNode; color?: "red" | "gold" | "gray" }) => {
  const colors = {
    red: "bg-red-900/40 text-red-300 border-red-800/50",
    gold: "bg-yellow-900/40 text-yellow-400 border-yellow-700/50",
    gray: "bg-white/5 text-white/50 border-white/10",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${colors[color]}`}>
      {children}
    </span>
  );
};

// --- SECTIONS ---
const HomeSection = ({ onNavigate }: { onNavigate: (s: Section) => void }) => (
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
        {EVENTS_DEC.slice(0, 4).map((e, i) => (
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

const EventsSection = () => {
  const [filter, setFilter] = useState<"all" | "paid" | "free">("all");
  const filtered = EVENTS_DEC.filter(e =>
    filter === "all" ? true : filter === "paid" ? e.paid : !e.paid
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-10 animate-fade-in-up">
        <p className="text-yellow-600/70 text-xs tracking-[0.4em] uppercase mb-3">Календарный план</p>
        <h2 className="font-['Cormorant_Garamond'] text-4xl text-white/90">Мероприятия — Декабрь 2025</h2>
        <GoldDivider />
        <p className="text-white/40 text-sm mt-3">МБУК «Дворец культуры имени И.П. Романенко» г. Сысерть</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 animate-fade-in-up delay-100">
        {[["all", "Все"], ["free", "Бесплатные"], ["paid", "Платные"]] .map(([val, label]) => (
          <button
            key={val}
            onClick={() => setFilter(val as "all" | "paid" | "free")}
            className={`px-4 py-2 text-sm transition-all ${filter === val
              ? "bg-red-700 text-white"
              : "border border-white/10 text-white/50 hover:border-yellow-600/30 hover:text-yellow-400/70"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-sm border border-yellow-600/10 animate-fade-in-up delay-200">
        <table className="plan-table w-full">
          <thead>
            <tr>
              <th className="text-left">Дата</th>
              <th className="text-left">Время</th>
              <th className="text-left">Мероприятие</th>
              <th className="text-left">Место</th>
              <th className="text-left">Ответственные</th>
              <th className="text-right">Участники</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((e, i) => (
              <tr key={i} className={e.paid ? "is-paid" : ""}>
                <td className="font-medium text-white/70 whitespace-nowrap">{e.date}</td>
                <td className="whitespace-nowrap">{e.time}</td>
                <td>
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-wrap gap-1">
                      {e.age && <Badge color="gray">{e.age}</Badge>}
                      {e.paid && <Badge color="gold">Платно</Badge>}
                    </div>
                    <span>{e.title}</span>
                  </div>
                </td>
                <td className="text-white/50 text-xs">{e.place}</td>
                <td className="text-white/50 text-xs">{e.resp}</td>
                <td className="text-right font-medium">{e.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 p-4 border border-yellow-600/15 rounded-sm bg-yellow-900/5 animate-fade-in-up delay-300">
        <div className="flex items-center gap-2 text-yellow-500/70 text-sm">
          <Icon name="Info" size={14} />
          <span>Данные из официального календарного плана на декабрь 2025 года. Расписание может меняться — уточняйте по телефону.</span>
        </div>
      </div>
    </div>
  );
};

const AboutSection = () => (
  <div className="max-w-5xl mx-auto px-4 py-12">
    <div className="text-center mb-12 animate-fade-in-up">
      <p className="text-yellow-600/70 text-xs tracking-[0.4em] uppercase mb-3">История и миссия</p>
      <h2 className="font-['Cormorant_Garamond'] text-4xl text-white/90">Об учреждении</h2>
      <GoldDivider />
    </div>
    <div className="grid md:grid-cols-2 gap-10 items-center mb-14">
      <div className="animate-fade-in-up delay-100">
        <div className="relative rounded-sm overflow-hidden">
          <img src={HALL_IMG} alt="Концертный зал" className="w-full h-72 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="corner-tl" />
          <div className="corner-br" />
        </div>
      </div>
      <div className="animate-fade-in-up delay-200">
        <h3 className="font-['Cormorant_Garamond'] text-2xl text-white/90 mb-4">МБУК «Дворец культуры имени И.П. Романенко»</h3>
        <div className="h-px bg-gradient-to-r from-yellow-600/40 to-transparent mb-4" />
        <p className="text-white/60 leading-relaxed text-sm mb-4">
          Дворец культуры имени И.П. Романенко — главный культурный центр города Сысерть Свердловской области. Учреждение объединяет творческие коллективы, проводит концерты, спектакли, праздничные программы и образовательные мероприятия для жителей города и района.
        </p>
        <p className="text-white/60 leading-relaxed text-sm">
          В стенах Дворца культуры работают студии танца, вокала, театра и народного творчества. Ежегодно учреждение принимает тысячи зрителей на культурных событиях различного масштаба — от камерных концертов до городских праздников.
        </p>
      </div>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
      {[
        { num: "5", label: "Концертных залов" },
        { num: "20+", label: "Творческих коллективов" },
        { num: "300+", label: "Мероприятий в год" },
        { num: "10 000+", label: "Зрителей ежегодно" },
      ].map((s, i) => (
        <div key={i} className={`event-card rounded-sm p-5 text-center bg-white/[0.03] animate-fade-in-up delay-${(i + 3) * 100}`}>
          <div className="font-['Cormorant_Garamond'] text-3xl text-yellow-400 mb-1">{s.num}</div>
          <div className="text-white/40 text-xs">{s.label}</div>
        </div>
      ))}
    </div>

    {/* Halls */}
    <div className="animate-fade-in-up delay-400">
      <h3 className="font-['Cormorant_Garamond'] text-2xl text-white/90 mb-6 text-center">Площадки учреждения</h3>
      <GoldDivider />
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        {[
          { name: "Концертный зал", desc: "Главная сцена для спектаклей, концертов и торжественных мероприятий" },
          { name: "Малый зал", desc: "Камерные концерты, лекции и мастер-классы. Академические отделения." },
          { name: "Танцевальный зал", desc: "Репетиции и показы танцевальных коллективов, новогодние вечера" },
          { name: "Дискозал", desc: "Развлекательные мероприятия, ярмарки и выставки" },
        ].map((h, i) => (
          <div key={i} className="event-card rounded-sm p-4 bg-white/[0.03] flex gap-3">
            <div className="w-8 h-8 rounded-full bg-red-900/40 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon name="MapPin" size={14} className="text-red-400" />
            </div>
            <div>
              <div className="text-white/85 font-medium text-sm">{h.name}</div>
              <div className="text-white/40 text-xs mt-0.5">{h.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const GallerySection = () => (
  <div className="max-w-6xl mx-auto px-4 py-12">
    <div className="text-center mb-10 animate-fade-in-up">
      <p className="text-yellow-600/70 text-xs tracking-[0.4em] uppercase mb-3">Фотографии</p>
      <h2 className="font-['Cormorant_Garamond'] text-4xl text-white/90">Галерея</h2>
      <GoldDivider />
    </div>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {[HERO_IMG, HALL_IMG, DANCE_IMG, DANCE_IMG, HERO_IMG, HALL_IMG].map((img, i) => (
        <div key={i} className={`relative overflow-hidden rounded-sm aspect-[4/3] event-card animate-fade-in-up delay-${(i + 1) * 100}`}>
          <img src={img} alt={`Фото ${i + 1}`} className="gallery-img w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
            <span className="text-white/80 text-xs">Дворец культуры, г. Сысерть</span>
          </div>
        </div>
      ))}
    </div>
    <p className="text-center text-white/30 text-sm mt-8">
      Больше фотографий в нашей группе ВКонтакте
    </p>
  </div>
);

const ContactsSection = () => (
  <div className="max-w-5xl mx-auto px-4 py-12">
    <div className="text-center mb-12 animate-fade-in-up">
      <p className="text-yellow-600/70 text-xs tracking-[0.4em] uppercase mb-3">Свяжитесь с нами</p>
      <h2 className="font-['Cormorant_Garamond'] text-4xl text-white/90">Контакты</h2>
      <GoldDivider />
    </div>
    <div className="grid md:grid-cols-2 gap-10">
      <div className="animate-fade-in-up delay-100">
        <h3 className="font-['Cormorant_Garamond'] text-2xl text-white/80 mb-6">Реквизиты и адрес</h3>
        <div className="space-y-5">
          {[
            { icon: "MapPin", label: "Адрес", value: "г. Сысерть, Свердловская область" },
            { icon: "Building2", label: "Полное название", value: "МБУК «Дворец культуры имени И.П. Романенко»" },
            { icon: "Phone", label: "Телефон", value: "Уточнить по запросу" },
            { icon: "Clock", label: "Режим работы", value: "Ежедневно, по расписанию мероприятий" },
          ].map((c, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="w-9 h-9 rounded-sm bg-red-900/30 border border-red-800/30 flex items-center justify-center flex-shrink-0">
                <Icon name={c.icon} size={16} className="text-red-400" />
              </div>
              <div>
                <div className="text-yellow-600/60 text-xs uppercase tracking-wider mb-0.5">{c.label}</div>
                <div className="text-white/75 text-sm">{c.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="animate-fade-in-up delay-200">
        <h3 className="font-['Cormorant_Garamond'] text-2xl text-white/80 mb-6">QR-код сайта</h3>
        <div className="relative inline-block">
          <div className="corner-tl" />
          <div className="corner-br" />
          <div className="p-3 bg-white rounded-sm inline-block">
            <img
              src="https://cdn.poehali.dev/files/bc0981a3-af0a-4b04-bab8-74649f807df8.png"
              alt="QR-код"
              className="w-48 h-auto"
            />
          </div>
        </div>
        <p className="text-white/40 text-xs mt-4">Наведите камеру смартфона для быстрого перехода на сайт</p>

        <div className="mt-8">
          <h4 className="text-yellow-600/70 text-xs tracking-[0.3em] uppercase mb-4">Социальные сети</h4>
          <div className="flex gap-3">
            {[
              { icon: "Users", label: "ВКонтакте" },
              { icon: "MessageCircle", label: "Telegram" },
            ].map((s, i) => (
              <button key={i} className="flex items-center gap-2 px-4 py-2.5 border border-white/10 hover:border-yellow-600/30 text-white/50 hover:text-yellow-400/70 transition-all text-sm">
                <Icon name={s.icon} size={14} />
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- MAIN ---
const SECTIONS: { id: Section; label: string }[] = [
  { id: "home", label: "Главная" },
  { id: "events", label: "Мероприятия" },
  { id: "about", label: "Об учреждении" },
  { id: "gallery", label: "Галерея" },
  { id: "contacts", label: "Контакты" },
];

const Index = () => {
  const [active, setActive] = useState<Section>("home");
  const [menuOpen, setMenuOpen] = useState(false);

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
            <div className="w-10 h-10 bg-white rounded-sm flex items-center justify-center overflow-hidden p-0.5">
              <img
                src={LOGO_URL}
                alt="ДК Романенко"
                className="w-full h-full object-contain"
                style={{ objectPosition: "left center" }}
              />
            </div>
            <div className="hidden sm:block">
              <div className="text-white/90 text-xs font-semibold tracking-wide leading-none">ДВОРЕЦ КУЛЬТУРЫ</div>
              <div className="text-yellow-600/60 text-[10px] tracking-wider">им. И.П. Романенко · г. Сысерть</div>
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
            <HomeSection onNavigate={navigate} />
          </div>
        )}
        {active === "events" && <EventsSection />}
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
