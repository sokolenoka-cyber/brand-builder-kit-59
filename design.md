# Design System — «Миссия на миллион»

Документ фиксирует **реально существующую** визуальную систему лендинга (источники: `src/styles.css`, `src/routes/__root.tsx`, `src/routes/index.tsx`, `src/components/ui/*`). Это правила, по которым уже сделан интерфейс — и которым должны следовать дальнейшие правки. Ничего не выдумано; всё, что требует решения, вынесено в §10 «Несоответствия».

---

## 0. Общее настроение и характер интерфейса

**Что транслирует интерфейс:**
- Тёплая женская премиальность: розово-фиолетовая аура, кремовый off-white фон, мягкие radial-градиенты (`bg-aurora`), стеклянные поверхности (`glass`).
- Авторский, кураторский тон: крупная дисплейная типографика `Syne` с отрицательным трекингом, ручные акценты градиентным текстом, спокойный ритм секций `py-24`.
- Эмоциональная экспертность, а не «корпорат»: круглые pill-CTA, мягкие тени с фиолетовым подтоном, фотопортрет в hero вместо иллюстрации.
- Доверие через воздух: много свободного пространства, узкие колонки текста (`max-w-3xl/4xl/5xl` в смысловых блоках).

**Запрещено:**
- Холодные синие/сине-серые палитры (включая дефолтную `.dark` тему shadcn — она в UI не активируется и считается dead code, см. §10.3).
- Жёсткие прямоугольники без радиуса, индустриальные/брутальные приёмы, неоновые/кислотные акценты.
- Хардкод цветов в классах (`text-white`, `bg-black`, `bg-[#...]`) — только семантические/брендовые токены.
- Дополнительные шрифты-семейства помимо `Syne` (display) и `Plus Jakarta Sans` (body). Сериф запрещён.
- Стоковые «AI-эстетика» решения: фиолетовые градиенты на белом по умолчанию, hero «как у всех». Любая новая секция должна попадать в текущую палитру и ритм.

---

## 1. Colors

Все значения — `oklch`, объявлены в `:root` в `src/styles.css`. Тёмная тема `.dark` объявлена, но не используется (§10.3).

### Поверхности и фон
| Назначение | Токен / utility | Значение |
|---|---|---|
| Основной фон страницы | `--background` / `bg-background` | `oklch(0.985 0.008 340)` — тёплый off-white с розоватым |
| Карточки, поповеры | `--card`, `--popover` / `bg-card` | `oklch(1 0 0)` — чистый белый |
| Muted-блоки | `--muted` / `bg-muted` | `oklch(0.96 0.02 340)` |
| Secondary-поверхность | `--secondary` / `bg-secondary` | `oklch(0.93 0.04 340)` — светло-розовый |
| Аура-фон секций | `@utility bg-aurora` | мульти-radial: `lavender + rose + violet-deep` на `blush` |
| Стеклянная поверхность | `@utility glass` | `white 65%` + `blur(14px)` + бордер с лавандой |

### Текст
| Назначение | Токен | Значение |
|---|---|---|
| Основной текст | `--foreground` / `text-foreground` | `oklch(0.22 0.06 295)` — тёмный фиолетово-баклажан |
| Второстепенный (lead, описания, ссылки) | `--muted-foreground` / `text-muted-foreground` | `oklch(0.48 0.06 300)` |
| Текст на акценте | `--primary-foreground` | `oklch(0.99 0.01 340)` — почти белый |
| Eyebrow / метка раздела | `text-violet-deep/70` | акцентный, полупрозрачный |

### Брендовые акценты
| Токен | Значение | Где используется |
|---|---|---|
| `--blush` | `oklch(0.95 0.025 350)` | базовый розоватый фон, основа `bg-aurora` |
| `--rose` | `oklch(0.87 0.06 350)` | hover-границы, выделение selected, нежные акценты |
| `--lavender` | `oklch(0.78 0.10 305)` | hover-границы карточек, фон чипов (`bg-lavender/20`) |
| `--violet-deep` | `oklch(0.52 0.16 300)` | **основной CTA-цвет**, заголовочные акценты, лого |

`--primary` равен `--violet-deep` (см. §10.4: один источник истины не выбран; в коде используется `bg-violet-deep`).

