import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Code2, Zap, Layers, ArrowLeft } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

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
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

const HomePage = () => {
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
