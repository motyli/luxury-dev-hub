import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Template {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  category: string | null;
  live_url: string | null;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const TemplateGallery = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("templates").select("*").order("created_at", { ascending: false });
      setTemplates(data ?? []);
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-bold text-center mb-4"
        >
          גלריית <span className="text-gradient">תבניות</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-muted-foreground mb-16 max-w-lg mx-auto"
        >
          הצצה לפרויקטים שבנינו עבור לקוחותינו
        </motion.p>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl surface h-72 animate-pulse" />
            ))}
          </div>
        ) : templates.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">הגלריה תתעדכן בקרוב עם פרויקטים חדשים</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template, i) => (
              <motion.div
                key={template.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="rounded-2xl overflow-hidden surface glow-border group"
              >
                {template.image_url && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={template.image_url}
                      alt={template.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="p-6">
                  {template.category && (
                    <span className="text-xs font-medium text-primary mb-2 block">{template.category}</span>
                  )}
                  <h3 className="text-lg font-bold text-foreground mb-2">{template.title}</h3>
                  {template.description && (
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{template.description}</p>
                  )}
                  {template.live_url && (
                    <a
                      href={template.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                    >
                      צפייה באתר
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateGallery;
