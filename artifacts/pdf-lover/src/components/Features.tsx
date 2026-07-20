import { motion } from 'framer-motion';
import { Smartphone, ShieldCheck, Zap, DownloadCloud } from 'lucide-react';

export function Features() {
  const features = [
    {
      title: 'Works on Any Device',
      description: 'Access PDF Lover from your Mac, Windows PC, Linux, or mobile device. A modern browser is all you need.',
      icon: Smartphone,
      color: 'bg-blue-500/10 text-blue-500'
    },
    {
      title: '100% Secure & Private',
      description: 'We delete your files permanently from our servers after 2 hours. Nobody has access to your documents.',
      icon: ShieldCheck,
      color: 'bg-emerald-500/10 text-emerald-500'
    },
    {
      title: 'Lightning Fast',
      description: 'Our tools are optimized for speed. Most conversions and edits happen instantly right in your browser.',
      icon: Zap,
      color: 'bg-amber-500/10 text-amber-500'
    },
    {
      title: 'No Software Needed',
      description: 'Stop downloading bulky software. Everything happens in the cloud without taking up space on your hard drive.',
      icon: DownloadCloud,
      color: 'bg-purple-500/10 text-purple-500'
    }
  ];

  return (
    <section className="py-24 bg-card border-y border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">Work your way.</h2>
          <p className="text-lg text-muted-foreground">
            A tool that respects your time, privacy, and device constraints. Built for the modern professional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-background border border-border p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${feature.color}`}>
                <feature.icon className="w-7 h-7" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
