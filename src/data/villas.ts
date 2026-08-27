/**
 * МОК-ДАННЫЕ. Здесь и только здесь меняются объекты.
 * Подключение к реальной CMS: заменить массив `villas` на fetch/запрос,
 * сохранив тип `Villa` — вёрстка ничего не знает об источнике данных.
 *
 * Правила заполнения summary:
 *  - 2–3 предложения, каждое проверяемо (цифра, гео-деталь, процедура);
 *  - обязательно один честный минус объекта — он продаёт лучше эпитетов;
 *  - никаких «райских уголков» и «эксклюзивного премиума».
 */

export type Cluster =
  | "Laguna"
  | "Layan"
  | "Kamala"
  | "Bang Tao"
  | "Cape Yamu"
  | "Surin"
  | "Nai Thon"
  | "Nai Harn";

/** Посуточная сдача — только при действующей гостиничной лицензии. */
export type ShortTermOffer = {
  nightlyUSD: number;
  minNights: number;
};

/** Аренда от 30 дней. Легальна без лицензии, поэтому доступна почти везде. */
export type LongTermOffer = {
  /** Ставка в хай-сизон, ноябрь–апрель. */
  monthlyHighUSD: number;
  /** Ставка в лоу-сизон, май–октябрь. */
  monthlyLowUSD: number;
  minMonths: number;
};

export type SaleOffer = {
  priceUSD: number;
};

export type Villa = {
  id: string;
  title: string;
  cluster: Cluster | string;

  /**
   * Что с этим домом можно делать. Один объект может одновременно сдаваться
   * помесячно, сдаваться посуточно и продаваться — поэтому не одно поле,
   * а набор предложений.
   *
   * ЖЁСТКОЕ ПРАВИЛО: `short` допустим только при `rentalLicensed === true`.
   * Сдача менее чем на 30 дней без гостиничной лицензии нарушает Hotel Act.
   * Правило проверяется на старте, см. assertOffersLegal ниже.
   */
  offers: {
    short?: ShortTermOffer;
    long?: LongTermOffer;
    sale?: SaleOffer;
  };

  /** Есть ли у объекта действующая гостиничная лицензия. */
  rentalLicensed: boolean;

  ownership: "freehold" | "leasehold" | "company";
  /** Пояснение к структуре владения — показываем в карточке, не прячем в договор. */
  ownershipNote: string;
  bedrooms: number;
  bathrooms: number;
  /** Сколько человек размещается — для аренды это главный вопрос гостя. */
  sleeps: number;
  landSizeSqm: number;
  livingAreaSqm: number;
  status: "ready" | "off-plan";
  /** Год сдачи для off-plan, год постройки для готовых. */
  year: number;
  images: string[];
  /** Подписи к местам под реальную съёмку. */
  imageCaptions: string[];
  /** Схема планировки: подписи этажей под реальный чертёж. */
  floorPlan: { level: string; rooms: string }[];
  nearby: { place: string; minutes: number }[];
  summary: string;
  /** Что мы проверили по этому объекту до показа. */
  dueDiligence: string[];
  /** Честный минус — говорим до просмотра, а не после. */
  tradeoff: string;
  /** Кому объект подходит по задаче, а не по паспорту. */
  fitsJobs: ("relocate" | "invest" | "second-home" | "try-first" | "holiday")[];
  /** Расходы на содержание в год, USD — главный вопрос покупателя. */
  annualCostsUSD?: number;
};

