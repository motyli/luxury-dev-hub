import { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Shield, CheckCircle2 } from "lucide-react";

const plans = [
  {
    name: "בסיסי",
    price: "4,900",
    features: ["עמוד נחיתה מותאם", "עיצוב רספונסיבי", "אופטימיזציה ל-SEO", "תמיכה ל-30 יום"],
  },
  {
    name: "מתקדם",
    price: "12,900",
    popular: true,
    features: ["אפליקציית ווב Full-Stack", "פאנל ניהול", "אינטגרציות API", "תמיכה ל-90 יום", "אוטומציות עסקיות"],
  },
  {
    name: "ארגוני",
    price: "בהתאמה",
    features: ["פתרון מותאם לחלוטין", "ארכיטקטורה מתקדמת", "SLA ייעודי", "תמיכה שוטפת", "ייעוץ טכנולוגי"],
  },
];

const CheckoutPage = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-bold text-center mb-4"
        >
          בחרו <span className="text-gradient">חבילה</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-muted-foreground mb-16 max-w-lg mx-auto"
        >
          חבילות שמותאמות לכל גודל של פרויקט
        </motion.p>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              onClick={() => setSelectedPlan(plan.name)}
              className={`rounded-2xl p-8 cursor-pointer transition-all ${
                selectedPlan === plan.name
                  ? "glow-border surface-hover"
                  : "surface border border-border hover:border-primary/30"
              } ${plan.popular ? "relative" : ""}`}
            >
              {plan.popular && (
                <span className="absolute -top-3 right-6 rounded-full bg-primary px-4 py-1 text-xs font-bold text-primary-foreground">
                  הכי פופולרי
                </span>
              )}
              <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-3xl font-black text-gradient">₪{plan.price}</span>
                {plan.price !== "בהתאמה" && <span className="text-sm text-muted-foreground mr-1">/ פרויקט</span>}
              </div>
              <ul className="flex flex-col gap-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 size={16} className="text-primary shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Payment Placeholder */}
        {selectedPlan && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-lg mx-auto rounded-2xl surface glow-border p-8"
          >
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <CreditCard className="text-primary" size={22} />
              פרטי תשלום
            </h3>

            {/* 
              ==============================================
              PAYMENT INTEGRATION PLACEHOLDER
              ==============================================
              This section is ready for Stripe or iCount integration.
              
              To connect Stripe:
              1. Install @stripe/stripe-js and @stripe/react-stripe-js
              2. Create a Supabase Edge Function for creating checkout sessions
              3. Replace this form with <Elements> and <CardElement>
              
              To connect iCount:
              1. Create an Edge Function that calls iCount's API
              2. Redirect users to iCount's payment page
              3. Handle webhook callbacks
              ==============================================
            */}
            <div className="flex flex-col gap-4">
              <div className="rounded-xl bg-secondary/50 border border-dashed border-border p-8 text-center">
                <Shield className="mx-auto mb-3 text-primary" size={32} />
                <p className="text-sm text-muted-foreground">
                  אזור תשלום מאובטח — מוכן לחיבור עם Stripe / iCount
                </p>
                <p className="text-xs text-muted-foreground/60 mt-2">
                  חבילה נבחרת: <span className="text-primary font-medium">{selectedPlan}</span>
                </p>
              </div>
              <button
                disabled
                className="rounded-xl bg-primary/50 px-8 py-3.5 font-semibold text-primary-foreground cursor-not-allowed"
              >
                בקרוב — המשך לתשלום
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
