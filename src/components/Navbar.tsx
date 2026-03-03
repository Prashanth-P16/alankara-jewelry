import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex flex-col leading-tight">
            <span className="font-heading text-xl md:text-2xl font-bold tracking-wide text-foreground">
              ALANKARA
            </span>
            <span className="text-[10px] md:text-xs tracking-[0.2em] text-muted-foreground uppercase">
              by Karthika
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium tracking-wide uppercase transition-colors ${
                  location.pathname === link.to
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link to="/shop" className="text-foreground hover:text-primary transition-colors">
              <ShoppingBag size={20} />
            </Link>
            <button
              className="md:hidden text-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-background border-b border-border px-4 pb-4">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-sm font-medium tracking-wide uppercase text-muted-foreground hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
