# Design System — текущее состояние

Документ фиксирует реально существующую визуальную систему проекта «Миссия на миллион».
Ничего не придумано — только то, что уже есть в коде. Это база для дальнейшей работы.

---

## 1. Технологическая основа

- **Tailwind CSS v4** (`@import "tailwindcss"` в `src/styles.css`), CSS-first конфиг через `@theme inline`.
- **shadcn/ui** — компоненты в `src/components/ui/*` (Button, Input, Textarea, Card, Sonner и др.).
- **Шрифты** грузятся через `<link>` в `src/routes/__root.tsx` с Google Fonts: `Syne` (500–800), `Plus Jakarta Sans` (300–700).
- **Иконки** — `lucide-react` (`Sparkles, Brain, Wand2, Rocket, ArrowRight, Check, Quote, Instagram, Send, Mail, Target, Lightbulb, Calendar, Users`).
- **Toaster** — `sonner`, позиция `top-center`, `richColors`.

---

## 2. Цветовая палитра (oklch, `:root` в `src/styles.css`)

### Семантические токены (shadcn)
| Токен | Значение | Назначение |
|---|---|---|
| `--background` | `oklch(0.985 0.008 340)` | фон страницы (тёплый off-white с розоватым) |
| `--foreground` | `oklch(0.22 0.06 295)` | основной текст (тёмный фиолетово-баклажан) |
| `--card` / `--popover` | `oklch(1 0 0)` | белые поверхности |
| `--primary` | `oklch(0.52 0.16 300)` | насыщенный фиолетовый (= `--violet-deep`) |
| `--secondary` | `oklch(0.93 0.04 340)` | светло-розовый |
| `--muted` | `oklch(0.96 0.02 340)` | фон muted-блоков |
| `--muted-foreground` | `oklch(0.48 0.06 300)` | приглушённый текст |
| `--accent` | `oklch(0.78 0.10 310)` | сиренево-лавандовый |
| `--destructive` | `oklch(0.6 0.22 27)` | алый, для ошибок |
| `--border` | `oklch(0.9 0.03 320)` | тонкие границы |
| `--input` | `oklch(0.93 0.03 320)` | бордеры инпутов |
| `--ring` | `oklch(0.62 0.14 305)` | фокусное кольцо |

### Брендовые токены (кастом)
| Токен | Значение | Tailwind utility |
|---|---|---|
| `--blush` | `oklch(0.95 0.025 350)` | `bg-blush`, `text-blush` |
| `--rose` | `oklch(0.87 0.06 350)` | `bg-rose`, `text-rose` |
| `--lavender` | `oklch(0.78 0.10 305)` | `bg-lavender`, `text-lavender` |
| `--violet-deep` | `oklch(0.52 0.16 300)` | `bg-violet-deep`, `text-violet-deep` |

Тёмная тема (`.dark`) объявлена, но **в интерфейсе нигде не активируется** (нет тоггла, `<html>` без класса). Палитра `.dark` — стандартная shadcn-голубоватая и **визуально не согласована** с брендовой розово-фиолетовой палитрой `:root` (см. §10).

### Дополнительно
- `--chart-1…5`, `--sidebar-*` — стандартные shadcn, **в текущем UI не используются**.

---

## 3. Типографика

- **Display / заголовки**: `--font-display: "Syne"`. Класс `font-display` или любые `h1–h6` (через `@layer base` в `styles.css`). `letter-spacing: -0.02em`.
- **Body**: `--font-sans: "Plus Jakarta Sans"`. Применён к `body`.

### Реальная шкала (из `src/routes/index.tsx`)
| Контекст | Классы |
|---|---|
| H1 (hero) | `font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.02]` |
| H2 секций | `font-display text-4xl sm:text-5xl font-bold leading-tight` |
| H3 карточек/блоков | `font-display text-2xl font-bold` (иногда `text-xl`, `text-3xl`) |
| Lead-параграф hero | `text-lg text-muted-foreground leading-relaxed` |
| Body | дефолт + `leading-relaxed` |
| Метка раздела (eyebrow) | `text-xs uppercase tracking-[0.3em] text-violet-deep/70 font-semibold` |
| Цифра в `<dt>` | `font-display text-2xl font-bold text-violet-deep` |
| Капс в карточках процесса | `font-display text-5xl font-bold text-gradient` |

