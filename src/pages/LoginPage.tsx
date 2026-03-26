import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          toast.error("האימייל או הסיסמה שגויים. אם אין לכם חשבון, הירשמו קודם.");
        } else {
          toast.error("שגיאה בהתחברות: " + error.message);
        }
      } else {
        toast.success("התחברתם בהצלחה!");
        navigate("/dashboard");
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
          emailRedirectTo: window.location.origin,
        },
      });
      if (error) {
        toast.error("שגיאה בהרשמה: " + error.message);
      } else {
        toast.success("נרשמתם בהצלחה! שלחנו לכם מייל אימות – אנא אשרו אותו לפני ההתחברות.");
        setIsLogin(true);
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md rounded-2xl surface glow-border p-8"
      >
        <h1 className="text-2xl font-bold text-center text-foreground mb-2">
          {isLogin ? "התחברות" : "הרשמה"}
        </h1>
        <p className="text-sm text-muted-foreground text-center mb-8">
          {isLogin ? "הזינו את הפרטים שלכם כדי להיכנס" : "צרו חשבון חדש כדי לעקוב אחרי הפרויקט שלכם"}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="שם מלא"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="rounded-lg bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary"
              required
              maxLength={100}
            />
          )}
          <input
            type="email"
            placeholder="אימייל"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary"
            required
            maxLength={255}
          />
          <input
            type="password"
            placeholder="סיסמה"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-lg bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary"
            required
            minLength={6}
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-primary px-8 py-3.5 font-semibold text-primary-foreground transition-all hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "טוען..." : isLogin ? "התחברות" : "הרשמה"}
          </button>
        </form>

        <p className="text-sm text-muted-foreground text-center mt-6">
          {isLogin ? "אין לכם חשבון?" : "כבר יש לכם חשבון?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary font-medium hover:underline"
          >
            {isLogin ? "הרשמו כאן" : "התחברו כאן"}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
