/**
 * Знак бренда — дуб с испанским мхом из присланного логотипа.
 *
 * Подключён как CSS-маска, а не картинка: так знак принимает цвет текста
 * (currentColor) и одинаково ложится на тёмный и светлый фон, без двух
 * файлов и без подкраски вручную.
 */
export function TreeMark({ className = "" }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="Знак Elizabeth — дуб с испанским мхом"
      className={`tree-mark ${className}`}
    />
  );
}
