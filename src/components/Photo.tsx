/**
 * Плейсхолдер под реальную съёмку.
 * Реальные фото: положить в /public/photos, заменить этот компонент на next/image
 * с src={`/photos/${villaId}/${name}.webp`} — разметка карточек не изменится.
 */

const TONES: Record<string, string> = {
  hero: "from-olive-800 via-olive-700 to-forest-700",
  pool: "from-forest-700 via-olive-700 to-olive-800",
  living: "from-cream-300 via-cream-200 to-cream-300",
  master: "from-olive-600 via-olive-700 to-olive-900",
  view: "from-forest-600 via-olive-600 to-olive-800",
  kitchen: "from-cream-200 via-cream-300 to-cream-200",
  infinity: "from-olive-700 via-forest-600 to-olive-900",
  sunset: "from-gold-600 via-olive-700 to-olive-900",
  terrace: "from-olive-700 via-olive-600 to-forest-700",
  jetty: "from-forest-700 via-olive-800 to-olive-900",
  bay: "from-olive-600 via-forest-600 to-olive-800",
  plan: "from-cream-200 via-cream-300 to-cream-200",
  common: "from-olive-700 via-cream-300 to-olive-700",
  kids: "from-cream-300 via-cream-200 to-cream-300",
  garden: "from-forest-600 via-olive-600 to-forest-700",
};

const LIGHT = new Set(["living", "kitchen", "plan", "kids", "garden", "common"]);

export function Photo({
  name,
  caption,
  aspect = "4/3",
  priority = false,
  className = "",
}: {
  name: string;
  caption: string;
  aspect?: string;
  priority?: boolean;
  className?: string;
}) {
  const tone = TONES[name] ?? TONES.hero;
  const light = LIGHT.has(name);

  return (
    <figure
      className={`relative overflow-hidden bg-gradient-to-br ${tone} ${className}`}
      style={{ aspectRatio: aspect }}
    >
      {/* лёгкая «плёночная» текстура, чтобы плейсхолдер не читался как пустой div */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.16] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, rgba(255,255,255,0.5) 0 1px, transparent 1px 7px)",
        }}
      />
      <figcaption
        className={`absolute inset-0 flex flex-col justify-end gap-1 p-4 sm:p-5 ${
          light ? "text-olive-900" : "text-cream-100"
        }`}
      >
        <span className="eyebrow opacity-75">
          {priority ? "Ключевой кадр" : "Место под съёмку"}
        </span>
        <span className="text-[0.8125rem] leading-snug opacity-85 max-w-[36ch]">{caption}</span>
      </figcaption>
    </figure>
  );
}