### Семантика статусов
| Статус | Источник | Правило |
|---|---|---|
| Success | `--violet-deep` + toast `sonner richColors` | отдельного зелёного нет; успех = брендовый violet + системный toast |
| Warning | **не определён** | при необходимости — обсудить, добавить токен (см. §10.5) |
| Error | `--destructive` `oklch(0.6 0.22 27)` (алый) | **только для текста ошибок и валидации форм** |
| Selected / выделение | `border-rose` + `ring-2 ring-rose/40` | бренд-акцент, **не путать с error** |

### Правила контраста и акцента
- На светлом `--background` и `bg-card` основной текст `--foreground` даёт контраст ≥ AA для body (≥ 4.5:1).
- Акцент `--violet-deep` всегда сопровождается белым текстом (`text-white` допустим **только** в составе брендового CTA на violet-deep фоне — см. §4 Buttons).
- На `bg-aurora` нельзя ставить `text-muted-foreground` без проверки — поверх градиента контраст падает; используем `text-foreground` или белый на тёмном CTA.
- `text-gradient` (violet-deep → lavender → rose) применять **только к акцентным словам** в крупных заголовках (`text-4xl+`), никогда к body — у него нет фиксированного контраста.
- Один акцентный цвет на блок: либо `violet-deep` (CTA), либо `rose` (selected/highlight). Не смешивать в одной интерактивной зоне.

---

## 2. Typography

**Шрифты грузятся `<link>`-тегом в `src/routes/__root.tsx`** (Google Fonts):
- **Display / заголовки**: `Syne` 500–800, токен `--font-display`, класс `font-display`, авто-применение к `h1–h6`. `letter-spacing: -0.02em`.
- **Body**: `Plus Jakarta Sans` 300–700, токен `--font-sans`, применён к `body`.

### Размерная шкала (реальная, из `src/routes/index.tsx`)
| Уровень | Desktop | Mobile (без префиксов) | Начертание / трекинг | Line-height |
|---|---|---|---|---|
| H1 (hero) | `text-7xl` (`lg:`) → `text-6xl` (`sm:`) | `text-5xl` | `font-display font-bold`, `tracking -0.02em` | `leading-[1.02]` |
| H2 секций | `text-5xl` (`sm:`) | `text-4xl` | `font-display font-bold` | `leading-tight` |
| H3 карточек | `text-2xl` (иногда `text-xl`, `text-3xl` в крупных карточках) | то же | `font-display font-bold` | по умолчанию |
| Lead-параграф | `text-lg` | `text-lg` | `font-sans`, `text-muted-foreground` | `leading-relaxed` |
| Body | `text-base` (`text-sm` в плотных списках) | то же | `font-sans regular` | `leading-relaxed` |
| Caption / подпись | `text-sm`, `text-xs` | то же | `font-sans`, обычно `text-muted-foreground` | по умолчанию |
| Eyebrow (метка раздела) | `text-xs` | `text-xs` | `uppercase`, `tracking-[0.3em]`, `font-semibold`, `text-violet-deep/70` | — |
| Цифра-маркер (`<dt>`) | `text-2xl` | `text-2xl` | `font-display font-bold text-violet-deep` | — |
| Цифра процесса (1–4) | `text-5xl` | `text-5xl` | `font-display font-bold text-gradient` | — |

### Правила
- Заголовки H1/H2 **всегда** `font-display` + `font-bold`. Никогда не использовать `Syne` для body.
- Body **всегда** `Plus Jakarta Sans`. Никогда не миксовать с `Syne` в параграфах.
- Адаптив: уменьшение через Tailwind-префиксы (`text-5xl sm:text-6xl lg:text-7xl`) — не вводим отдельные мобильные классы.
- `letter-spacing: -0.02em` применяется автоматически ко всем h1–h6 — повторно `tracking-tight` не нужен.
- Декоративный градиентный текст (`text-gradient`) — максимум 1–3 слова в заголовке, не для целых предложений.

---

## 3. Layout and spacing

### Контейнеры
- **Стандартный**: `mx-auto max-w-7xl px-5` — Header, Hero, Problem, Triggers, Method, Offer, Process, Testimonials, Footer.
- **Узкий смысловой**: `max-w-5xl` (CTA), `max-w-4xl` (FAQ), `max-w-3xl` (Invitation, длинный нарратив).
- Боковые отступы: `px-5` на всех брейкпоинтах (без увеличения на десктопе — это часть «спокойной» эстетики).

