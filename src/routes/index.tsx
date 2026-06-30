import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { Sparkles, Brain, Wand2, Rocket, ArrowRight, Check, Quote, Instagram, Send, Mail, Target, Lightbulb, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import portrait from "@/assets/portrait.jpg.asset.json";
import underwater from "@/assets/underwater.jpg.asset.json";
import review1 from "@/assets/review1.png.asset.json";
import review2 from "@/assets/review2.png.asset.json";

const SITE = {
  brand: "Миссия на миллион",
  tagline: "Упаковка эксперта через ИИ + работа с подсознанием",
  cta: "Записаться на разбор",
  email: "hello@missionmillion.ai",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE.brand,
  description:
    "Упаковка экспертов и бизнеса через искусственный интеллект и глубинная работа с подсознательными блоками для проявления и роста.",
  areaServed: "Worldwide",
  serviceType: ["AI-упаковка эксперта", "Работа с блоками проявления", "Личный бренд"],
  offers: { "@type": "Offer", availability: "https://schema.org/InStock" },
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Миссия на миллион — Упаковка эксперта через ИИ и работа с блоками" },
      {
        name: "description",
        content:
          "Соединяем силу ИИ и работу с подсознанием: упакуем твою экспертность, снимем блоки проявления и откроем путь к реализации на новом уровне.",
      },
      { property: "og:title", content: "Миссия на миллион — ИИ-упаковка эксперта" },
      {
        property: "og:description",
        content: "ИИ-упаковка бизнеса и эксперта + проработка подсознательных тормозов развития.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#f8e8ee" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(jsonLd),
      },
    ],
  }),
  component: Landing,
});

export type TriggerKey =
  | "visibility"
  | "loud"
  | "price"
  | "launch"
  | "real-self"
  | "money"
  | "perfectionism"
  | "mission";

export const TRIGGERS: {
  key: TriggerKey;
  ready: string;
  trigger: string;
  questions: string[];
}[] = [
  {
    key: "visibility",
    ready: "Готова проявляться",
    trigger: "а вдруг скажут «куда ты лезешь, ты же ещё не дотянула»",
    questions: [
      "Где сейчас ты «прячешься»: блог, оффер, голос, цена?",
      "Чей голос звучит в голове, когда ты хочешь показаться?",
      "Что бы ты сделала на этой неделе, если бы точно знала, что не осудят?",
    ],
  },
  {
    key: "loud",
    ready: "Готова заявить о себе громко",
    trigger: "и тут же — «будут осуждать, потеряю своих»",
    questions: [
      "О чём именно ты хочешь заявить — какая тема просится наружу?",
      "Кого ты боишься потерять, если станешь громче?",
      "Какая аудитория должна тебя услышать вместо этой?",
    ],
  },
  {
    key: "price",
    ready: "Готова брать высокий чек",
    trigger: "но внутри — «я недостаточно, у других круче»",
    questions: [
      "Какой чек ты сейчас берёшь и какой хочешь?",
      "С кем ты себя сравниваешь и обесцениваешься?",
      "За какой результат клиента ты реально отвечаешь?",
    ],
  },
  {
    key: "launch",
    ready: "Готова запустить свой проект",
    trigger: "а в голове — «сначала ещё один курс, ещё один диплом»",
    questions: [
      "Что за проект ты хочешь запустить — опиши в одном предложении.",
      "Каких знаний / регалий тебе якобы «не хватает»?",
      "Что мешает стартовать с тем, что уже есть?",
    ],
  },
  {
    key: "real-self",
    ready: "Готова показать настоящую себя",
    trigger: "и сразу — «а что подумает мама / муж / подписчики»",
    questions: [
      "Какая «настоящая ты» сейчас спрятана?",
      "Чьё мнение весит больше всего и почему?",
      "Что изменится в твоём проекте, если ты перестанешь подстраиваться?",
    ],
  },
  {
    key: "money",
    ready: "Готова к большим деньгам",
    trigger: "но тело сжимается: «с деньгами приходит ответственность, я не вывезу»",
    questions: [
      "Какая сумма дохода тебя пугает / окрыляет?",
      "Что для тебя «ответственность за большие деньги»?",
      "Какой опыт с деньгами в роду / детстве сейчас всплывает?",
    ],
  },
  {
    key: "perfectionism",
    ready: "Готова быть видимой",
    trigger: "и тут — «лучше ещё подготовлюсь, дошлифую, потом»",
    questions: [
      "Что ты «дошлифовываешь» уже больше 3 месяцев?",
      "Какой минимально достаточный шаг ты можешь сделать на этой неделе?",
      "От чего тебя на самом деле защищает перфекционизм?",
    ],
  },
  {
    key: "mission",
    ready: "Готова к своей миссии",
    trigger: "а внутри страх: «а вдруг получится — и придётся менять всю жизнь»",
    questions: [
      "Как ты сейчас чувствуешь свою миссию — одной фразой.",
      "Что в твоей жизни придётся пересобрать, если миссия раскроется?",
      "Что для тебя «получилось» — как выглядит этот сценарий?",
    ],
  },
];

