import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, ExternalLink } from 'lucide-react';
import { FaInstagram, FaWhatsapp, FaTelegram } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { cn } from '@/lib/utils';

/* ─── Owner / Contact Config ─────────────────────────────── */
const OWNER = {
  name: 'Apurva Maurya',
  role: 'Founder & Developer, PDF Lover',
  avatar: 'AM',
};

const CONTACTS = [
  {
    id: 'instagram',
    label: 'Instagram',
    handle: '@apurva_maurya_45',
    href: 'https://www.instagram.com/apurva_maurya_45?igsh=a3cxYnpqdW05b3V5',
    icon: FaInstagram,
    gradient: 'from-pink-500 via-rose-500 to-orange-400',
    bg: 'bg-gradient-to-br from-pink-500 via-rose-500 to-orange-400',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    handle: '+91 9263293460',
    href: 'https://wa.me/919263293460',
    icon: FaWhatsapp,
    gradient: 'from-green-400 to-emerald-600',
    bg: 'bg-gradient-to-br from-green-400 to-emerald-600',
  },
  {
    id: 'telegram',
    label: 'Telegram',
    handle: '@mishra0611',
    href: 'https://t.me/mishra0611',
    icon: FaTelegram,
    gradient: 'from-sky-400 to-blue-600',
    bg: 'bg-gradient-to-br from-sky-400 to-blue-600',
  },
  {
    id: 'gmail',
    label: 'Gmail',
    handle: 'hacker88089@gmail.com',
    href: 'mailto:hacker88089@gmail.com',
    icon: MdEmail,
    gradient: 'from-red-400 to-rose-600',
    bg: 'bg-gradient-to-br from-red-400 to-rose-600',
  },
];

/* ─── Message types ───────────────────────────────────────── */
type Message = {
  id: number;
  from: 'bot' | 'user';
  text: string;
  links?: { label: string; href: string; icon?: React.ElementType; bg?: string }[];
};

const INIT_MESSAGES: Message[] = [
  {
    id: 1,
    from: 'bot',
    text: `Hey! I'm the PDF Lover assistant. How can I help you today?`,
  },
  {
    id: 2,
    from: 'bot',
    text: 'You can ask me about our tools, or reach out directly to the owner:',
    links: CONTACTS.map(c => ({
      label: `${c.label} — ${c.handle}`,
      href: c.href,
      icon: c.icon,
      bg: c.bg,
    })),
  },
];

const QUICK_REPLIES = ['Contact Owner', 'Who built this?', 'Show all tools', 'Get Support'];

function getBotReply(text: string): Message {
  const t = text.toLowerCase();
  const id = Date.now();

  if (t.includes('owner') || t.includes('contact') || t.includes('support') || t.includes('reach')) {
    return {
      id,
      from: 'bot',
      text: `You can reach ${OWNER.name} (${OWNER.role}) through any of these channels:`,
      links: CONTACTS.map(c => ({
        label: `${c.label} — ${c.handle}`,
        href: c.href,
        icon: c.icon,
        bg: c.bg,
      })),
    };
  }

  if (t.includes('built') || t.includes('who') || t.includes('made') || t.includes('developer')) {
    return {
      id,
      from: 'bot',
      text: `PDF Lover was built by ${OWNER.name}. He's passionate about making document workflows fast and beautiful. Connect with him:`,
      links: CONTACTS.map(c => ({
        label: c.label,
        href: c.href,
        icon: c.icon,
        bg: c.bg,
      })),
    };
  }

  if (t.includes('tool') || t.includes('pdf') || t.includes('convert') || t.includes('edit')) {
    return {
      id,
      from: 'bot',
      text: 'PDF Lover offers 27 tools — convert, edit, sign, protect, compress, and AI-powered features like summarization and translation. Browse them all on the homepage!',
    };
  }

  if (t.includes('instagram') || t.includes('insta')) {
    const c = CONTACTS.find(x => x.id === 'instagram')!;
    return { id, from: 'bot', text: `Follow ${OWNER.name} on Instagram:`, links: [{ label: c.handle, href: c.href, icon: c.icon, bg: c.bg }] };
  }
  if (t.includes('whatsapp') || t.includes('whats')) {
    const c = CONTACTS.find(x => x.id === 'whatsapp')!;
    return { id, from: 'bot', text: `Chat on WhatsApp:`, links: [{ label: c.handle, href: c.href, icon: c.icon, bg: c.bg }] };
  }
  if (t.includes('telegram')) {
    const c = CONTACTS.find(x => x.id === 'telegram')!;
    return { id, from: 'bot', text: `Message on Telegram:`, links: [{ label: c.handle, href: c.href, icon: c.icon, bg: c.bg }] };
  }
  if (t.includes('gmail') || t.includes('email') || t.includes('mail')) {
    const c = CONTACTS.find(x => x.id === 'gmail')!;
    return { id, from: 'bot', text: `Send an email:`, links: [{ label: c.handle, href: c.href, icon: c.icon, bg: c.bg }] };
  }

  return {
    id,
    from: 'bot',
    text: `I'm not sure about that, but you can always reach ${OWNER.name} directly for help!`,
    links: CONTACTS.slice(0, 2).map(c => ({ label: c.label, href: c.href, icon: c.icon, bg: c.bg })),
  };
}