### Сетка
- Hero: `grid lg:grid-cols-2 gap-12 items-center` (на мобильном — один столбец).
- Карточки-проблемы / триггеры: `grid md:grid-cols-2 lg:grid-cols-3 gap-4`.
- Метод / уровни: `grid md:grid-cols-3 gap-6`.
- Процесс: `grid md:grid-cols-2 lg:grid-cols-4 gap-5`.
- Брейкпоинты — стандарт Tailwind (`sm 640`, `md 768`, `lg 1024`, `xl 1280`, `2xl 1536`).

### Шкала отступов (фактическая)
Используется подмножество дефолтной шкалы Tailwind, согласованное по ритму:
- Внутри карточки: `p-6` (стандарт), `p-8` (крупные карточки Method / Levels).
- Gap в сетках: `gap-4`, `gap-5`, `gap-6`, `gap-12` (hero).
- Между заголовком и текстом в блоке: `mb-4` / `mb-6` / `mb-8`.

### Вертикальный ритм между секциями
- **Стандарт**: `py-24` для всех секций ниже Hero.
- **Hero**: `pt-16 pb-24 lg:pt-24 lg:pb-32` (асимметрия — сверху воздуха меньше под sticky-хедер).
- Между подсекциями внутри одной секции — `mt-12` / `mt-16`.
- Не использовать `py-32+` или `py-12` для секций — выпадет из ритма.

---

## 4. Components

### Кнопки
Базовый компонент — `src/components/ui/button.tsx` (shadcn): варианты `default | destructive | outline | secondary | ghost | link`, размеры `default (h-9) | sm (h-8) | lg (h-10 px-8) | icon (h-9 w-9)`, дефолтный радиус `rounded-md`.

**Брендовые CTA** (переопределяют дефолты shadcn inline — см. §10.2 о выносе в variant):

| Роль | Классы | Где |
|---|---|---|
| Primary CTA | `rounded-full bg-violet-deep hover:bg-violet-deep/90 text-white px-7 h-12 text-base shadow-lg shadow-violet-deep/20` | Hero, секции, CTASection |
| Secondary outline | `rounded-full h-12 px-7 border-violet-deep/30 text-violet-deep hover:bg-lavender/20` | Hero, secondary actions |
| Header CTA | `rounded-full bg-violet-deep hover:bg-violet-deep/90 text-white px-5` | sticky header |
| Inverted (на светлом аура-фоне) | `rounded-full bg-foreground text-background px-6 py-3 font-semibold hover:opacity-90` | Triggers CTA |
| Submit формы | `w-full rounded-xl h-12 bg-violet-deep hover:bg-violet-deep/90 text-white text-base` | форма заявки |

**Состояния:**
- Hover: `hover:bg-violet-deep/90` (на брендовых), `hover:opacity-90` (на inverted), `hover:bg-lavender/20` (на outline).
- Focus: дефолтный shadcn `focus-visible:ring-1 focus-visible:ring-ring` (`--ring` = брендовый violet); см. §10.6 — нужно усилить до `ring-2`.
- Active: визуального override нет (используется браузерный + opacity при клике через `transition`).
- Disabled: `disabled:opacity-50 disabled:pointer-events-none` (shadcn-дефолт) + `cursor-not-allowed` на форме.
- Loading: текстовый swap внутри submit (например, «Отправляем…») + `disabled` атрибут — спиннер-иконки не используем.

### Карточки
Сосуществуют 5 паттернов (см. §10.8 о дублировании `Card`):
1. **Локальный `Card`** в `index.tsx`: `rounded-2xl bg-card border border-border/60 shadow-[0_8px_30px_-12px_rgba(155,114,207,0.25)]` — базовая.
2. **Интерактивная карточка** (problems / triggers / process): `rounded-2xl border border-border/60 bg-card p-6 hover:shadow-lg hover:border-lavender/60 transition` (или `hover:border-rose/60`).
3. **Крупная карточка** (Method, 3 уровня): `rounded-3xl bg-card border border-border/60 p-8 hover:-translate-y-1 transition-transform`.
4. **Градиентная рамка**: внешний `rounded-3xl bg-gradient-to-br from-violet-deep to-rose p-[1px]` + внутренний `rounded-3xl bg-card`.
5. **Стеклянный CTA-контейнер**: `rounded-[2rem] bg-card/80 backdrop-blur-xl border border-border/60`.

