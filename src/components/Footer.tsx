import { Heart } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-primary-foreground py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h3 className="font-heading text-2xl font-bold tracking-wide mb-1">ALANKARA</h3>
        <p className="text-xs tracking-[0.2em] uppercase opacity-70 mb-6">by Karthika</p>
        <div className="gold-divider mb-6" />
        <p className="text-sm opacity-70 mb-4">
          Exquisite imitation jewellery crafted with love and tradition.
        </p>
        <p className="text-xs opacity-50 flex items-center justify-center gap-1">
          Made with <Heart size={12} className="text-primary" /> in India
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
