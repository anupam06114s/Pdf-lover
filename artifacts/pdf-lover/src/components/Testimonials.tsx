import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    {
      quote: "PDF Lover has completely replaced every other PDF tool I used. It's fast, beautiful, and just works.",
      author: "Sarah K.",
      role: "Designer",
      initials: "SK",
      color: "bg-blue-500"
    },
    {
      quote: "The AI Summarizer alone is worth it. I process research papers 10x faster now without losing context.",
      author: "Marcus T.",
      role: "Researcher",
      initials: "MT",
      color: "bg-emerald-500"
    },
    {
      quote: "Finally a PDF tool that doesn't feel like it was built in 2005. My whole team uses it daily.",
      author: "Priya M.",
      role: "Product Manager",
      initials: "PM",
      color: "bg-purple-500"
    }
  ];

  return (
    <section className="py-24 bg-secondary/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">Loved by professionals</h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of users who have upgraded their document workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-card border border-border p-8 rounded-2xl shadow-sm flex flex-col h-full"
            >
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-lg font-medium text-foreground mb-8 flex-1 italic">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <div className={`w-12 h-12 rounded-full ${testimonial.color} text-white font-bold flex items-center justify-center shrink-0 shadow-inner`}>
                  {testimonial.initials}
                </div>
                <div>
                  <h4 className="font-bold text-foreground">{testimonial.author}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
