import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Code2, Zap, Layers, ArrowLeft, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import heroBg from "@/assets/hero-bg.jpg";

interface Template {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  category: string | null;
  live_url: string | null;
}

const services = [
  {
    icon: Code2,
    title: "פיתוח Full-Stack",
    description: "אפליקציות ווב מותאמות אישית מקצה לקצה עם טכנולוגיות מתקדמות",
  },
  {
    icon: Zap,
    title: "אוטומציות עסקיות",
    description: "ייעול תהליכים עסקיים עם אוטומציות חכמות שחוסכות זמן וכסף",
  },
  {
    icon: Layers,
    title: "פתרונות SaaS",
    description: "בניית מוצרים דיגיטליים סקיילבליים מאפס ועד להשקה מלאה",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" as const },
  }),
};

const HomePage = () => {
  const [templates, setTemplates] = useState<Template[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from("templates").select("*").order("created_at", { ascending: false }).limit(6);
      setTemplates(data ?? []);
    };
    load();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <img
          src={heroBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-6"
          >
            <span className="text-foreground">אנחנו בונים את</span>
            <br />
            <span className="text-gradient">העתיד הדיגיטלי שלכם</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            סוכנות פיתוח מובילה המתמחה בפתרונות Full-Stack מקצה לקצה, אוטומציות עסקיות, ומוצרים דיגיטליים שמניעים צמיחה
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/contact"
              className="rounded-xl bg-primary px-8 py-3.5 font-semibold text-primary-foreground transition-all hover:opacity-90 glow-border"
            >
              התחילו פרויקט
            </Link>
            <Link
              to="/templates"
              className="rounded-xl border border-border px-8 py-3.5 font-semibold text-foreground transition-all hover:bg-secondary flex items-center justify-center gap-2"
            >
              גלריית עבודות
              <ArrowLeft size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="text-3xl md:text-4xl font-bold text-center mb-4"
          >
            השירותים <span className="text-gradient">שלנו</span>
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
            className="text-center text-muted-foreground mb-16 max-w-lg mx-auto"
          >
            פתרונות טכנולוגיים מתקדמים שמתאימים בדיוק לעסק שלכם
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i + 2}
                className="rounded-2xl p-8 surface glow-border transition-all hover:surface-hover group"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <service.icon className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="text-3xl md:text-4xl font-bold text-center mb-4"
          >
            קצת <span className="text-gradient">עלינו</span>
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
            className="text-center text-muted-foreground mb-16 max-w-lg mx-auto"
          >
            הכירו את הצוות שמאחורי ML • PixelPeak
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={2}
              className="rounded-2xl surface glow-border p-8 md:p-10"
            >
              <h3 className="text-xl font-bold text-foreground mb-4">מי אנחנו?</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                ב-ML • PixelPeak אנחנו סוכנות פיתוח בוטיק שמתמחה בבניית מוצרים דיגיטליים מקצה לקצה. אנחנו מאמינים שטכנולוגיה טובה היא כזו שפשוט עובדת – בלי סיבוכים מיותרים.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                הצוות שלנו מורכב ממפתחים ומעצבים עם ניסיון רב בבניית אתרים, אפליקציות ואוטומציות עסקיות לחברות מכל הגדלים.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                אנחנו גאים בגישה האישית שלנו – כל פרויקט מקבל תשומת לב מלאה, מהרעיון הראשוני ועד ההשקה וההתמיכה לאחריה.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={3}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { value: "50+", label: "פרויקטים שהושלמו" },
                { value: "3+", label: "שנות ניסיון" },
                { value: "98%", label: "שביעות רצון לקוחות" },
                { value: "24/7", label: "תמיכה טכנית" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={i + 4}
                  className="rounded-2xl surface glow-border p-6 text-center"
                >
                  <p className="text-2xl md:text-3xl font-black text-primary mb-1">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Template Gallery */}
      {templates.length > 0 && (
        <section className="py-24">
          <div className="container mx-auto px-4">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
              className="text-3xl md:text-4xl font-bold text-center mb-4"
            >
              העבודות <span className="text-gradient">שלנו</span>
            </motion.h2>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={1}
              className="text-center text-muted-foreground mb-16 max-w-lg mx-auto"
            >
              הצצה לפרויקטים שבנינו עבור לקוחותינו
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template, i) => (
                <motion.div
                  key={template.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={i + 2}
                  className="rounded-2xl overflow-hidden surface glow-border group"
                >
                  {template.image_url ? (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={template.image_url}
                        alt={template.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-secondary/50 flex items-center justify-center">
                      <span className="text-muted-foreground text-sm">אין תמונה</span>
                    </div>
                  )}
                  <div className="p-6">
                    {template.category && (
                      <span className="text-xs font-medium text-primary mb-2 block">{template.category}</span>
                    )}
                    <h3 className="text-lg font-bold text-foreground mb-2">{template.title}</h3>
                    {template.description && (
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">{template.description}</p>
                    )}
                    {template.live_url && (
                      <a
                        href={template.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                      >
                        צפייה בדמו
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                to="/templates"
                className="inline-flex items-center gap-2 rounded-xl border border-border px-8 py-3 font-semibold text-foreground transition-all hover:bg-secondary"
              >
                לכל הגלריה
                <ArrowLeft size={18} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="rounded-3xl p-12 md:p-16 text-center glow-border surface"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              מוכנים <span className="text-gradient">להתחיל?</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              צרו איתנו קשר היום ונבנה יחד את הפרויקט הבא שלכם
            </p>
            <Link
              to="/contact"
              className="inline-block rounded-xl bg-primary px-10 py-4 font-semibold text-primary-foreground transition-all hover:opacity-90"
            >
              דברו איתנו
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
