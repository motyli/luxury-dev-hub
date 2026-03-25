import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LogOut, User, Clock, FileText, Plus, Image } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Profile {
  display_name: string | null;
  company: string | null;
  project_status: string | null;
  project_description: string | null;
}

const DashboardPage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  // Template form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [category, setCategory] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
        return;
      }
      setUser(session.user);

      const { data } = await supabase
        .from("client_profiles")
        .select("*")
        .eq("user_id", session.user.id)
        .single();

      setProfile(data);
      setLoading(false);
    };
    init();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("התנתקתם בהצלחה");
    navigate("/");
  };

  const handleAddTemplate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("יש להזין שם לתבנית");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("templates").insert({
      title: title.trim(),
      description: description.trim() || null,
      image_url: imageUrl.trim() || null,
      live_url: liveUrl.trim() || null,
      category: category.trim() || null,
    });
    setSubmitting(false);
    if (error) {
      toast.error("שגיאה בהוספת תבנית: " + error.message);
    } else {
      toast.success("התבנית נוספה בהצלחה!");
      setTitle("");
      setDescription("");
      setImageUrl("");
      setLiveUrl("");
      setCategory("");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  const statusColor =
    profile?.project_status === "הושלם"
      ? "text-green-400"
      : profile?.project_status === "בתהליך"
      ? "text-primary"
      : "text-muted-foreground";

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center justify-between mb-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-4xl font-bold"
          >
            שלום, <span className="text-gradient">{profile?.display_name || "לקוח"}</span>
          </motion.h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
          >
            <LogOut size={16} />
            התנתקות
          </button>
        </div>

        {/* Profile cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl surface glow-border p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <User className="text-primary" size={20} />
              </div>
              <h3 className="font-semibold text-foreground">פרטים אישיים</h3>
            </div>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
            {profile?.company && (
              <p className="text-sm text-muted-foreground mt-1">{profile.company}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl surface glow-border p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Clock className="text-primary" size={20} />
              </div>
              <h3 className="font-semibold text-foreground">סטטוס פרויקט</h3>
            </div>
            <p className={`text-lg font-bold ${statusColor}`}>
              {profile?.project_status || "לא הוגדר"}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl surface glow-border p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="text-primary" size={20} />
              </div>
              <h3 className="font-semibold text-foreground">תיאור הפרויקט</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {profile?.project_description || "עדיין לא נוסף תיאור לפרויקט"}
            </p>
          </motion.div>
        </div>

        {/* Add Template Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl surface glow-border p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Plus className="text-primary" size={20} />
            </div>
            <h2 className="text-xl font-bold text-foreground">הוספת תבנית לגלריה</h2>
          </div>

          <form onSubmit={handleAddTemplate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">שם התבנית *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="למשל: חנות אונליין מודרנית"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">קטגוריה</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="למשל: eCommerce, SaaS, Landing Page"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">תיאור</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="תיאור קצר של הפרויקט..."
                rows={3}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  <span className="flex items-center gap-1.5"><Image size={14} /> קישור לתמונה</span>
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                  dir="ltr"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">קישור לדמו חי</label>
                <input
                  type="url"
                  value={liveUrl}
                  onChange={(e) => setLiveUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                  dir="ltr"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="rounded-xl bg-primary px-8 py-3 font-semibold text-primary-foreground transition-all hover:opacity-90 disabled:opacity-50"
            >
              {submitting ? "מוסיף..." : "הוסף תבנית"}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;