### Формы
- `Input` (shadcn override): `h-12 rounded-xl bg-background`.
- `Textarea`: `rounded-xl bg-background min-h-44`.
- Выбранный триггер (визуальный selected): `border-rose ring-2 ring-rose/40 shadow-lg` (на карточке) + selected-стейт блока `border-rose/40 bg-rose/5`.
- Error-сообщение под формой: `text-destructive text-sm`.
- Submit-loading: текстовый swap + `disabled`.

### Навигация и ссылки
- **Header**: `sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/60`.
- **Лого**: иконочный круг `rounded-full bg-gradient-to-br from-rose to-violet-deep text-white`.
- **Ссылки навигации**: `text-sm text-muted-foreground hover:text-foreground transition`.
- **Текстовые ссылки в контенте**: тот же паттерн (`text-muted-foreground → hover:text-foreground`), либо `text-violet-deep underline-offset-4 hover:underline` для акцентных.

### Badges / чипы
- **Eyebrow-чип**: `inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-violet-deep font-semibold`.
- **Иконочный чип в карточке**: `h-10 w-10 rounded-2xl bg-lavender/20 text-violet-deep grid place-items-center` (иконка lucide `h-5 w-5`).
- **Footer-социальные**: `h-9 w-9 rounded-full border border-border hover:bg-lavender/20`.

### Радиусы, границы, тени
- **Радиусы** (фактическая шкала): `rounded-md` (shadcn-дефолт — только legacy), `rounded-xl` (формы, submit), `rounded-2xl` (карточки), `rounded-3xl` (крупные карточки), `rounded-[2rem]` / `rounded-[2.5rem]` (CTA-герои), `rounded-full` (CTA / pill / лого / соц-иконки). См. §10.1 — закрепить систему.
- **Границы**: `border border-border/60` — стандарт всех карточек. Hover-граница: `hover:border-lavender/60` или `hover:border-rose/60`.
- **Тени**:
  - Карточка: `shadow-[0_8px_30px_-12px_rgba(155,114,207,0.25)]` (брендовая).
  - CTA: `shadow-lg shadow-violet-deep/20`.
  - Стеклянные CTA-блоки: `shadow-2xl shadow-violet-deep/10` / `shadow-2xl shadow-violet-deep/20`.
  - Никаких серых/нейтральных теней — все тени с violet-deep подтоном.

### Правила повторного использования
- Любую новую кнопку добавлять **поверх существующих 5 ролей** — не плодить новые цветовые комбинации.
- Любую новую карточку приводить к одному из 5 паттернов выше; если не подходит — обсудить расширение системы, а не локальный override.
- Запрещено хардкодить цвет/шрифт/радиус мимо токенов и установленной шкалы.
- Дублирующиеся блоки (CTA, заголовок секции, eyebrow-чип) — выносить в локальные компоненты внутри `index.tsx`, а не копировать разметку.

---

## 5. Imagery and icons

### Изображения
- Источники: локальные ассеты `src/assets/*.asset.json` (поле `.url`): `portrait.jpg`, `underwater.jpg`, `review1.png`, `review2.png`.
- **Стиль**: документальное фото-портретное, тёплая цветокоррекция с фиолетово-розовыми полутонами — согласовано с палитрой `bg-aurora`. Никаких 3D-рендеров, AI-аватарок, стоковых иллюстраций «людей в офисе».
- **Кадрирование**:
  - Hero portrait — `aspect-[3/4] object-cover`, `loading="eager"`, поверх — градиентный overlay `from-violet-deep/70` (тёмный угол под текст/кнопку).
  - About portrait — `aspect-[4/5] object-cover`, `loading="lazy"`.
  - Отзывы — квадратные/портретные аватары в карточках.
- **Обработка**: тёплый тон, лёгкий контраст; overlay в hero — обязателен поверх фото для читаемости текста.
- **Alt**: у всех `<img>` есть осмысленный `alt` — это часть стандарта, не опция.

