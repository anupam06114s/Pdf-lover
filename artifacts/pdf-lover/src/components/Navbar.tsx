import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Menu, X, Sun, Moon, FileText } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Tools', href: '/' },
    { name: 'Features', href: '/#features' },
    { name: 'How It Works', href: '/#how-it-works' },
    { name: 'Pricing', href: '/#pricing' },
  ];

  return (
    <>
      <header
        className={cn(
          'fixed top-0 w-full z-50 transition-all duration-300',
          isScrolled
            ? 'bg-background/80 backdrop-blur-md border-b border-border shadow-sm py-3'
            : 'bg-transparent py-5'
        )}
        data-testid="navbar"
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-extrabold text-2xl tracking-tight text-primary">PDF</span>
            <Heart 
              className="w-6 h-6 fill-primary text-primary transition-transform group-hover:scale-110" 
              strokeWidth={2}
            />
            <span className="font-bold text-2xl tracking-tight text-foreground">Lover</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.div key={link.name} whileHover="hover" className="relative">
                <Link 
                  href={link.href}
                  className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                >
                  {link.name}
                </Link>
                <motion.div
                  className="absolute -bottom-1 left-0 w-full h-[2px] bg-primary rounded-full origin-left"
                  variants={{
                    hover: { scaleX: 1, opacity: 1 },
                    initial: { scaleX: 0, opacity: 0 }
                  }}
                  initial="initial"
                  transition={{ duration: 0.2 }}
                />
              </motion.div>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full hover:bg-muted transition-colors"
              data-testid="theme-toggle"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-foreground/80" />
              ) : (
                <Moon className="w-5 h-5 text-foreground/80" />
              )}
            </button>
            <div className="hidden md:block">
              <Link
                href="/"
                className="bg-primary text-primary-foreground px-5 py-2.5 rounded-full font-medium text-sm hover:bg-primary/90 transition-all hover:shadow-md hover:shadow-primary/20 active:scale-95 flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Get Started
              </Link>
            </div>
            
            <button
              className="md:hidden p-2 text-foreground/80 hover:bg-muted rounded-full"
              onClick={() => setMobileMenuOpen(true)}
              data-testid="mobile-menu-button"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[60] md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-3/4 max-w-sm bg-background border-l border-border z-[70] p-6 shadow-2xl flex flex-col md:hidden"
              data-testid="mobile-menu"
            >
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl text-primary">PDF</span>
                  <Heart className="w-5 h-5 fill-primary text-primary" />
                  <span className="font-bold text-xl text-foreground">Lover</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-lg font-medium text-foreground/80 hover:text-primary transition-colors border-b border-border/50 pb-4"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="mt-auto pb-8">
                <Link
                  href="/"
                  className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl font-semibold text-center hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shadow-md shadow-primary/20"
                >
                  <FileText className="w-5 h-5" />
                  Get Started Free
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