### Текстовые эффекты
- `@utility text-gradient` — `linear-gradient(120deg, violet-deep → lavender 60% → rose)`, используется на акцентных словах в H1/H2.

---

## 4. Лейаут и сетка

- **Контейнер**: `mx-auto max-w-7xl px-5` — единый паттерн для всех секций (Header, Hero, Problem, Triggers, Method, Offer, Process, Testimonials, Footer).
- **Узкий контейнер** для CTA / FAQ / Invitation: `max-w-5xl` / `max-w-4xl` / `max-w-3xl`.
- **Вертикальные отступы секций**: `py-24` (постоянно). Hero — `pt-16 pb-24 lg:pt-24 lg:pb-32`.
- **Сетки**:
  - Hero: `grid lg:grid-cols-2 gap-12 items-center`
  - Карточки проблем/триггеров: `grid md:grid-cols-2 lg:grid-cols-3 gap-4` / `md:grid-cols-2 gap-4`
  - Метод/уровни: `grid md:grid-cols-3 gap-6`
  - Процесс: `grid md:grid-cols-2 lg:grid-cols-4 gap-5`
- **Адаптивные брейкпоинты** используются `sm:`, `md:`, `lg:` — стандарт Tailwind.

---

## 5. Радиусы

- Базовый `--radius: 1rem` → шкала `--radius-sm/md/lg/xl/2xl/3xl/4xl`.
- В реальной разметке используется **в основном произвольно**:
  - Кнопки: `rounded-full` (брендовые), `rounded-xl` (форма), `rounded-md` (shadcn-дефолт в `__root.tsx`).
  - Карточки: `rounded-2xl`, `rounded-3xl`, `rounded-[2rem]`, `rounded-[2.5rem]`.
  - Инпуты: `rounded-xl`.
  - Иконочные «чипы»: `rounded-full`, `rounded-2xl`.
- **Несоответствие**: одновременно встречаются `rounded-md` (404/error), `rounded-xl`, `rounded-2xl`, `rounded-3xl`, `rounded-[2rem]` — без чёткой системы (см. §10).

---

## 6. Тени

- Кастомная: `shadow-[0_8px_30px_-12px_rgba(155,114,207,0.25)]` (компонент `Card` внутри `index.tsx`).
- Брендовые акценты: `shadow-lg shadow-violet-deep/20`, `shadow-2xl shadow-violet-deep/10`, `shadow-2xl shadow-violet-deep/20`, `shadow-xl shadow-violet-deep/10`.
- Дефолтные shadcn: `shadow`, `shadow-sm` (Button variants).

---

## 7. Кнопки

### shadcn Button (`src/components/ui/button.tsx`)
- Variants: `default | destructive | outline | secondary | ghost | link`
- Sizes: `default (h-9 px-4)`, `sm (h-8)`, `lg (h-10 px-8)`, `icon (h-9 w-9)`
- Дефолтный радиус: `rounded-md`
- Focus: `focus-visible:ring-1 focus-visible:ring-ring`
- Disabled: `disabled:opacity-50 disabled:cursor-not-allowed`

### Реальные CTA в лендинге (переопределяют дефолты shadcn)
- **Primary CTA**: `rounded-full bg-violet-deep hover:bg-violet-deep/90 text-white px-7 h-12 text-base shadow-lg shadow-violet-deep/20`
- **Secondary outline**: `rounded-full h-12 px-7 border-violet-deep/30 text-violet-deep hover:bg-lavender/20`
- **Хедер CTA**: `rounded-full bg-violet-deep hover:bg-violet-deep/90 text-white px-5`
- **Submit формы**: `w-full rounded-xl h-12 bg-violet-deep hover:bg-violet-deep/90 text-white text-base`
- **Тёмная кнопка в Triggers**: `rounded-full bg-foreground text-background px-6 py-3 font-semibold hover:opacity-90`