export const villas: Villa[] = [
  {
    id: "layan-hillside-04",
    title: "Дом на склоне Layan, 4 спальни",
    cluster: "Layan",
    offers: {
      long: { monthlyHighUSD: 9_500, monthlyLowUSD: 6_200, minMonths: 3 },
      sale: { priceUSD: 1_650_000 },
    },
    rentalLicensed: false,
    sleeps: 8,
    ownership: "leasehold",
    ownershipNote:
      "Зарегистрированный договор аренды земли на 30 лет + отдельное право на строение (superficies) на имя покупателя.",
    bedrooms: 4,
    bathrooms: 5,
    landSizeSqm: 1_240,
    livingAreaSqm: 520,
    status: "ready",
    year: 2021,
    images: ["hero", "pool", "living", "master", "view", "kitchen"],
    imageCaptions: [
      "Фасад с подъездной дороги, съёмка на закате",
      "Бассейн 14 м и терраса, вид в сторону Layan Beach",
      "Гостиная с раздвижной стеной, дневной свет",
      "Мастер-спальня второго этажа",
      "Панорама на бухту с верхней террасы",
      "Кухня-остров, оборудование Gaggenau",
    ],
    floorPlan: [
      { level: "Нижний уровень", rooms: "Гараж на 2 машины, техпомещение, комната персонала" },
      { level: "Основной этаж", rooms: "Гостиная, кухня, 1 спальня с ванной, бассейн, sala" },
      { level: "Верхний этаж", rooms: "Мастер-спальня, 2 спальни, кабинет, терраса" },
    ],
    nearby: [
      { place: "Layan Beach", minutes: 6 },
      { place: "Boat Avenue (продукты, рестораны)", minutes: 12 },
      { place: "UWC Thailand", minutes: 18 },
      { place: "Bangkok Hospital Phuket", minutes: 35 },
      { place: "Аэропорт", minutes: 25 },
    ],
    summary:
      "Отдельно стоящий дом на холме между Layan и Bang Tao: 1 240 м² участка, соседей два, дорога к дому асфальтированная и своя. Построен в 2021 году местным подрядчиком, не девелоперским проектом — поэтому цена за метр ниже, чем в брендированных резиденциях по соседству, но и управляющей компании здесь нет.",
    dueDiligence: [
      "Chanote (титул) проверен в Земельном департаменте Thalang, обременений нет",
      "Договор аренды зарегистрирован, срок начал течь в 2021 году — остаток 25 лет",
      "Разрешение на строительство и акт ввода получены, самостроя нет",
      "Проверен сервитут на подъездную дорогу — она не общая, а оформлена на участок",
    ],
    tradeoff:
      "Дом на склоне: 40 ступеней от парковки до входа и подъём под уклоном ~12%. Для семьи с малышом в коляске или пожилыми родителями это ежедневная история — смотреть только вживую.",
    fitsJobs: ["relocate", "second-home"],
    annualCostsUSD: 14_000,
  },
  {
    id: "bangtao-garden-residence-11",
    title: "Резиденция в проекте Bang Tao, 4 спальни, сдача 2027",
    cluster: "Bang Tao",
    // Дом ещё строится — сдавать нечего, пока только продажа
    offers: {
      sale: { priceUSD: 1_250_000 },
    },
    rentalLicensed: true,
    sleeps: 8,
    ownership: "leasehold",
    ownershipNote:
      "Аренда земли на 30 лет с регистрацией в Земельном департаменте. Продавец предлагает опции продления — юридически это договорное обещание, а не гарантированный срок владения.",
    bedrooms: 4,
    bathrooms: 4,
    landSizeSqm: 640,
    livingAreaSqm: 410,
    status: "off-plan",
    year: 2027,
    images: ["hero", "pool", "living", "plan", "common"],
    imageCaptions: [
      "Рендер фасада от девелопера — заменить на съёмку после сдачи",
      "Бассейн 9 м, общий вид участка",
      "Гостиная, рендер интерьера",
      "Мастер-план посёлка, 22 участка",
      "Общая зона: спортзал и коворкинг проекта",
    ],
    floorPlan: [
      { level: "Первый этаж", rooms: "Гостиная-кухня, 1 спальня, санузел, бассейн, парковка" },
      { level: "Второй этаж", rooms: "Мастер-спальня, 2 спальни, 3 ванных, балкон" },
    ],
    nearby: [
      { place: "Bang Tao Beach", minutes: 8 },
      { place: "Porto de Phuket / Villa Market", minutes: 7 },
      { place: "HeadStart International School", minutes: 15 },
      { place: "Laguna Golf Phuket", minutes: 10 },
    ],
    summary:
      "22 дома в закрытом посёлке в 8 минутах от Bang Tao Beach, сдача заявлена на I квартал 2027 года. У проекта есть гостиничная лицензия, то есть краткосрочная сдача здесь легальна — на Пхукете это меньшинство объектов. Платите частями по мере строительства: 30% на договоре, дальше по этапам.",
    dueDiligence: [
      "Проверены предыдущие два проекта девелопера: оба сданы с задержкой 4 и 7 месяцев",
      "Гостиничная лицензия проекта запрошена и получена в копии — номер и срок проверены",
      "Договор предусматривает штраф за просрочку сдачи; пункт есть, размер обсуждаем",
      "Эскроу не предусмотрен тайским правом для вилл — деньги идут напрямую девелоперу, это ключевой риск off-plan",
    ],
    tradeoff:
      "Это off-plan. Вы покупаете обязательство, а не дом: срок может сдвинуться, отделка может отличаться от рендера. Мы не рекомендуем этот формат тем, кому нужно въехать к началу учебного года.",
    fitsJobs: ["invest", "second-home"],
    annualCostsUSD: 11_500,
  },
  {
    id: "laguna-family-rent-07",
    title: "Дом в Laguna для длительной аренды, 4 спальни",
    cluster: "Laguna",
    offers: {
      long: { monthlyHighUSD: 8_500, monthlyLowUSD: 5_400, minMonths: 6 },
    },
    rentalLicensed: false,
    sleeps: 8,
    ownership: "leasehold",
    ownershipNote:
      "Аренда у собственника от 6 месяцев. Договор на срок до 3 лет; на срок свыше 3 лет требуется регистрация.",
    bedrooms: 4,
    bathrooms: 4,
    landSizeSqm: 700,
    livingAreaSqm: 380,
    status: "ready",
    year: 2018,
    images: ["hero", "pool", "living", "kids", "garden"],
    imageCaptions: [
      "Дом со стороны лагуны, утренний свет",
      "Бассейн и лужайка",
      "Гостиная с выходом на террасу",
      "Детская, две кровати",
      "Сад, взрослые деревья",
    ],
    floorPlan: [
      { level: "Первый этаж", rooms: "Гостиная, кухня, гостевая спальня, прачечная" },
      { level: "Второй этаж", rooms: "Мастер-спальня, 2 детские, 2 ванных" },
    ],
    nearby: [
      { place: "Laguna Phuket (велодорожки, отели)", minutes: 3 },
      { place: "British International School (BISP)", minutes: 20 },
      { place: "Boat Avenue", minutes: 9 },
      { place: "Bang Tao Beach", minutes: 10 },
    ],
    summary:
      "Дом внутри Laguna: закрытый периметр, велодорожки, до продуктового 9 минут пешком по ровной дороге — редкость для острова, где почти везде нужна машина. Собственник сдаёт от 6 месяцев и разрешает животных до 15 кг. Мебель 2018 года, местами видно возраст: список того, что собственник согласился обновить, приложен к договору.",
    dueDiligence: [
      "Проверено право собственника сдавать: свидетельство и паспорт сверены",
      "Депозит 2 месяца, условия возврата прописаны с описью имущества",
      "Счётчики воды и электричества отдельные — платите по тарифу, а не «по договорённости»",
      "Интернет: оптика 1 Гбит/с, проверено на месте замером",
    ],
    tradeoff:
      "В Laguna шумно в хай-сизон: рядом отели и мероприятия. Тем, кто ищет тишину, лучше смотреть Layan или Cape Panwa.",
    fitsJobs: ["relocate", "try-first"],
  },
  {
    id: "kamala-ridge-02",
    title: "Вилла на гряде Kamala, 5 спален",
    cluster: "Kamala",
    // Лицензия есть — единственный формат, где посуточная сдача законна
    offers: {
      short: { nightlyUSD: 1_450, minNights: 3 },
      long: { monthlyHighUSD: 18_000, monthlyLowUSD: 11_000, minMonths: 1 },
      sale: { priceUSD: 1_950_000 },
    },
    rentalLicensed: true,
    sleeps: 10,
    ownership: "leasehold",
    ownershipNote:
      "Зарегистрированная аренда на 30 лет в составе управляемого проекта, строение оформляется на покупателя.",
    bedrooms: 5,
    bathrooms: 6,
    landSizeSqm: 1_500,
    livingAreaSqm: 680,
    status: "ready",
    year: 2019,
    images: ["hero", "infinity", "living", "master", "sunset", "terrace"],
    imageCaptions: [
      "Общий вид виллы с дрона",
      "Инфинити-бассейн 18 м на закате",
      "Гостиная двойной высоты",
      "Мастер-спальня с видом на Андаманское море",
      "Закат с террасы — снимать в феврале, солнце садится в кадр",
      "Обеденная терраса на 10 человек",
    ],
    floorPlan: [
      { level: "Уровень входа", rooms: "Холл, гостиная, кухня, столовая, гостевой санузел" },
      { level: "Уровень бассейна", rooms: "Мастер-спальня, 2 спальни, бассейн, sala, кухня-барбекю" },
      { level: "Нижний уровень", rooms: "2 спальни, спортзал, кинозал, комната персонала" },
    ],
    nearby: [
      { place: "Kamala Beach", minutes: 9 },
      { place: "Surin Beach", minutes: 14 },
      { place: "Kajonkiet International School", minutes: 20 },
      { place: "Patong", minutes: 20 },
    ],
    summary:
      "680 м² на трёх уровнях по гряде между Kamala и Surin, вид на море с каждого уровня. Вилла в управляемом проекте с гостиничной лицензией: краткосрочная сдача легальна, управляющая компания работает с 2019 года. За обслуживание проекта платится взнос — в 2025 году это было около $9 200 в год, ставку подтверждаем документом до сделки.",
    dueDiligence: [
      "Гостиничная лицензия проекта действует, копия и срок проверены",
      "Запрошены отчёты управляющей компании по загрузке за 3 года — предоставлены по 2 объектам из 14",
      "Проверена смета обслуживания и история повышения взноса",
      "Подпорные стены осмотрены инженером после сезона дождей 2024 — трещин нет",
    ],
    tradeoff:
      "Дорога к вилле узкая, в сезон разъезд со встречной машиной — маневр. Пляж Kamala с этой стороны не «шаговый»: 9 минут на машине, пешком не ходят.",
    fitsJobs: ["invest", "second-home"],
    annualCostsUSD: 22_000,
  },
  {
    id: "cape-yamu-waterfront-05",
    title: "Вилла у воды Cape Yamu, 4 спальни",
    cluster: "Cape Yamu",
    offers: {
      long: { monthlyHighUSD: 12_000, monthlyLowUSD: 7_500, minMonths: 3 },
      sale: { priceUSD: 1_800_000 },
    },
    rentalLicensed: false,
    sleeps: 8,
    ownership: "company",
    ownershipNote:
      "Продавец предлагает сделку через тайскую компанию-владельца земли. Мы обязаны предупредить: номинальные структуры под системным контролем властей. Схему согласовываем с лицензированным юристом до задатка.",
    bedrooms: 4,
    bathrooms: 5,
    landSizeSqm: 1_900,
    livingAreaSqm: 610,
    status: "ready",
    year: 2016,
    images: ["hero", "jetty", "living", "pool", "bay"],
    imageCaptions: [
      "Вилла со стороны залива Phang Nga",
      "Собственный причал, отлив",
      "Гостиная, вид на воду",
      "Бассейн вдоль линии воды",
      "Панорама залива с известняковыми островами",
    ],
    floorPlan: [
      { level: "Основной уровень", rooms: "Гостиная, кухня, столовая, мастер-спальня, бассейн" },
      { level: "Гостевое крыло", rooms: "3 спальни с отдельными выходами, гостиная" },
      { level: "Участок", rooms: "Причал, эллинг, дом персонала" },
    ],
    nearby: [
      { place: "Ao Po Grand Marina", minutes: 12 },
      { place: "Boat Lagoon Marina", minutes: 25 },
      { place: "Аэропорт", minutes: 40 },
      { place: "Central Festival Phuket", minutes: 30 },
    ],
    summary:
      "1 900 м² на восточном берегу с собственным причалом — от него до Ao Po Grand Marina 12 минут по воде. Cape Yamu — про яхты, приватность и залив Пханг-Нга, а не про купание: здесь илистое дно и заметные приливы, и это надо принять до, а не после покупки. Дом 2016 года, техника и кровля требуют бюджета на обновление.",
    dueDiligence: [
      "Проверена структура компании-владельца: состав акционеров, происхождение капитала, протоколы",
      "Проверено оформление причала и права на береговую полосу",
      "Смета на обновление кровли и кондиционирования получена от подрядчика: ~$60 000",
      "Финансовая отчётность компании за 5 лет запрошена — есть за 4 года",
    ],
    tradeoff:
      "Владение через тайскую компанию — самая рискованная из трёх структур. Если для вас критична юридическая безупречность, мы сами предложим вам смотреть другой объект.",
    fitsJobs: ["second-home"],
    annualCostsUSD: 26_000,
  },
  {
    id: "nai-thon-quiet-09",
    title: "Дом в Nai Thon, 3 спальни, сдача 2026",
    cluster: "Nai Thon",
    // Сдача 2026 года — сдавать пока нечего
    offers: {
      sale: { priceUSD: 1_150_000 },
    },
    rentalLicensed: false,
    sleeps: 6,
    ownership: "leasehold",
    ownershipNote:
      "Зарегистрированная аренда земли на 30 лет, строение оформляется отдельно на покупателя.",
    bedrooms: 3,
    bathrooms: 3,
    landSizeSqm: 580,
    livingAreaSqm: 320,
    status: "off-plan",
    year: 2026,
    images: ["hero", "pool", "living", "plan"],
    imageCaptions: [
      "Рендер дома в рельефе участка",
      "Бассейн 8 м, терраса",
      "Гостиная-кухня, рендер",
      "Планировка участка и посадка дома",
    ],
    floorPlan: [
      { level: "Первый этаж", rooms: "Гостиная-кухня, спальня, санузел, бассейн, навес на 2 авто" },
      { level: "Второй этаж", rooms: "Мастер-спальня, спальня, 2 ванных, терраса" },
    ],
    nearby: [
      { place: "Nai Thon Beach", minutes: 5 },
      { place: "Аэропорт", minutes: 15 },
      { place: "Turtle Village / Mai Khao", minutes: 18 },
      { place: "Boat Avenue", minutes: 25 },
    ],
    summary:
      "Север острова, 15 минут до аэропорта и 5 до Nai Thon — одного из немногих пляжей, где в феврале ещё остаётся место на песке. Дом на 320 м² — компактный по меркам сегмента, поэтому в бюджет $1,15M здесь входит уединение, а не площадь. Сдача заявлена на IV квартал 2026 года.",
    dueDiligence: [
      "Проверен статус земли: часть соседних участков в зоне ограничений по высоте — уточнено, что дом в неё не попадает",
      "Разрешение на строительство получено, копия на руках",
      "У девелопера один сданный проект на острове, сдан в срок",
      "Плана по гостиничной лицензии у проекта нет — краткосрочная сдача здесь не планируется",
    ],
    tradeoff:
      "Инфраструктуры рядом почти нет: за нормальными продуктами — 20 минут в Thalang или Boat Avenue. Международные школы отсюда далеко, это не вариант для семьи со школьниками.",
    fitsJobs: ["second-home", "relocate"],
    annualCostsUSD: 8_500,
  },
  {
    id: "nai-harn-longterm-12",
    title: "Дом в Nai Harn для длительной аренды, 4 спальни",
    cluster: "Nai Harn",
    offers: {
      long: { monthlyHighUSD: 6_200, monthlyLowUSD: 4_100, minMonths: 6 },
    },
    rentalLicensed: false,
    sleeps: 8,
    ownership: "leasehold",
    ownershipNote: "Аренда напрямую у собственника, от 6 месяцев, договор на 1 год с продлением.",
    bedrooms: 4,
    bathrooms: 4,
    landSizeSqm: 820,
    livingAreaSqm: 340,
    status: "ready",
    year: 2020,
    images: ["hero", "pool", "living", "terrace"],
    imageCaptions: [
      "Дом с террасой, вид на холм",
      "Бассейн 10 м",
      "Гостиная с раздвижными дверями",
      "Обеденная зона на террасе",
    ],
    floorPlan: [
      { level: "Первый этаж", rooms: "Гостиная, кухня, 2 спальни, бассейн" },
      { level: "Второй этаж", rooms: "2 спальни, 2 ванных, рабочий кабинет" },
    ],
    nearby: [
      { place: "Nai Harn Beach", minutes: 7 },
      { place: "Rawai (рынки, кафе)", minutes: 8 },
      { place: "Chalong Pier", minutes: 15 },
      { place: "Phuket Town", minutes: 25 },
    ],
    summary:
      "Юг острова: за $6 200 в месяц здесь дают то, что на западном побережье стоит вдвое дороже. Плата за это — до BISP отсюда час в трафике, а «люкс-сигнал» района ниже, чем у Layan или Surin. Оптимальный вариант, чтобы прожить первый сезон и понять, нужен ли вам вообще запад.",
    dueDiligence: [
      "Право собственника сдавать проверено по документам",
      "Обслуживание бассейна и сада включено в ставку — прописано в договоре",
      "Проверено качество воды: стоит фильтрация, счёт за обслуживание на собственнике",
      "Скорость интернета замерена на месте: 500 Мбит/с",
    ],
    tradeoff:
      "Юг далеко от международных школ западного побережья. Если у вас дети в BISP или UWC — это ежедневные два часа за рулём, мы отговариваем.",
    fitsJobs: ["try-first", "relocate"],
  },
  {
    id: "surin-estate-rent-03",
    title: "Вилла в Surin для длительной аренды, 5 спален",
    cluster: "Surin",
    offers: {
      short: { nightlyUSD: 1_100, minNights: 4 },
      long: { monthlyHighUSD: 12_000, monthlyLowUSD: 7_800, minMonths: 1 },
    },
    rentalLicensed: true,
    sleeps: 10,
    ownership: "leasehold",
    ownershipNote:
      "Аренда у управляющей компании проекта, от 3 месяцев, ставка меняется по сезону — ноябрь–апрель дороже.",
    bedrooms: 5,
    bathrooms: 5,
    landSizeSqm: 1_100,
    livingAreaSqm: 560,
    status: "ready",
    year: 2022,
    images: ["hero", "pool", "living", "master", "view"],
    imageCaptions: [
      "Вилла с подъезда, вечерний свет",
      "Бассейн 16 м с видом на море",
      "Гостиная, открытая планировка",
      "Мастер-спальня с гардеробной",
      "Вид на Surin Beach с террасы",
    ],
    floorPlan: [
      { level: "Верхний уровень", rooms: "Гостиная, кухня, столовая, 1 спальня" },
      { level: "Уровень бассейна", rooms: "Мастер-спальня, 3 спальни, бассейн, sala" },
    ],
    nearby: [
      { place: "Surin Beach", minutes: 6 },
      { place: "Bang Tao / Boat Avenue", minutes: 12 },
      { place: "British International School (BISP)", minutes: 22 },
      { place: "Bangkok Hospital Phuket", minutes: 30 },
    ],
    summary:
      "Surin — исторически самый дорогой адрес западного побережья, и ставка это отражает: $12 000 в месяц в хай-сизон, ниже в мае–октябре. Проект с гостиничной лицензией и управляющей компанией, то есть сервис на уровне отеля с уборкой и охраной. Берут обычно на сезон те, кто сравнивает Surin с Kamala перед покупкой.",
    dueDiligence: [
      "Ставки по сезонам подтверждены прайсом управляющей компании",
      "Что входит в ставку: уборка 5 раз в неделю, сад, бассейн, охрана — прописано в договоре",
      "Гостиничная лицензия проекта действует",
      "Депозит и условия досрочного расторжения проверены",
    ],
    tradeoff:
      "Дорого. За те же деньги на юге острова снимается дом вдвое больше — вы платите за адрес и сервис, и это осознанное решение, а не «выгодная сделка».",
    fitsJobs: ["try-first", "second-home"],
  },
];

