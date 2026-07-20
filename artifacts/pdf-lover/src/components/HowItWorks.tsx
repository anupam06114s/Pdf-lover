import { motion } from 'framer-motion';
import { UploadCloud, Settings2, Download } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      num: 1,
      title: 'Upload',
      description: 'Drag & drop your PDF or click to select from your device. Supports files up to 100MB.',
      icon: UploadCloud,
    },
    {
      num: 2,
      title: 'Process',
      description: 'Our tools work instantly in your browser. No waiting, no queues for most operations.',
      icon: Settings2,
    },
    {
      num: 3,
      title: 'Download',
      description: 'Your processed file is ready in seconds. Download it directly or save to cloud storage.',
      icon: Download,
    }
  ];

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">How it works</h2>
          <p className="text-lg text-muted-foreground">
            Three simple steps to get your document exactly how you want it. No account required to start.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-[52px] left-[15%] right-[15%] h-[2px] bg-border border-t-2 border-dashed border-border" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="flex flex-col items-center text-center relative"
              >
                <div className="w-28 h-28 bg-card border-4 border-background rounded-full shadow-xl flex items-center justify-center relative mb-8 group hover:scale-105 transition-transform duration-300">
                  <div className="absolute inset-0 bg-primary/5 rounded-full" />
                  <step.icon className="w-10 h-10 text-primary relative z-10" strokeWidth={1.5} />
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg shadow-lg border-4 border-background z-20">
                    {step.num}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-foreground mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed px-4">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