### Иконки
- Источник: **только** `lucide-react`. В UI используются: `Sparkles, Brain, Wand2, Rocket, ArrowRight, Check, Quote, Instagram, Send, Mail, Target, Lightbulb, Calendar, Users`.
- **Размеры**: `h-4 w-4` (внутри кнопок/чипов), `h-5 w-5` (стандарт в карточках), `h-6 w-6` (крупные акценты).
- **Цвет**: наследуется от родителя (`text-violet-deep`, `text-foreground`, `text-muted-foreground`). Никогда не задавать иконке цвет, выпадающий из палитры.
- **Стиль**: тонкие штрихи lucide (по умолчанию `stroke-width=2`) — не миксовать с filled-иконками других библиотек.

---

## 6. Motion

### Характер и длительность
- Анимации **спокойные, медленные, бесконечные** на декоре; **быстрые и едва заметные** на интерактиве. Никаких резких bounce/elastic.
- `transition` / `transition-colors` — дефолтные ~150ms (Tailwind).
- `transition-transform duration-300` — для hover-сдвигов карточек.
- `animation: float-slow 7s ease-in-out infinite` — декоративный плавающий элемент в hero.

### Hover, переходы
- Карточки: `hover:shadow-lg` + `hover:-translate-y-1` (на крупных) + `hover:border-lavender/60` / `hover:border-rose/60`.
- Ссылки: только цветовой `transition` от `muted-foreground` к `foreground`.
- Кнопки: только цветовой/opacity transition; **не двигаем** CTA по hover.

### Появление при скролле
- Сейчас **не используется** (ни IntersectionObserver, ни scroll-driven). Если добавлять — короткие fade/translate-up (≤ 400ms), один раз, через `prefers-reduced-motion` гард.

### Reduced motion
- Глобального CSS-правила `@media (prefers-reduced-motion: reduce)` **сейчас нет** — это пробел. При добавлении любой новой анимации обязательно оборачивать:
  ```css
  @media (prefers-reduced-motion: reduce) {
    .animate-float { animation: none; }
  }
  ```
- `float-slow` и `shimmer` (§10.7 — не работает) тоже нужно заглушить под reduced-motion.

---

## 7. Responsive and accessibility

### Breakpoints и перестроение
- Используются стандартные Tailwind: `sm 640 / md 768 / lg 1024 / xl 1280`.
- Hero: `lg` — двухколоночный, ниже — стек.
- Сетки карточек: `md` — 2 колонки, `lg` — 3–4 колонки.
- Header: одна горизонтальная линия на всех ширинах (нет мобильного бургера сейчас — ссылки скрыты на мобильном через `hidden md:flex`).
- Шкала текста уменьшается через `text-5xl sm:text-6xl lg:text-7xl` — не вводим отдельные мобильные размеры.

### Интерактивные элементы
- **Минимальная высота — 44px** для всех тач-таргетов: кнопки `h-12` (48px) — выше минимума ✅. `Input` / `Textarea` — `h-12` / `min-h-44` ✅. Иконочные кнопки в социалках — `h-9 w-9` (36px) — **ниже 44px**, нужно поднять до `h-11 w-11` или добавить hit-area (см. §10).

### Контраст
- Цель — **WCAG AA минимум** (4.5:1 для body, 3:1 для крупного текста и UI-элементов).
- `--foreground` на `--background` — проходит AA ✅.
- `text-muted-foreground` на `--background` — на грани AA для body; **не использовать поверх `bg-aurora`** без проверки.
- `text-white` на `bg-violet-deep` — проходит AA ✅ (CTA).
- Любой новый цвет текста на цветном фоне — проверять через контраст-чекер до коммита.

### Focus для клавиатуры
- Базовый — shadcn `focus-visible:ring-1 focus-visible:ring-ring` (`--ring` = брендовый violet).
- Видимость — слабая, особенно на `bg-aurora`. **Стандарт проекта**: усилить до `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background` для всех интерактивных элементов (см. §10.6).
- Никогда не убирать `focus-visible` ради эстетики.

### Запрет горизонтального скролла
- `body` не должен иметь `overflow-x: hidden` как костыль — вместо этого:
  - Все декоративные absolutely-позиционированные элементы (плавающие фигуры, аура) — внутри родителя с `relative overflow-hidden`.
  - `bg-aurora` секции — `relative overflow-hidden`.
  - Marquee / бегущая строка — `overflow-hidden` на контейнере, контент `whitespace-nowrap`.
