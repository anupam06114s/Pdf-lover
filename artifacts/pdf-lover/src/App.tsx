import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
import { AnimatePresence, motion } from 'framer-motion';

import { ThemeProvider } from '@/contexts/ThemeContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Chatbot } from '@/components/Chatbot';
import Home from '@/pages/Home';
import ToolPage from '@/pages/ToolPage';

const queryClient = new QueryClient();

// A wrapper to handle Framer Motion page transitions with Wouter
function RouteTransition({ children, location }: { children: React.ReactNode, location: string }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className="flex-1 flex flex-col"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

function AnimatedRoutes() {
  const [location] = useLocation();

  return (
    <RouteTransition location={location}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/tools/:slug" component={ToolPage} />
        <Route component={NotFound} />
      </Switch>
    </RouteTransition>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="pdf-lover-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <div className="flex flex-col min-h-[100dvh] bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary">
              <Navbar />
              <AnimatedRoutes />
              <Footer />
              <Chatbot />
            </div>
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
