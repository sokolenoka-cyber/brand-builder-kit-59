import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, Brain, Wand2, Rocket, ArrowRight, Check, Quote, Instagram, Send, Mail } from "lucide-react";
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

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Problem />
        <Method />
        <Offer />
        <Process />
        <Testimonials />
        <FAQ />
        <CTASection />
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

      <div className="relative mx-auto max-w-7xl px-5 pt-16 pb-24 lg:pt-24 lg:pb-32 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-violet-deep">
            <Sparkles className="h-3.5 w-3.5" /> ИИ × Подсознание × Миссия
          </span>
          <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.02]">
            Упакуй свою <span className="text-gradient">экспертность</span> через ИИ — и наконец проявись
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
            Соединяю мощь искусственного интеллекта и глубинную работу с подсознательными блоками.
            Ты получаешь не «ещё один лендинг», а живую упаковку, в которой видно твою миссию —
            и внутреннее «да» на то, чтобы её показать миру.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full bg-violet-deep hover:bg-violet-deep/90 text-white px-7 h-12 text-base shadow-lg shadow-violet-deep/20">
              <a href="#cta">{SITE.cta} <ArrowRight className="ml-2 h-4 w-4" /></a>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full h-12 px-7 border-violet-deep/30 text-violet-deep hover:bg-lavender/20">
              <a href="#method">Как это работает</a>
            </Button>
          </div>

          <dl className="mt-10 grid grid-cols-3 gap-6 max-w-md">
            {[
              ["7 дней", "до новой упаковки"],
              ["2 в 1", "ИИ + психика"],
              ["1:1", "личное сопровождение"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="font-display text-2xl font-bold text-violet-deep">{k}</dt>
                <dd className="text-xs text-muted-foreground mt-1">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-rose/30 via-lavender/40 to-violet-deep/20 blur-2xl" />
          <div className="relative grid grid-cols-6 gap-4">
            <Card className="col-span-4 row-span-2 p-6 animate-float" style={{ animationDelay: "0.5s" }}>
              <div className="flex items-center gap-2 text-xs text-violet-deep font-medium">
                <Brain className="h-4 w-4" /> Подсознание
              </div>
              <p className="mt-3 font-display text-2xl leading-snug">
                «Я готова быть видимой и брать деньги за свой дар.»
              </p>
              <div className="mt-5 h-1.5 rounded-full bg-muted overflow-hidden">
                <div className="h-full w-[82%] bg-gradient-to-r from-rose to-violet-deep" />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">Блок «синдром самозванца» — снят на 82%</p>
            </Card>
            <Card className="col-span-2 p-5">
              <Wand2 className="h-5 w-5 text-violet-deep" />
              <p className="mt-3 font-display text-lg leading-tight">AI-страница за 1 день</p>
            </Card>
            <Card className="col-span-2 p-5 bg-violet-deep text-white border-violet-deep">
              <Rocket className="h-5 w-5" />
              <p className="mt-3 font-display text-lg leading-tight">Готова проявляться</p>
            </Card>
            <Card className="col-span-3 p-5">
              <Heart className="h-5 w-5 text-rose" />
              <p className="mt-2 text-sm text-muted-foreground">Миссия, тон, оффер — собраны в одно</p>
            </Card>
            <Card className="col-span-3 p-5 animate-float" style={{ animationDelay: "1.5s" }}>
              <Compass className="h-5 w-5 text-violet-deep" />
              <p className="mt-2 text-sm text-muted-foreground">Понятный путь клиента и продаж</p>
            </Card>
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
  const includes = [
    "Глубинное интервью + распаковка миссии",
    "AI-сборка позиционирования, оффера и tone of voice",
    "Готовый лендинг / визуальная упаковка",
    "2 сессии работы с блоками проявления",
    "Скрипты для соцсетей и продаж",
    "Поддержка 30 дней после программы",
  ];
  return (
    <section id="offer" className="mx-auto max-w-7xl px-5 py-24">
      <div className="grid lg:grid-cols-5 gap-10 items-start">
        <div className="lg:col-span-2">
          <span className="text-xs uppercase tracking-[0.3em] text-violet-deep/70 font-semibold">Программа</span>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold leading-tight">
            «Миссия на миллион» — за 21 день
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            Личное сопровождение, где мы одновременно собираем твою AI-упаковку и снимаем
            внутренние тормоза. На выходе — не папка файлов, а ощущение «я готова и хочу проявляться».
          </p>
          <Button asChild size="lg" className="mt-8 rounded-full bg-violet-deep hover:bg-violet-deep/90 text-white h-12 px-7">
            <a href="#cta">Хочу разбор <ArrowRight className="ml-2 h-4 w-4" /></a>
          </Button>
        </div>
        <div className="lg:col-span-3 rounded-3xl bg-gradient-to-br from-violet-deep to-rose p-[1px]">
          <div className="rounded-3xl bg-card p-8 sm:p-10">
            <h3 className="font-display text-2xl font-bold">Что входит</h3>
            <ul className="mt-6 space-y-4">
              {includes.map((i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-lavender/40 text-violet-deep">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-foreground/90">{i}</span>
                </li>
              ))}
            </ul>
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

function CTASection() {
  const [loading, setLoading] = useState(false);
  return (
    <section id="cta" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-aurora" />
      <div className="relative mx-auto max-w-5xl px-5 py-24">
        <div className="rounded-[2rem] bg-card/80 backdrop-blur-xl border border-border/60 p-8 sm:p-14 shadow-2xl shadow-violet-deep/10">
          <div className="grid lg:grid-cols-2 gap-10">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-violet-deep/70 font-semibold">Бесплатный разбор</span>
              <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold leading-tight">
                Готова <span className="text-gradient">проявиться</span> по-настоящему?
              </h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                Оставь заявку — за 30 минут разберём твою точку А, миссию и главный блок,
                который мешает упаковке и деньгам.
              </p>
              <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-violet-deep" /> {SITE.email}
              </div>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                  toast.success("Заявка отправлена ✨ Свяжусь с тобой в течение дня");
                  (e.target as HTMLFormElement).reset();
                }, 700);
              }}
              className="space-y-3"
            >
              <Input required name="name" placeholder="Имя" className="h-12 rounded-xl bg-background" />
              <Input required type="email" name="email" placeholder="Email или телеграм" className="h-12 rounded-xl bg-background" />
              <Textarea name="msg" placeholder="Коротко: чем занимаешься и что хочешь?" className="rounded-xl bg-background min-h-28" />
              <Button
                type="submit"
                disabled={loading}
                size="lg"
                className="w-full rounded-xl h-12 bg-violet-deep hover:bg-violet-deep/90 text-white text-base"
              >
                {loading ? "Отправляем..." : (<>Записаться на разбор <Send className="ml-2 h-4 w-4" /></>)}
              </Button>
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