function Landing() {
  const [selectedTrigger, setSelectedTrigger] = useState<TriggerKey | null>(null);
  const handlePick = (key: TriggerKey) => {
    setSelectedTrigger(key);
    setTimeout(() => {
      document.getElementById("cta")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Problem />
        <Triggers onPick={handlePick} selected={selectedTrigger} />
        <Method />
        <About />
        <Offer />
        <Invitation />
        <Process />
        <Testimonials />
        <FAQ />
        <CTASection selected={selectedTrigger} onClear={() => setSelectedTrigger(null)} />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/60">
      <div className="mx-auto max-w-7xl px-5 py-4 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 font-display text-lg font-bold">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-rose to-violet-deep text-white">
            <Sparkles className="h-4 w-4" />
          </span>
          {SITE.brand}
        </a>
        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          <a href="#method" className="hover:text-foreground transition">Метод</a>
          <a href="#offer" className="hover:text-foreground transition">Программа</a>
          <a href="#process" className="hover:text-foreground transition">Как идём</a>
          <a href="#faq" className="hover:text-foreground transition">FAQ</a>
        </nav>
        <Button asChild className="rounded-full bg-violet-deep hover:bg-violet-deep/90 text-white px-5">
          <a href="#cta">{SITE.cta}</a>
        </Button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative bg-aurora">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-10 h-80 w-80 rounded-full bg-rose/40 blur-3xl animate-float" />
        <div className="absolute top-40 right-0 h-96 w-96 rounded-full bg-lavender/40 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pt-16 pb-24 lg:pt-24 lg:pb-32 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-violet-deep">
            <Sparkles className="h-3.5 w-3.5" /> ИИ + работа с блоками
          </span>
          <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.02]">
            Упакуй эксперта. <span className="text-gradient">Прояви</span> миссию.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Собираем визуал, оффер и позиционирование через нейросети — и снимаем внутренние тормоза, чтобы выйти в свет.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full bg-violet-deep hover:bg-violet-deep/90 text-white px-7 h-12 text-base shadow-lg shadow-violet-deep/20">
              <a href="#cta">{SITE.cta} <ArrowRight className="ml-2 h-4 w-4" /></a>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full h-12 px-7 border-violet-deep/30 text-violet-deep hover:bg-lavender/20">
              <a href="#offer">Смотреть программу</a>
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap gap-6 text-sm text-muted-foreground">
            {[
              "7 дней до новой упаковки",
              "2 в 1: ИИ + психика",
              "Сопровождение 1:1",
            ].map((t) => (
              <span key={t} className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-deep" />
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-rose/20 via-lavender/30 to-violet-deep/10 blur-2xl" />
          <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-violet-deep/10 aspect-[3/4]">
            <img
              src={portrait.url}
              alt="Анна Прыткова — основатель «Миссия на миллион»"
              className="absolute inset-0 h-full w-full object-cover"
              loading="eager"
            />
          </div>
          <div className="mt-5 flex items-center gap-3">
            <div className="h-12 w-12 rounded-full overflow-hidden border border-border/60">
              <img src={portrait.url} alt="" className="h-full w-full object-cover" />
            </div>
            <div>
              <p className="font-display text-base font-bold text-foreground">Анна Прыткова</p>
              <p className="text-xs text-muted-foreground">Основатель «Миссия на миллион»</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div
      style={style}
      className={`rounded-2xl bg-card border border-border/60 shadow-[0_8px_30px_-12px_rgba(155,114,207,0.25)] ${className}`}
    >
      {children}
    </div>
  );
}

function Marquee() {
  const items = ["AI-упаковка", "Личный бренд", "Снятие блоков", "Денежное мышление", "Миссия", "Проявленность", "ИИ-контент", "Голос эксперта"];
  return (
    <div className="border-y border-border/60 bg-blush/40 py-4 overflow-hidden">
      <div className="flex gap-10 animate-[shimmer_30s_linear_infinite] whitespace-nowrap">
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className="font-display text-sm uppercase tracking-[0.25em] text-violet-deep/70">
            ✦ {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function Problem() {
  const blocks = [
    "Знаю, что классный эксперт — но не могу донести это словами",
    "Делаю много, а денег и клиентов мало",
    "Боюсь показывать себя: «а вдруг осудят»",
    "Сравниваю себя с другими и обесцениваю",
    "Тяну с запуском месяцами — что-то внутри тормозит",
    "Хочу красиво упаковать, но не понимаю, с чего начать",
  ];
  return (
    <section className="mx-auto max-w-7xl px-5 py-24">
      <div className="max-w-3xl">
        <span className="text-xs uppercase tracking-[0.3em] text-violet-deep/70 font-semibold">Если узнаёшь себя</span>
        <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold leading-tight">
          Дело не в стратегии. Дело в <span className="text-gradient">том, что внутри</span> ещё не разрешено.
        </h2>
      </div>
      <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blocks.map((b) => (
          <div key={b} className="rounded-2xl border border-border/60 bg-card p-6 hover:shadow-lg hover:border-lavender/60 transition">
            <Quote className="h-5 w-5 text-rose" />
            <p className="mt-3 text-foreground/90 leading-relaxed">«{b}»</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Triggers({
  onPick,
  selected,
}: {
  onPick: (key: TriggerKey) => void;
  selected: TriggerKey | null;
}) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24">
      <div className="max-w-3xl">
        <span className="text-xs uppercase tracking-[0.3em] text-violet-deep/70 font-semibold">Метод: найди свой стоп-кран</span>
        <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold leading-tight">
          «Готова… <span className="text-gradient">НО</span> — и тут триггер, который тормозит»
        </h2>
        <p className="mt-5 text-lg text-foreground/70 leading-relaxed">
          Выбери фразу, которая откликается больше всего — она поедет с тобой в форму заявки,
          и мы разберём именно её на встрече.
        </p>
      </div>
      <div className="mt-12 grid md:grid-cols-2 gap-4">
        {TRIGGERS.map((p) => {
          const isActive = selected === p.key;
          return (
            <button
              key={p.key}
              type="button"
              onClick={() => onPick(p.key)}
              className={`group text-left rounded-2xl border bg-card p-6 transition hover:shadow-lg ${
                isActive
                  ? "border-rose ring-2 ring-rose/40 shadow-lg"
                  : "border-border/60 hover:border-rose/60"
              }`}
            >
              <div className="flex items-start gap-3">
                <Check className={`h-5 w-5 mt-1 shrink-0 ${isActive ? "text-rose" : "text-violet-deep"}`} />
                <p className="font-display text-lg font-semibold text-foreground">{p.ready}</p>
              </div>
              <div className="mt-3 ml-8 flex items-start gap-2">
                <span className="text-rose font-bold text-sm tracking-widest">НО</span>
                <p className="text-foreground/75 leading-relaxed italic">{p.trigger}</p>
              </div>
              <div className="mt-4 ml-8 text-xs font-semibold uppercase tracking-[0.2em] text-violet-deep/70">
                {isActive ? "Выбрано → в форме заявки" : "Выбрать этот триггер →"}
              </div>
            </button>
          );
        })}
      </div>
      <div className="mt-10 rounded-3xl bg-aurora p-8 sm:p-10 text-center">
        <p className="font-display text-xl sm:text-2xl font-semibold max-w-3xl mx-auto leading-snug">
          То, что тебя останавливает — и есть точка, в которой рождается прорыв.
          На разборе мы достаём именно <span className="text-gradient">твоё «НО»</span> и переписываем его.
        </p>
        <button
          type="button"
          onClick={() => {
            const target = selected ?? TRIGGERS[0].key;
            onPick(target);
          }}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 font-semibold hover:opacity-90 transition"
        >
          {selected
            ? `Отправить «${TRIGGERS.find((t) => t.key === selected)?.ready}» в форму`
            : "Найти свой триггер"}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}


function Method() {
  const pillars = [
    {
      icon: Wand2,
      title: "AI-упаковка",
      desc: "Через нейросети собираем твою миссию, оффер, голос и визуал — за дни, а не месяцы.",
    },
    {
      icon: Brain,
      title: "Работа с подсознанием",
      desc: "Снимаем блоки проявления, страх денег, синдром самозванца — мягко и глубоко.",
    },
    {
      icon: Rocket,
      title: "Реализация себя",
      desc: "Готовая упаковка + внутреннее «да» = ты выходишь и наконец-то проявляешься.",
    },
  ];
  return (
    <section id="method" className="bg-gradient-to-b from-background to-blush/40 py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] text-violet-deep/70 font-semibold">Метод</span>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold">
            Три опоры, которые наконец <span className="text-gradient">сдвигают с места</span>
          </h2>
        </div>
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {pillars.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="group relative rounded-3xl bg-card border border-border/60 p-8 hover:-translate-y-1 transition-transform duration-300">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-rose/0 to-lavender/0 group-hover:from-rose/10 group-hover:to-lavender/20 transition" />
              <div className="relative">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-rose to-violet-deep text-white shadow-lg shadow-violet-deep/20">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 font-display text-2xl font-bold">{title}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Offer() {
  const forWho = [
    "У вас есть идея проекта, курса, практики, блога или бизнеса, но вы не знаете, с чего начать.",
    "Вы давно откладываете запуск и постоянно готовитесь.",
    "Вам сложно понять свою уникальность и ценность.",
    "Есть страх проявляться и заявлять о себе.",
    "Вы хотите использовать современные возможности ИИ для ускорения работы и роста.",
    "Вы чувствуете, что способны на большее, но пока не реализуете свой потенциал.",
  ];

  const results = [
    "Четкое понимание своей идеи и направления развития.",
    "Упакованная концепция проекта или экспертности.",
    "Позиционирование и уникальное сообщение для аудитории.",
    "План действий на ближайшие 90 дней.",
    "Контент-стратегия и идеи для проявления.",
    "Подобранные ИИ-инструменты под ваш проект.",
    "Снятие основных внутренних ограничений, мешающих действовать.",
    "Первые реальные шаги по запуску проекта.",
  ];

  const levels = [
    { icon: Brain, title: "Мышление и внутренние ограничения", desc: "Снимаем блоки проявления, страх денег, синдром самозванца — мягко и глубоко." },
    { icon: Wand2, title: "Упаковка идеи и позиционирование", desc: "Через нейросети собираем миссию, оффер, голос и визуал — за дни, а не месяцы." },
    { icon: Rocket, title: "Реализация через современные инструменты и ИИ", desc: "Готовая упаковка + внутреннее «да» = ты выходишь и наконец-то проявляешься." },
  ];

  return (
    <section id="offer" className="mx-auto max-w-7xl px-5 py-24">
      <div className="max-w-3xl mx-auto text-center">
        <span className="text-xs uppercase tracking-[0.3em] text-violet-deep/70 font-semibold">Программа</span>
        <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold leading-tight">
          «От идеи до реализации»
        </h2>
        <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
          Для экспертов, специалистов, консультантов, авторов проектов и творческих людей, которые чувствуют в себе потенциал для большего, но не могут превратить свою идею в реальный проект.
        </p>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          За 6 недель мы пройдем путь от хаоса в голове до понятной концепции, упаковки и первых шагов реализации.
        </p>
      </div>

      <div className="mt-16 grid lg:grid-cols-2 gap-10">
        <div className="rounded-3xl bg-gradient-to-br from-violet-deep to-rose p-[1px]">
          <div className="rounded-3xl bg-card p-8 sm:p-10 h-full">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-lavender/40 text-violet-deep mb-5">
              <Users className="h-5 w-5" />
            </div>
            <h3 className="font-display text-2xl font-bold">Для кого программа</h3>
            <ul className="mt-6 space-y-4">
              {forWho.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose/20 text-rose">
                    <span className="text-xs">•</span>
                  </span>
                  <span className="text-foreground/90 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-rose to-violet-deep p-[1px]">
          <div className="rounded-3xl bg-card p-8 sm:p-10 h-full">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-lavender/40 text-violet-deep mb-5">
              <Target className="h-5 w-5" />
            </div>
            <h3 className="font-display text-2xl font-bold">Что будет результатом через 6 недель</h3>
            <ul className="mt-6 space-y-4">
              {results.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-lavender/40 text-violet-deep">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-foreground/90 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h3 className="font-display text-2xl sm:text-3xl font-bold text-center">
          Мы будем работать сразу на <span className="text-gradient">трех уровнях</span>
        </h3>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {levels.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="group relative rounded-3xl bg-card border border-border/60 p-8 hover:-translate-y-1 transition-transform duration-300">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-rose/0 to-lavender/0 group-hover:from-rose/10 group-hover:to-lavender/20 transition" />
              <div className="relative">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-rose to-violet-deep text-white shadow-lg shadow-violet-deep/20">
                  <Icon className="h-6 w-6" />
                </div>
                <h4 className="mt-6 font-display text-xl font-bold">{title}</h4>
                <p className="mt-3 text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Это не просто обучение. Это пространство, где идея перестает быть мечтой и становится реальным проектом.
        </p>
      </div>
    </section>
  );
}

function Invitation() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-aurora" />
      <div className="relative mx-auto max-w-4xl px-5 py-20">
        <div className="rounded-[2rem] bg-gradient-to-br from-violet-deep to-rose p-[1px] shadow-2xl shadow-violet-deep/10">
          <div className="rounded-[2rem] bg-card/95 backdrop-blur-xl p-8 sm:p-14 text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-lavender/40 text-violet-deep mb-6">
              <Lightbulb className="h-6 w-6" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold leading-tight">
              Ищу 5 человек
            </h2>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              У которых есть идея проекта, блога, практики или продукта, но они не могут начать. Хочу провести пилотную группу и помочь пройти путь от идеи к первым действиям.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="rounded-full bg-violet-deep hover:bg-violet-deep/90 text-white px-7 h-12 text-base shadow-lg shadow-violet-deep/20">
                <a href="#cta">Хочу в пилотную группу <ArrowRight className="ml-2 h-4 w-4" /></a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    { n: "01", t: "Бесплатный разбор", d: "30 минут на zoom — смотрим точку А, миссию и точные блоки." },
    { n: "02", t: "AI-распаковка", d: "Собираем суть, оффер и визуал через нейросети под твою энергию." },
    { n: "03", t: "Снятие блоков", d: "Глубинные сессии с подсознанием: страх денег, осуждения, проявления." },
    { n: "04", t: "Выход в мир", d: "Запуск упаковки, контент-план, первые продажи и стабильное «я в потоке»." },
  ];
  return (
    <section id="process" className="bg-blush/40 py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.3em] text-violet-deep/70 font-semibold">Как идём</span>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold">Путь от «застряла» до «проявлена»</h2>
        </div>
        <ol className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s) => (
            <li key={s.n} className="relative rounded-2xl bg-card border border-border/60 p-6">
              <span className="font-display text-5xl font-bold text-gradient">{s.n}</span>
              <h3 className="mt-3 font-display text-xl font-bold">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Testimonials() {
  const t = [
    { n: "Анна, психолог", q: "За 3 недели собрала упаковку, на которую копила полгода в голове. И впервые подняла чек без вины." },
    { n: "Марина, коуч", q: "Снялся ком в горле перед камерой. Стала вести блог легко — пришли первые 4 клиента." },
    { n: "Юлия, методолог", q: "ИИ + работа с блоками — это магия. Будто меня собрали обратно и показали миру по-настоящему." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-5 py-24">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-[0.3em] text-violet-deep/70 font-semibold">Отзывы</span>
        <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold">Женщины, которые уже проявились</h2>
      </div>
      <div className="mt-12 grid md:grid-cols-3 gap-6">
        {t.map((x) => (
          <figure key={x.n} className="rounded-3xl bg-gradient-to-br from-blush to-lavender/40 p-[1px]">
            <div className="rounded-3xl bg-card p-7 h-full">
              <Quote className="h-6 w-6 text-violet-deep" />
              <blockquote className="mt-4 text-foreground/90 leading-relaxed">«{x.q}»</blockquote>
              <figcaption className="mt-5 font-display font-semibold text-violet-deep">{x.n}</figcaption>
            </div>
          </figure>
        ))}
      </div>

      <div className="mt-10 grid sm:grid-cols-2 gap-6">
        {[review1, review2].map((r, i) => (
          <figure key={i} className="rounded-3xl bg-gradient-to-br from-lavender/40 to-rose/40 p-[1px] shadow-xl shadow-violet-deep/10">
            <div className="rounded-3xl bg-card p-4 sm:p-6">
              <img
                src={r.url}
                alt={`Скриншот отзыва клиента ${i + 1}`}
                className="w-full h-auto rounded-2xl"
                loading="lazy"
              />
              <figcaption className="mt-3 text-xs text-muted-foreground text-center">
                Живой отзыв из Telegram
              </figcaption>
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-5 py-24">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-lavender/40 via-rose/20 to-violet-deep/30 blur-2xl" />
          <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] shadow-2xl shadow-violet-deep/20">
            <img
              src={underwater.url}
              alt="Глубина внутренней работы — портрет под водой"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-violet-deep/70 font-semibold">Обо мне</span>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold leading-tight">
            Я знаю, каково это — <span className="text-gradient">быть невидимкой</span> со своим даром
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Я провожу женщин и экспертов из «тихого знания, что я классная» — в проявленность, где про тебя
            узнают, к тебе идут и платят. Совмещаю инструменты ИИ и глубинную работу с подсознанием —
            потому что одно без другого не работает.
          </p>
          <ul className="mt-6 space-y-3 text-foreground/90">
            {[
              "7+ лет в теме личного бренда и проявленности",
              "Сотни упакованных экспертов и предпринимателей",
              "Авторский метод: ИИ × психика × миссия",
            ].map((x) => (
              <li key={x} className="flex gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-lavender/40 text-violet-deep">
                  <Check className="h-3.5 w-3.5" />
                </span>
                {x}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    { q: "Я совсем не дружу с ИИ — справлюсь?", a: "Да. Всю техническую часть с нейросетями я беру на себя, тебе остаётся только проявлять смыслы." },
    { q: "Чем это отличается от обычной упаковки?", a: "Обычная упаковка — про красивую обёртку. Здесь параллельно снимаем то, что внутри мешает её показывать." },
    { q: "Это эзотерика?", a: "Нет. Это бережная работа с подсознанием, страхами и убеждениями — в связке с современными ИИ-инструментами." },
    { q: "Сколько стоит и как оплатить?", a: "Цены и форматы обсуждаем на бесплатном разборе — подбираем под твою точку А и цели." },
  ];
  return (
    <section id="faq" className="bg-blush/40 py-24">
      <div className="mx-auto max-w-3xl px-5">
        <h2 className="font-display text-4xl sm:text-5xl font-bold text-center">Частые вопросы</h2>
        <div className="mt-10 space-y-3">
          {items.map((i, idx) => <FAQItem key={idx} {...i} />)}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl bg-card border border-border/60 overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-display text-lg font-semibold">{q}</span>
        <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full bg-lavender/30 text-violet-deep transition ${open ? "rotate-45" : ""}`}>+</span>
      </button>
      {open && <div className="px-6 pb-6 text-muted-foreground leading-relaxed">{a}</div>}
    </div>
  );
}

function submitForm({
  name,
  email,
  msg,
  trigger,
}: {
  name: string;
  email: string;
  msg: string;
  trigger: (typeof TRIGGERS)[number] | null;
}) {
  const payload = {
    name,
    email,
    msg,
    trigger_key: trigger?.key ?? "",
    trigger_label: trigger?.ready ?? "",
    trigger_questions: trigger?.questions ?? [],
  };
  // TODO: заменить на реальный endpoint (Telegram, Email, Supabase и т.д.)
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      // Симуляция случайной ошибки сети (~10%)
      if (Math.random() < 0.1) {
        reject(new Error("Ошибка сети. Проверь соединение и попробуй снова."));
      } else {
        resolve();
      }
    }, 800);
  });
}

function CTASection({
  selected,
  onClear,
}: {
  selected: TriggerKey | null;
  onClear: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const lastTriggerRef = useRef<TriggerKey | null>(null);

  const trigger = selected ? TRIGGERS.find((t) => t.key === selected) ?? null : null;

  const buildPrefill = (t: typeof trigger) =>
    t
      ? `Мой триггер: «${t.ready} — НО ${t.trigger}».\n\nОтветы на вопросы:\n${t.questions
          .map((q, i) => `${i + 1}. ${q}\n— `)
          .join("\n")}`
      : "";

  // Re-prefill the textarea when the user picks a new trigger,
  // but don't wipe their custom text if the trigger hasn't changed.
  useEffect(() => {
    if (lastTriggerRef.current !== selected) {
      lastTriggerRef.current = selected;
      setMsg(buildPrefill(trigger));
    }
  }, [selected, trigger]);
  return (
    <section id="cta" className="relative overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 bg-aurora" />
      <div className="relative mx-auto max-w-5xl px-5 py-24">
        <div className="rounded-[2rem] bg-card/80 backdrop-blur-xl border border-border/60 p-8 sm:p-14 shadow-2xl shadow-violet-deep/10">
          <div className="grid lg:grid-cols-2 gap-10">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-violet-deep/70 font-semibold">Бесплатный разбор</span>
              <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold leading-tight">
                {trigger ? (
                  <>Разберём твоё <span className="text-gradient">«НО»</span> на встрече</>
                ) : (
                  <>Готова <span className="text-gradient">проявиться</span> по-настоящему?</>
                )}
              </h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                {trigger
                  ? `Ты выбрала триггер «${trigger.ready}». На разборе мы пройдём по 3 вопросам ниже и достанем точку, где ты себя останавливаешь.`
                  : "Оставь заявку — за 30 минут разберём твою точку А, миссию и главный блок, который мешает упаковке и деньгам."}
              </p>
              {trigger && (
                <div className="mt-6 rounded-2xl border border-rose/40 bg-rose/5 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-rose">Выбранный триггер</div>
                      <p className="mt-1 font-display text-base font-semibold">{trigger.ready}</p>
                      <p className="mt-1 text-sm italic text-foreground/70">НО {trigger.trigger}</p>
                    </div>
                    <button
                      type="button"
                      onClick={onClear}
                      className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-4 shrink-0"
                    >
                      сбросить
                    </button>
                  </div>
                  <ul className="mt-4 space-y-2 text-sm text-foreground/80">
                    {trigger.questions.map((q, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-rose font-bold">{i + 1}.</span>
                        <span>{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-violet-deep" /> {SITE.email}
              </div>
            </div>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setSubmitError(null);
                setLoading(true);
                try {
                  await submitForm({ name, email, msg, trigger });
                  toast.success(
                    trigger
                      ? `Заявка отправлена ✨ Разберём «${trigger.ready}» на встрече`
                      : "Заявка отправлена ✨ Свяжусь с тобой в течение дня",
                  );
                  setName("");
                  setEmail("");
                  setMsg("");
                  lastTriggerRef.current = null;
                  onClear();
                } catch (err) {
                  const message = err instanceof Error ? err.message : "Не удалось отправить. Попробуй ещё раз.";
                  setSubmitError(message);
                  toast.error(message);
                } finally {
                  setLoading(false);
                }
              }}
              className="space-y-3"
            >
              <input type="hidden" name="trigger_key" value={trigger?.key ?? ""} readOnly />
              <input type="hidden" name="trigger_label" value={trigger?.ready ?? ""} readOnly />
              <Input
                required
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Имя"
                className="h-12 rounded-xl bg-background"
              />
              <Input
                required
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email или телеграм"
                className="h-12 rounded-xl bg-background"
              />
              <Textarea
                name="msg"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder={
                  trigger
                    ? "Ответь коротко на 3 вопроса выше — даже одной строкой."
                    : "Коротко: чем занимаешься и что хочешь?"
                }
                className="rounded-xl bg-background min-h-44"
              />
              {trigger && (
                <button
                  type="button"
                  onClick={() => setMsg(buildPrefill(trigger))}
                  className="text-xs text-violet-deep hover:underline underline-offset-4"
                >
                  ↻ Вернуть авто-вопросы по триггеру
                </button>
              )}
              <Button
                type="submit"
                disabled={loading}
                size="lg"
                className="w-full rounded-xl h-12 bg-violet-deep hover:bg-violet-deep/90 text-white text-base"
              >
                {loading
                  ? "Отправляем..."
                  : submitError
                    ? (<>Попробовать ещё раз <ArrowRight className="ml-2 h-4 w-4" /></>)
                    : trigger
                      ? (<>Разобрать мой триггер <Send className="ml-2 h-4 w-4" /></>)
                      : (<>Записаться на разбор <Send className="ml-2 h-4 w-4" /></>)}
              </Button>
              {submitError && (
                <p className="text-sm text-destructive text-center">{submitError}</p>
              )}
              <p className="text-xs text-muted-foreground text-center">Нажимая кнопку, ты соглашаешься с обработкой персональных данных.</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-5 py-10 flex flex-col sm:flex-row gap-4 items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-2 font-display font-bold text-foreground">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-rose to-violet-deep text-white">
            <Sparkles className="h-3.5 w-3.5" />
          </span>
          {SITE.brand}
        </div>
        <p>© {new Date().getFullYear()} — Сделано с любовью и ИИ.</p>
        <div className="flex items-center gap-3">
          <a href="#" aria-label="Instagram" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-lavender/20 transition">
            <Instagram className="h-4 w-4" />
          </a>
          <a href={`mailto:${SITE.email}`} aria-label="Email" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-lavender/20 transition">
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