/* ─── Main Component ──────────────────────────────────────── */
export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INIT_MESSAGES);
  const [input, setInput] = useState('');
  const [pulsing, setPulsing] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  // Stop pulse after first open
  useEffect(() => {
    if (open) setPulsing(false);
  }, [open]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), from: 'user', text: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, getBotReply(text)]);
    }, 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Floating button */}
      <div className="fixed bottom-6 right-6 z-[100]">
        <AnimatePresence>
          {!open && pulsing && (
            <motion.div
              className="absolute inset-0 rounded-full bg-primary opacity-30"
              animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </AnimatePresence>

        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.08 }}
          onClick={() => setOpen(v => !v)}
          className="relative w-14 h-14 rounded-full bg-gradient-to-br from-primary to-rose-600 text-white shadow-[0_8px_32px_rgba(229,62,62,0.5)] flex items-center justify-center"
          aria-label="Open support chat"
          data-testid="chatbot-toggle"
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <X className="w-6 h-6" />
              </motion.span>
            ) : (
              <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <MessageCircle className="w-6 h-6" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: 'spring', damping: 28, stiffness: 380 }}
            className="fixed bottom-24 right-6 z-[100] w-[340px] max-w-[calc(100vw-2rem)] rounded-2xl overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.3)] border border-border/60 bg-card flex flex-col"
            style={{ maxHeight: '520px' }}
            data-testid="chatbot-panel"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-rose-600 px-4 py-3.5 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm shrink-0">
                {OWNER.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm leading-tight truncate">PDF Lover Support</p>
                <p className="text-white/70 text-xs truncate">{OWNER.name} — {OWNER.role.split(',')[0]}</p>
              </div>
              <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" title="Online" />
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3 overscroll-contain" style={{ minHeight: '200px' }}>
              {messages.map(msg => (
                <div key={msg.id} className={cn('flex', msg.from === 'user' ? 'justify-end' : 'justify-start')}>
                  <div className={cn(
                    'max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm',
                    msg.from === 'user'
                      ? 'bg-primary text-white rounded-br-sm'
                      : 'bg-muted text-foreground rounded-bl-sm'
                  )}>
                    <p className="leading-relaxed">{msg.text}</p>
                    {msg.links && (
                      <div className="mt-2.5 space-y-1.5">
                        {msg.links.map((link, i) => {
                          const Icon = link.icon;
                          return (
                            <a
                              key={i}
                              href={link.href}
                              target={link.href.startsWith('mailto') ? undefined : '_blank'}
                              rel="noopener noreferrer"
                              className="flex items-center gap-2.5 rounded-xl overflow-hidden border border-white/10 hover:scale-[1.02] transition-transform"
                            >
                              <div className={cn('w-9 h-9 flex items-center justify-center shrink-0', link.bg || 'bg-muted')}>
                                {Icon && <Icon className="w-4 h-4 text-white" />}
                              </div>
                              <span className="text-xs font-medium flex-1 truncate text-foreground dark:text-foreground pr-2">
                                {link.label}
                              </span>
                              <ExternalLink className="w-3 h-3 text-muted-foreground mr-2 shrink-0" />
                            </a>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Quick replies */}
            <div className="px-3 pb-2 flex gap-1.5 flex-wrap">
              {QUICK_REPLIES.map(qr => (
                <button
                  key={qr}
                  onClick={() => sendMessage(qr)}
                  className="text-xs px-2.5 py-1 rounded-full border border-border bg-muted hover:bg-primary/10 hover:border-primary/40 hover:text-primary transition-colors"
                >
                  {qr}
                </button>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="border-t border-border px-3 py-3 flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type a message…"
                className="flex-1 bg-muted rounded-full px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30"
                data-testid="chatbot-input"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center disabled:opacity-40 hover:bg-primary/90 transition-colors shrink-0"
                data-testid="chatbot-send"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
