'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle, Loader2, Mail, Phone, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const contactSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Adresse email invalide'),
  subject: z.string().min(3, 'Le sujet doit contenir au moins 3 caractères'),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
  honeypot: z.string().max(0, 'Bot détecté'),
});

type ContactForm = z.infer<typeof contactSchema>;

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: { honeypot: '' },
  });

  const onSubmit = async (data: ContactForm) => {
    // Anti-spam honeypot
    if (data.honeypot) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
        }),
      });

      if (!res.ok) throw new Error('Erreur lors de l\'envoi');

      setIsSuccess(true);
      reset();
      toast({
        title: 'Message envoyé !',
        description: 'Merci pour votre message. Je vous répondrai rapidement.',
      });

      setTimeout(() => setIsSuccess(false), 5000);
    } catch {
      toast({
        title: 'Erreur',
        description: 'Impossible d\'envoyer le message. Veuillez réessayer.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="absolute top-0 left-0 right-0 section-divider" />

      {/* Background */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono text-cyan-400 mb-2 block">Contact</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Travaillons <span className="gradient-text">ensemble</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Vous avez un projet en tête ? N&apos;hésitez pas à me contacter, je serai ravi d&apos;échanger avec vous.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit(onSubmit)}
            className="glass rounded-2xl p-6 sm:p-8 space-y-6"
          >
            {/* Honeypot - hidden from users */}
            <input type="text" {...register('honeypot')} className="hidden" tabIndex={-1} autoComplete="off" />

            <div className="grid sm:grid-cols-2 gap-4">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Nom</label>
                <Input
                  {...register('name')}
                  placeholder="Votre nom"
                  className="bg-secondary/50 border-purple-500/20 focus:border-purple-500/50 text-white placeholder:text-muted-foreground/50"
                />
                {errors.name && (
                  <p className="text-xs text-red-400">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <Input
                  {...register('email')}
                  type="email"
                  placeholder="votre@email.com"
                  className="bg-secondary/50 border-purple-500/20 focus:border-purple-500/50 text-white placeholder:text-muted-foreground/50"
                />
                {errors.email && (
                  <p className="text-xs text-red-400">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Sujet</label>
              <Input
                {...register('subject')}
                placeholder="Sujet de votre message"
                className="bg-secondary/50 border-purple-500/20 focus:border-purple-500/50 text-white placeholder:text-muted-foreground/50"
              />
              {errors.subject && (
                <p className="text-xs text-red-400">{errors.subject.message}</p>
              )}
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Message</label>
              <Textarea
                {...register('message')}
                placeholder="Décrivez votre projet ou votre demande..."
                rows={5}
                className="bg-secondary/50 border-purple-500/20 focus:border-purple-500/50 text-white placeholder:text-muted-foreground/50 resize-none"
              />
              {errors.message && (
                <p className="text-xs text-red-400">{errors.message.message}</p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white py-6 cursor-pointer glow-purple"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Envoi en cours...
                </>
              ) : isSuccess ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Message envoyé !
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Envoyer le message
                </>
              )}
            </Button>
          </motion.form>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 text-center text-sm text-muted-foreground space-y-3"
          >
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="mailto:noeazocli19@gmail.com"
                className="inline-flex items-center gap-1.5 text-purple-400 hover:text-purple-300 transition-colors"
              >
                <Mail className="w-4 h-4" />
                noeazocli19@gmail.com
              </a>
              <a
                href="tel:+33156161619"
                className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <Phone className="w-4 h-4" />
                01 56 16 16 19
              </a>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://github.com/noeazocli19-cmyk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/digitaux-aze-3b951a410/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-blue-400 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
              <a
                href="https://www.tiktok.com/@digitaux.no"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-pink-400 transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.87a8.16 8.16 0 004.76 1.52V6.94a4.85 4.85 0 01-1-.25z"/>
                </svg>
                TikTok
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
