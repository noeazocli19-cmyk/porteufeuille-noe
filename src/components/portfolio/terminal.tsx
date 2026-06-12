'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, ChevronRight } from 'lucide-react';

const commands: Record<string, string> = {
  help: `Commandes disponibles :
  about     - À propos de moi
  skills    - Mes compétences
  projects  - Mes projets
  contact   - Me contacter
  clear     - Effacer le terminal
  whoami    - Qui suis-je ?`,
  about: `Bonjour ! Je suis Noé, développeur Full-Stack passionné et fondateur de L'Arche Tech.
  Je crée des applications web modernes et performantes pour les PME et startups.
  Spécialisé en React, Next.js, Node.js et Prisma. Basé au Bénin 🇧🇯.`,
  skills: `Frontend : React.js, Next.js, TypeScript, Tailwind CSS, Framer Motion
  Backend  : Node.js, Express, Prisma, PHP
  Database : PostgreSQL, Supabase, MongoDB
  DevOps   : Git, Vercel, CI/CD`,
  projects: `🛠️ Artisan Connecté - Marketplace artisans en Afrique
  🍹 TradiBev - Boissons traditionnelles & événements
  💡 Digital Innovation - Agence web & marketing digital au Bénin
  🏛️ L'Arche Tech - Agence web premium`,
  contact: `📧 Email : noeazocli19@gmail.com
  🐙 GitHub : github.com/noeazocli19-cmyk
  💼 LinkedIn : linkedin.com/in/digitaux-aze-3b951a410
  🎵 TikTok : tiktok.com/@digitaux.no
  📱 Tél : 01 56 16 16 19
  🌐 L'Arche Tech : l-arche-tech.vercel.app`,
  whoami: `noe - Développeur Full-Stack | Fondateur L'Arche Tech | Bénin 🇧🇯`,
};

export function Terminal() {
  const [lines, setLines] = useState<Array<{ type: 'input' | 'output'; text: string }>>([
    { type: 'output', text: 'Bienvenue dans le terminal de Noé ! Tapez "help" pour voir les commandes.' },
  ]);
  const [input, setInput] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show terminal after a delay
    const timer = setTimeout(() => setIsVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newLines = [...lines, { type: 'input' as const, text: cmd }];

    if (trimmed === 'clear') {
      setLines([]);
      setInput('');
      return;
    }

    const output = commands[trimmed] || `Commande "${trimmed}" non reconnue. Tapez "help" pour l'aide.`;
    newLines.push({ type: 'output', text: output });
    setLines(newLines);
    setInput('');
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative py-16"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Terminal header */}
          <div className="glass rounded-t-2xl px-4 py-3 flex items-center gap-3 border-b border-purple-500/10">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <TerminalIcon className="w-3.5 h-3.5" />
              <span>noe@portfolio</span>
            </div>
          </div>

          {/* Terminal body */}
          <div className="glass rounded-b-2xl p-4 font-mono text-sm max-h-72 overflow-y-auto">
            {lines.map((line, i) => (
              <div key={i} className="mb-1">
                {line.type === 'input' ? (
                  <div className="flex items-center gap-2">
                    <span className="text-purple-400">$</span>
                    <span className="text-cyan-400">{line.text}</span>
                  </div>
                ) : (
                  <pre className="text-muted-foreground whitespace-pre-wrap text-xs">{line.text}</pre>
                )}
              </div>
            ))}

            {/* Input line */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCommand(input);
              }}
              className="flex items-center gap-2 mt-2"
            >
              <span className="text-purple-400">$</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent text-cyan-400 outline-none text-sm"
                placeholder="Tapez une commande..."
                autoFocus={false}
              />
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