**Несоответствие**: брендовая кнопка живёт inline-классами поверх Button, а не как новый variant — её легко рассинхронизировать (см. §10).

---

## 8. Карточки, формы, навигация

### Карточки
Несколько паттернов сосуществуют:
1. Локальный `Card` (`index.tsx`): `rounded-2xl bg-card border border-border/60 shadow-[0_8px_30px_-12px_rgba(155,114,207,0.25)]`.
2. Карточки проблем/триггеров/процесса: `rounded-2xl border border-border/60 bg-card p-6` + `hover:shadow-lg hover:border-lavender/60 transition` (или `hover:border-rose/60`).
3. Карточки «Метод» и «3 уровня»: `rounded-3xl bg-card border border-border/60 p-8 hover:-translate-y-1 transition-transform`.
4. «Градиентная рамка»: внешний `rounded-3xl bg-gradient-to-br from-violet-deep to-rose p-[1px]` + внутренний `rounded-3xl bg-card`.
5. Стеклянный CTA-контейнер: `rounded-[2rem] bg-card/80 backdrop-blur-xl border border-border/60`.

### Формы
- `Input`: `h-12 rounded-xl bg-background` (переопределение shadcn).
- `Textarea`: `rounded-xl bg-background min-h-44`.
- Selected-триггер: `border-rose/40 bg-rose/5`.

### Навигация (Header)
- `sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/60`
- Лого: `rounded-full bg-gradient-to-br from-rose to-violet-deep text-white`
- Ссылки: `text-sm text-muted-foreground hover:text-foreground transition`

### Footer
- `border-t border-border/60 bg-background`, иконки: `h-9 w-9 rounded-full border border-border hover:bg-lavender/20`.

---

## 9. Состояния, эффекты, медиа

### Hover / Active / Focus
- Hover-цвет ссылок: `hover:text-foreground transition`.
- Hover карточек: `hover:shadow-lg`, `hover:-translate-y-1`, `hover:border-rose/60` / `hover:border-lavender/60`.
- Active триггер: `border-rose ring-2 ring-rose/40 shadow-lg`.
- Focus: только дефолтный shadcn `focus-visible:ring-1 focus-visible:ring-ring` — **нет кастомного focus-стиля под брендовый violet-deep/rose**.
- Disabled: только дефолт shadcn (`opacity-50`).
- Error: используется `text-destructive` под формой + красная `border-rose/40 bg-rose/5` для selected-блока (rose ≠ destructive, см. §10).

### Анимации (`styles.css`)
- `@keyframes float-slow` → `.animate-float` (7s ease-in-out infinite).
- `@keyframes shimmer` → используется как `animate-[shimmer_30s_linear_infinite]` для бегущей строки (но keyframes двигают `background-position`, а в Marquee применяются к flex-ряду — анимация по сути **не работает**, лента статична; см. §10).
- Tailwind transitions: `transition`, `transition-colors`, `transition-transform duration-300`.

### Утилиты-фоны
- `@utility bg-aurora` — мульти-radial-gradient (lavender + rose + violet-deep на blush). Используется в Hero, Triggers-CTA, Invitation, CTASection.
- `@utility glass` — `bg color-mix(white 65%)` + `backdrop-filter blur(14px)` + бордер. Используется на чипе в Hero.

### Изображения
- Локальные ассеты: `portrait.jpg`, `underwater.jpg`, `review1.png`, `review2.png` (через `*.asset.json`, поле `.url`).
- Hero portrait: `aspect-[3/4]`, `object-cover`, `loading="eager"`, поверх — градиент `from-violet-deep/70`.
- About portrait: `aspect-[4/5]`, `loading="lazy"`.
- Все `<img>` имеют осмысленный `alt`.

---

## 10. Несоответствия и вопросы для обсуждения

Это то, что стоит решить **до** правок дизайна:

