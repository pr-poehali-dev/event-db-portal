export const LOGO_URL = "https://cdn.poehali.dev/files/0f446c8c-791b-4f0d-bb88-2afc904bc524.png";
export const QR_URL = "https://cdn.poehali.dev/projects/60c580d9-f133-44a9-ae21-c47973b330a2/bucket/07ba012d-2388-4be5-8e24-0f4888503674.png";
export const HERO_IMG = "https://cdn.poehali.dev/files/8b0bed1e-7037-45e3-aae5-134310dfd1b9.png";
export const HALL_IMG = "https://cdn.poehali.dev/projects/60c580d9-f133-44a9-ae21-c47973b330a2/bucket/8e040385-93b6-48d6-8b8c-8a140ed7a992.png";
export const DANCE_IMG = "https://cdn.poehali.dev/projects/60c580d9-f133-44a9-ae21-c47973b330a2/files/828b25cc-0d12-47cb-b02c-d45c80adcca7.jpg";
export const GALLERY_KIDS_DANCE = "https://cdn.poehali.dev/projects/60c580d9-f133-44a9-ae21-c47973b330a2/bucket/f7227cd3-583c-4008-aeef-e72cbc32f1fb.png";
export const GALLERY_AWARDS = "https://cdn.poehali.dev/projects/60c580d9-f133-44a9-ae21-c47973b330a2/bucket/4d276450-4260-403f-8966-ae1a08900ade.png";

export type Section = "home" | "events" | "about" | "gallery" | "contacts";

export const SECTIONS: { id: Section; label: string }[] = [
  { id: "home", label: "Главная" },
  { id: "events", label: "Мероприятия" },
  { id: "about", label: "Об учреждении" },
  { id: "gallery", label: "Галерея" },
  { id: "contacts", label: "Контакты" },
];

export const GoldDivider = () => (
  <div className="flex items-center gap-3 my-2">
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-yellow-600/50 to-transparent" />
    <div className="w-1.5 h-1.5 rotate-45 bg-yellow-600/60" />
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-yellow-600/50 to-transparent" />
  </div>
);

export const Badge = ({ children, color = "red" }: { children: React.ReactNode; color?: "red" | "gold" | "gray" }) => {
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

export default SECTIONS;