- Любая новая секция: проверять на мобильной ширине 320px, что нет горизонтального скролла.

---

## 8. Файлы, которые я изучил

- `src/styles.css` — токены, шрифты, утилиты `text-gradient`, `bg-aurora`, `glass`, keyframes.
- `src/routes/__root.tsx` — root layout, `<link>` шрифтов, мета, NotFound/Error.
- `src/routes/index.tsx` — весь лендинг и локальный `Card` + `submitForm`.
- `src/components/ui/button.tsx` — варианты и размеры.
- `src/components/ui/{input,textarea,card,sonner,...}.tsx` — стандартные shadcn.
- `src/assets/*.asset.json` — изображения.
- `components.json`, `src/lib/utils.ts` — конфиг shadcn, `cn`-хелпер.

---

## 9. Какие правила я зафиксировал

См. §0–7 выше. Ключевые:
- Палитра — `oklch`, фон тёплый off-white, акцент `violet-deep`, hover-границы `lavender/rose`.
- Шрифты — только `Syne` (display) + `Plus Jakarta Sans` (body).
- Контейнер — `max-w-7xl px-5`, ритм секций — `py-24`.
- Кнопки — 5 ролей, всегда rounded-full на CTA, `h-12`.
- Карточки — 5 паттернов (см. §4); тени всегда с violet-подтоном.
- Иконки — только `lucide-react`, наследуют цвет.
- Тач-таргет ≥ 44px, контраст ≥ AA, focus всегда видимый, никаких horizontal scroll.

---

## 10. Несоответствия — обсудить до изменений

1. **Радиусы.** Одновременно `rounded-md/xl/2xl/3xl/[2rem]/[2.5rem]/full` без единой системы. Шкала `--radius-*` в `@theme` объявлена, но почти не используется. Предложение: формы → `xl`, карточки → `2xl`, крупные карточки → `3xl`, CTA-«герои» → `[2rem]`, всё интерактивное pill → `full`. Убрать `rounded-md` (404/legacy).
2. **Брендовые CTA inline.** Primary/secondary/inverted/submit копируются классами в 5+ местах. Вынести в `variant: "brand" | "brandOutline" | "inverted"` в `buttonVariants` + `size: "cta"` (`h-12 px-7`).
3. **Тёмная тема `.dark`.** Стандартная shadcn-холодная палитра, несовместима с брендом, в UI не активна. Решить: удалить, переписать под бренд, или зафиксировать как dead-code с комментом.
4. **`--primary` ≡ `--violet-deep`.** Два источника истины. В коде везде `bg-violet-deep`. Выбрать один: либо все CTA — `bg-primary`, либо удалить `--primary` как алиас и оставить только бренд-токен.
5. **`rose` vs `destructive` для красного.** `border-rose` = selected/highlight, `text-destructive` = ошибки. Прямо зафиксировать в правиле и не мешать; добавить токен warning, если потребуется (сейчас нет).
6. **Focus-кольцо.** `ring-1` едва заметно. Поднять до `ring-2` + `ring-offset-2 ring-offset-background` глобально, в т.ч. на цветных фонах.
7. **`shimmer` keyframes не работают.** `@keyframes shimmer` анимирует `background-position`, но применён к flex-ряду Marquee. Переписать на `transform: translateX(-50%)` с дублированием контента, либо удалить иллюзию анимации.
8. **`Card` объявлен дважды.** Есть `src/components/ui/card.tsx` (shadcn) и локальный `Card` в `index.tsx` с другой тенью/радиусом. Унифицировать (расширить shadcn-вариант или удалить локальный).
9. **OG-метаданные.** В `__root.tsx` остаётся дефолтный `og:image` Lovable; в `index.tsx` мета частично перезаписаны. Зафиксировать leaf-level OG для лендинга (картинка, title, description).
10. **Минимум 44px тач-таргет.** Соц-иконки в футере `h-9 w-9` (36px) — ниже минимума. Поднять до `h-11 w-11` или добавить невидимый hit-area.
11. **Reduced motion.** Нет глобального гарда; `float-slow` всегда работает. Добавить `@media (prefers-reduced-motion: reduce)` блок.
12. **Иллюстративные «данные» в hero** («Снят блок — 82%») — это декор, не пользовательский прогресс. Зафиксировать в комменте/копи, чтобы не путать с реальной метрикой.