1. **Радиусы.** Одновременно используются `rounded-md` (404/error/shadcn-дефолт), `rounded-xl` (формы/submit), `rounded-2xl` (карточки/локальный Card), `rounded-3xl` (Method), `rounded-[2rem]` / `rounded-[2.5rem]` (Invitation/CTA). Шкала `--radius-*` (sm…4xl) объявлена, но почти не используется. Зафиксировать систему: например, поля → `xl`, обычные карточки → `2xl`, крупные секционные блоки → `3xl`, диалоговые/CTA-«герои» → `[2rem]`. Решить, что делать с дефолтным `rounded-md` shadcn (Button) — оставить как есть или переопределить тему.
2. **Кнопки.** Брендовый primary CTA (`rounded-full bg-violet-deep …`) копируется inline в 5+ местах. Стоит вынести как `variant: "brand"` в `buttonVariants`, чтобы избежать рассинхрона. Аналогично — `outline` бренд-вариант и `submit` (rounded-xl) форма.
3. **Тёмная тема.** Палитра `.dark` в `styles.css` — стандартная shadcn (холодный сине-серый), несовместима с брендовыми `blush/rose/lavender/violet-deep`. Тёмный режим в UI не используется. Решить: убрать `.dark` блок, либо переписать его под бренд, либо оставить как dead code.
4. **`primary` ≡ `violet-deep`.** Семантический `--primary` и брендовый `--violet-deep` имеют одно и то же значение `oklch(0.52 0.16 300)`. В коде всегда используется `bg-violet-deep` (никогда `bg-primary`). Стоит выбрать один источник истины — иначе при изменении бренда придётся править оба.
5. **Состояния ошибок: `rose` vs `destructive`.** Для «выбранного триггера» используется `border-rose/40 bg-rose/5`, а текст ошибки формы — `text-destructive` (алый). Это два разных красных. Нужно решить: rose = брендовый акцент (всегда), destructive = строго ошибки.
6. **Focus-кольцо.** `--ring` объявлен брендовым (`oklch(0.62 0.14 305)`), но shadcn ставит `ring-1` — почти невидимо на цветных фонах. Стоит усилить (`ring-2`) и проверить контраст на `bg-aurora`.
7. **Marquee shimmer.** Класс `animate-[shimmer_30s_linear_infinite]` применён к flex-контейнеру, но `@keyframes shimmer` анимирует `background-position`. В результате бегущая строка не «бежит». Нужно решить: переписать keyframes под `transform: translateX` или убрать иллюзию анимации.
8. **`Card` объявлен дважды.** В проекте есть `src/components/ui/card.tsx` (shadcn) и локальная функция `Card` внутри `src/routes/index.tsx` с другими стилями (тенью и радиусом). Это путает — стоит унифицировать.
9. **OG-метаданные.** В корне (`__root.tsx`) лежит дефолтный `og:image` для «Lovable App», а в `index.tsx` метатеги перезаписывают только часть. Нужно решить, какой OG используется для лендинга (см. правило: og:image только на leaf-роутах).
10. **Иконки в hero — несвязанные данные.** Карточка «Снят блок синдром самозванца — 82%» — статический декор. Это окей для лендинга, но стоит явно зафиксировать, что это **иллюстрация**, а не реальный прогресс пользователя.

---

## 11. Что я изучил

- `src/styles.css` — токены темы, фонты, утилиты `text-gradient`, `bg-aurora`, `glass`, keyframes.
- `src/routes/__root.tsx` — root layout, шрифты, мета, NotFound и Error компоненты.
- `src/routes/index.tsx` — весь лендинг (Header, Hero, Marquee, Problem, Triggers, Method, About, Offer, Invitation, Process, Testimonials, FAQ, CTASection, Footer + локальный `Card` + `submitForm`).
- `src/components/ui/button.tsx` — варианты и размеры shadcn Button.
- `src/components/ui/*` (Input, Textarea, Card, Sonner и др.) — стандартные shadcn, упомянуты по факту использования.
- `src/assets/*.asset.json` — список используемых изображений.
- `components.json`, `src/lib/utils.ts` — конфиг shadcn и `cn`-хелпер.
