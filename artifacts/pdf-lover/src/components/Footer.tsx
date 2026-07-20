import { Link } from 'wouter';
import { Heart } from 'lucide-react';
import { MdEmail } from 'react-icons/md';
import { FaInstagram, FaWhatsapp, FaTelegram } from 'react-icons/fa';
import { tools } from '@/data/tools';

const CONTACT_LINKS = [
  {
    label: 'Instagram',
    handle: '@apurva_maurya_45',
    href: 'https://www.instagram.com/apurva_maurya_45?igsh=a3cxYnpqdW05b3V5',
    icon: FaInstagram,
    bg: 'bg-gradient-to-br from-pink-500 via-rose-500 to-orange-400',
    shadow: 'hover:shadow-pink-500/40',
  },
  {
    label: 'WhatsApp',
    handle: '+91 9263293460',
    href: 'https://wa.me/919263293460',
    icon: FaWhatsapp,
    bg: 'bg-gradient-to-br from-green-400 to-emerald-600',
    shadow: 'hover:shadow-green-500/40',
  },
  {
    label: 'Telegram',
    handle: '@mishra0611',
    href: 'https://t.me/mishra0611',
    icon: FaTelegram,
    bg: 'bg-gradient-to-br from-sky-400 to-blue-600',
    shadow: 'hover:shadow-sky-500/40',
  },
  {
    label: 'Gmail',
    handle: 'hacker88089@gmail.com',
    href: 'mailto:hacker88089@gmail.com',
    icon: MdEmail,
    bg: 'bg-gradient-to-br from-red-400 to-rose-600',
    shadow: 'hover:shadow-red-500/40',
  },
] as const;

export function Footer() {
  const convertTools = tools.filter(t => t.category === 'convert').slice(0, 5);
  const editTools = tools.filter(t => t.category === 'edit').slice(0, 5);
  const securityTools = tools.filter(t => t.category === 'security').slice(0, 5);
  const scanAiTools = tools.filter(t => t.category === 'scan' || t.category === 'ai').slice(0, 5);

  return (
    <footer className="bg-card border-t border-border pt-16 pb-8 mt-auto">
      <div className="container mx-auto px-4 md:px-6">

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="font-extrabold text-2xl tracking-tight text-primary">PDF</span>
              <Heart className="w-6 h-6 fill-primary text-primary" strokeWidth={2} />
              <span className="font-bold text-2xl tracking-tight text-foreground">Lover</span>
            </Link>
            <p className="text-muted-foreground mb-2 max-w-sm text-sm leading-relaxed">
              Every PDF tool you need, loved in one place. Convert, edit, compress, and sign — beautifully simple.
            </p>
            <p className="text-xs text-muted-foreground/60 mb-6">
              Created by <span className="font-semibold text-muted-foreground">Apurva Maurya</span>
            </p>

            {/* Colorful social icon buttons */}
            <div className="flex gap-3 flex-wrap">
              {CONTACT_LINKS.map(({ label, handle, href, icon: Icon, bg, shadow }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  title={`${label}: ${handle}`}
                  aria-label={`Contact via ${label}`}
                  data-testid={`contact-${label.toLowerCase()}`}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md transition-all duration-200 hover:scale-110 hover:shadow-lg ${bg} ${shadow}`}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Tool columns */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm">Convert</h3>
            <ul className="space-y-2.5">
              {convertTools.map(tool => (
                <li key={tool.slug}>
                  <Link href={`/tools/${tool.slug}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {tool.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm">Edit & Organize</h3>
            <ul className="space-y-2.5">
              {editTools.map(tool => (
                <li key={tool.slug}>
                  <Link href={`/tools/${tool.slug}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {tool.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm">Security</h3>
            <ul className="space-y-2.5">
              {securityTools.map(tool => (
                <li key={tool.slug}>
                  <Link href={`/tools/${tool.slug}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {tool.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm">Scan & AI</h3>
            <ul className="space-y-2.5">
              {scanAiTools.map(tool => (
                <li key={tool.slug}>
                  <Link href={`/tools/${tool.slug}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {tool.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact & Support Banner */}
        <div className="rounded-2xl bg-gradient-to-br from-muted/80 to-muted/40 border border-border/60 backdrop-blur-sm px-6 py-6 mb-10">
          <h4 className="text-sm font-bold text-foreground mb-1">Contact & Support</h4>
          <p className="text-xs text-muted-foreground mb-5">
            Reach <span className="font-medium text-foreground">Apurva Maurya</span> directly — tap any icon to connect instantly.
          </p>
          <div className="flex flex-wrap gap-3">
            {CONTACT_LINKS.map(({ label, handle, href, icon: Icon, bg, shadow }) => (
              <a
                key={`support-${label}`}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                data-testid={`support-${label.toLowerCase()}`}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-white text-sm font-medium shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg ${bg} ${shadow}`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline text-xs">{handle}</span>
                <span className="sm:hidden text-xs">{label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} PDF Lover by{' '}
            <span className="font-semibold text-foreground">Apurva Maurya</span>. All rights reserved.
          </p>
          <div className="flex gap-5 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
