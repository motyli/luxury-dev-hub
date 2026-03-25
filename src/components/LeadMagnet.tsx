import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const LeadMagnet = () => {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("leadMagnetShown");
    if (alreadyShown) return;

    const timer = setTimeout(() => {
      setShow(true);
      sessionStorage.setItem("leadMagnetShown", "true");
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setLoading(true);
    const { error } = await supabase.from("leads").insert({ name: name.trim(), email: email.trim() });
    setLoading(false);
    if (error) {
      toast.error("שגיאה בשליחה, נסו שוב");
    } else {
      toast.success("תודה! נחזור אליכם בהקדם");
      setDismissed(true);
      setShow(false);
    }
  };

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "-100%", opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] glass rounded-2xl p-6 glow-border"
        >
          <button
            onClick={() => { setShow(false); setDismissed(true); }}
            className="absolute top-3 left-3 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={18} />
          </button>
          <h3 className="text-lg font-bold text-foreground mb-1">בואו נדבר!</h3>
          <p className="text-sm text-muted-foreground mb-4">השאירו פרטים ונחזור אליכם עם הצעה מותאמת אישית</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="שם מלא"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-lg bg-secondary px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary"
              required
              maxLength={100}
            />
            <input
              type="email"
              placeholder="אימייל"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-lg bg-secondary px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary"
              required
              maxLength={255}
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "שולח..." : "שליחה"}
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LeadMagnet;
