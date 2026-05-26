import Icon from "@/components/ui/icon";
import {
  DANCE_IMG,
  GALLERY_AWARDS,
  GALLERY_KIDS_DANCE,
  GoldDivider,
  HALL_IMG,
  HERO_IMG,
  QR_URL,
} from "./constants";

export const AboutSection = () => (
  <div className="max-w-5xl mx-auto px-4 py-12">
    <div className="text-center mb-12 animate-fade-in-up">
      <p className="text-yellow-600/70 text-xs tracking-[0.4em] uppercase mb-3">История и миссия</p>
      <h2 className="font-['Cormorant_Garamond'] text-4xl text-white/90">Об учреждении</h2>
      <GoldDivider />
    </div>
    <div className="grid md:grid-cols-2 gap-10 items-center">
      <div className="animate-fade-in-up delay-100">
        <div className="relative rounded-sm overflow-hidden">
          <img src={HALL_IMG} alt="Концертный зал ДК им. И.П. Романенко" className="w-full h-80 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
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
  </div>
);

export const GallerySection = () => (
  <div className="max-w-6xl mx-auto px-4 py-12">
    <div className="text-center mb-10 animate-fade-in-up">
      <p className="text-yellow-600/70 text-xs tracking-[0.4em] uppercase mb-3">Фотографии</p>
      <h2 className="font-['Cormorant_Garamond'] text-4xl text-white/90">Галерея</h2>
      <GoldDivider />
    </div>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {[HERO_IMG, HALL_IMG, DANCE_IMG, GALLERY_KIDS_DANCE, GALLERY_AWARDS].map((img, i) => (
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

export const ContactsSection = () => (
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
            { icon: "MapPin", label: "Адрес", value: "г. Сысерть, ул. Ленина, 32, Свердловская область" },
            { icon: "Building2", label: "Полное название", value: "МБУК «Дворец культуры имени И.П. Романенко»" },
            { icon: "Phone", label: "Телефон", value: "+7 (34374) 7-36-39" },
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
              src={QR_URL}
              alt="QR-код сайта ДК им. И.П. Романенко"
              className="w-52 h-auto"
            />
          </div>
        </div>
        <p className="text-white/40 text-xs mt-4">Наведите камеру смартфона для быстрого перехода на сайт</p>

        <div className="mt-8">
          <h4 className="text-yellow-600/70 text-xs tracking-[0.3em] uppercase mb-4">Социальные сети</h4>
          <div className="flex gap-3">
            <a
              href="https://vk.com/dk_sysert"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 border border-white/10 hover:border-yellow-600/30 text-white/50 hover:text-yellow-400/70 transition-all text-sm"
            >
              <Icon name="Users" size={14} />
              ВКонтакте
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AboutSection;