/* --- Помощники ------------------------------------------------------- */

/**
 * Проверка легальности набора предложений.
 *
 * Посуточная сдача (менее 30 дней) в Таиланде — гостиничная деятельность,
 * она требует лицензии по Hotel Act. Если объект без лицензии попадёт в
 * каталог с посуточной ставкой, сайт будет предлагать нарушение закона.
 * Поэтому падаем на старте, а не показываем это гостю.
 */
function assertOffersLegal(list: Villa[]): void {
  for (const v of list) {
    if (v.offers.short && !v.rentalLicensed) {
      throw new Error(
        `Вилла "${v.id}": посуточная ставка указана без гостиничной лицензии. ` +
          `Сдача менее чем на 30 дней без лицензии нарушает Hotel Act. ` +
          `Либо подтвердите лицензию (rentalLicensed: true), либо уберите offers.short.`,
      );
    }
    if (!v.offers.short && !v.offers.long && !v.offers.sale) {
      throw new Error(`Вилла "${v.id}": не указано ни одного предложения.`);
    }
  }
}

assertOffersLegal(villas);

export const getVilla = (id: string) => villas.find((v) => v.id === id);

/** Режимы, в которых объект доступен. Порядок — от аренды к продаже. */
export type Mode = "short" | "long" | "sale";

