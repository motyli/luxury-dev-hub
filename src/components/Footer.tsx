import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-gradient mb-4">ML • PixelPeak</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              סוכנות פיתוח מובילה המתמחה בפתרונות Full-Stack מקצה לקצה ואוטומציות עסקיות.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">ניווט מהיר</h4>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">דף הבית</Link>
              <Link to="/templates" className="text-sm text-muted-foreground hover:text-primary transition-colors">גלריית תבניות</Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">צור קשר</Link>
              <Link to="/checkout" className="text-sm text-muted-foreground hover:text-primary transition-colors">תשלום</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">יצירת קשר</h4>
            <p className="text-sm text-muted-foreground">info@mlpixelpeak.co.il</p>
            <p className="text-sm text-muted-foreground">03-1234567</p>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} ML • PixelPeak. כל הזכויות שמורות.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
