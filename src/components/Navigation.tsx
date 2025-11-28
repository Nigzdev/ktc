import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/ktc-logo.png";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection("hero")}>
            <img src={logo} alt="KTC Academy Logo" className="w-12 h-12 md:w-16 md:h-16" />
            <div className="hidden sm:block">
              <div className="text-lg md:text-xl font-bold text-foreground">KTC Academy</div>
              <div className="text-xs text-muted-foreground">Khatri Taekwondo Club</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection("about")}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("schedule")}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Schedule
            </button>
            <button
              onClick={() => scrollToSection("membership")}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Membership
            </button>
            <button
              onClick={() => scrollToSection("gallery")}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Gallery
            </button>
            <Button onClick={() => scrollToSection("contact")} size="sm">
              Contact
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 border-t border-border pt-4">
            <button
              onClick={() => scrollToSection("about")}
              className="block w-full text-left text-foreground hover:text-primary transition-colors font-medium py-2"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("schedule")}
              className="block w-full text-left text-foreground hover:text-primary transition-colors font-medium py-2"
            >
              Schedule
            </button>
            <button
              onClick={() => scrollToSection("membership")}
              className="block w-full text-left text-foreground hover:text-primary transition-colors font-medium py-2"
            >
              Membership
            </button>
            <button
              onClick={() => scrollToSection("gallery")}
              className="block w-full text-left text-foreground hover:text-primary transition-colors font-medium py-2"
            >
              Gallery
            </button>
            <Button onClick={() => scrollToSection("contact")} className="w-full">
              Contact
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