export const modeLabel: Record<Mode, string> = {
  short: "Посуточно",
  long: "Помесячно",
  sale: "Продажа",
};

export const modesOf = (v: Villa): Mode[] =>
  (["short", "long", "sale"] as Mode[]).filter((m) => Boolean(v.offers[m]));

export const isRentable = (v: Villa) => Boolean(v.offers.short || v.offers.long);

export const ownershipLabel: Record<Villa["ownership"], string> = {
  freehold: "Freehold",
  leasehold: "Leasehold, 30 лет",
  company: "Через тайскую компанию",
};

export const statusLabel: Record<Villa["status"], string> = {
  ready: "Готов",
  "off-plan": "Off-plan",
};

export const jobLabel: Record<Villa["fitsJobs"][number], string> = {
  holiday: "Отпуск на вилле",
  relocate: "Переезд с семьёй",
  invest: "Доходная аренда",
  "second-home": "Второй дом",
  "try-first": "Сезон перед покупкой",
};

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

/** Цена в одном конкретном режиме. */
export function priceIn(v: Villa, mode: Mode): string | null {
  if (mode === "short" && v.offers.short) return `${usd(v.offers.short.nightlyUSD)} / ночь`;
  if (mode === "long" && v.offers.long) return `${usd(v.offers.long.monthlyLowUSD)} / мес`;
  if (mode === "sale" && v.offers.sale) {
    const m = v.offers.sale.priceUSD / 1_000_000;
    return `$${m.toFixed(2).replace(/\.?0+$/, "")}M`;
  }
  return null;
}

/**
 * Что показать на карточке. Аренда первична, поэтому если объект и сдаётся,
 * и продаётся — в глаза бросается ставка аренды, а цена продажи идёт вторым.
 */
export function headlinePrice(v: Villa): { main: string; note?: string } {
  if (v.offers.short) {
    return {
      main: `${usd(v.offers.short.nightlyUSD)} / ночь`,
      note: v.offers.long ? `от ${usd(v.offers.long.monthlyLowUSD)} в месяц` : undefined,
    };
  }
  if (v.offers.long) {
    return {
      main: `${usd(v.offers.long.monthlyLowUSD)} / мес`,
      note: `в хай-сизон ${usd(v.offers.long.monthlyHighUSD)}`,
    };
  }
  const sale = priceIn(v, "sale");
  return { main: sale ?? "—", note: "продажа" };
}

/** Минимальная цена в режиме — для фильтра по бюджету. */
export function priceValue(v: Villa, mode: Mode): number | null {
  if (mode === "short") return v.offers.short?.nightlyUSD ?? null;
  if (mode === "long") return v.offers.long?.monthlyLowUSD ?? null;
  return v.offers.sale?.priceUSD ?? null;
}
