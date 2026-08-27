/**
 * Обычная сборка (npm run dev / npm run build) ничего из этого не включает —
 * конфиг пустой по умолчанию.
 *
 * Ветка для GitHub Pages включается двумя переменными окружения, их выставляет
 * workflow .github/workflows/deploy-pages.yml:
 *
 *   STATIC_EXPORT=true          — собрать статику в папку out/
 *   NEXT_PUBLIC_BASE_PATH=/elizabeth — сайт живёт не в корне домена,
 *                                а по адресу user.github.io/elizabeth
 */

const isExport = process.env.STATIC_EXPORT === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(isExport
    ? {
        output: "export",
        // Без слеша на конце GitHub Pages не найдёт /villas/index.html
        trailingSlash: true,
        // Оптимизатор картинок требует сервер, которого у статики нет
        images: { unoptimized: true },
      }
    : {}),
  ...(basePath ? { basePath } : {}),
};

export default nextConfig;
