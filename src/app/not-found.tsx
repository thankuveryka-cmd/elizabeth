import { Button, Eyebrow } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[86rem] px-5 sm:px-8 py-24 sm:py-32">
      <Eyebrow>404</Eyebrow>
      <h1 className="mt-5 text-[2.25rem] sm:text-5xl leading-[1.05] max-w-[18ch]">
        Такой страницы нет — возможно, объект уже ушёл
      </h1>
      <p className="mt-6 max-w-[52ch] text-[1.0625rem] leading-relaxed text-ink-soft">
        Мы снимаем объекты с публикации, когда они продаются или не проходят проверку структуры
        сделки. Посмотрите каталог целиком или напишите, что искали.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <Button href="/villas" variant="solid">
          В каталог
        </Button>
        <Button href="/contact" variant="outline">
          Описать задачу
        </Button>
      </div>
    </div>
  );
}
