'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Pencil, Trash2, X, Save, Eye, EyeOff, Shield,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import type { Project, Contact } from '@/types';

interface AdminPanelProps {
  open: boolean;
  onClose: () => void;
  projects: Project[];
  onProjectsChange: () => void;
}

const emptyProject = {
  title: '',
  slug: '',
  description: '',
  longDesc: '',
  image: '',
  images: '',
  tech: '',
  category: '',
  liveUrl: '',
  githubUrl: '',
  featured: false,
};

export function AdminPanel({ open, onClose, projects, onProjectsChange }: AdminPanelProps) {
  const [isAuth, setIsAuth] = useState(false);
  const [password, setPassword] = useState('');
  const [editingProject, setEditingProject] = useState<typeof emptyProject | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  // Load contacts
  useEffect(() => {
    if (isAuth) {
      fetch('/api/contacts')
        .then(res => res.json())
        .then(data => setContacts(data))
        .catch(() => {});
    }
  }, [isAuth]);

  const handleLogin = () => {
    // Simple password check (in production, use Supabase Auth)
    if (password === 'noe2024') {
      setIsAuth(true);
      toast({ title: 'Connecté !', description: 'Bienvenue dans le dashboard admin.' });
    } else {
      toast({ title: 'Erreur', description: 'Mot de passe incorrect.', variant: 'destructive' });
    }
  };

  const handleSave = async () => {
    if (!editingProject) return;
    setIsSaving(true);

    try {
      // Generate slug from title
      const slug = editingProject.slug || editingProject.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

      const payload = { ...editingProject, slug };

      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Erreur');

      toast({ title: 'Projet sauvegardé !' });
      setEditingProject(null);
      onProjectsChange();
    } catch {
      toast({ title: 'Erreur', description: 'Impossible de sauvegarder.', variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce projet ?')) return;

    try {
      await fetch(`/api/projects?id=${id}`, { method: 'DELETE' });
      toast({ title: 'Projet supprimé.' });
      onProjectsChange();
    } catch {
      toast({ title: 'Erreur', description: 'Impossible de supprimer.', variant: 'destructive' });
    }
  };

  const handleMarkRead = async (id: string) => {
    try {
      await fetch(`/api/contacts?id=${id}`, { method: 'PATCH' });
      setContacts(prev => prev.map(c => c.id === id ? { ...c, read: true } : c));
    } catch {
      // silently fail
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative glass-strong rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 glass-strong rounded-t-2xl px-6 py-4 flex items-center justify-between border-b border-purple-500/10">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-400" />
                <h2 className="text-lg font-semibold text-white">Dashboard Admin</h2>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} className="text-muted-foreground cursor-pointer">
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-6">
              {!isAuth ? (
                /* Login */
                <div className="max-w-sm mx-auto space-y-4">
                  <p className="text-center text-muted-foreground text-sm">
                    Entrez le mot de passe admin pour accéder au dashboard.
                  </p>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mot de passe"
                    className="bg-secondary/50 border-purple-500/20 text-white"
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                  />
                  <Button
                    onClick={handleLogin}
                    className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white cursor-pointer"
                  >
                    Se connecter
                  </Button>
                </div>
              ) : (
                /* Admin tabs */
                <Tabs defaultValue="projects">
                  <TabsList className="bg-secondary/50 border border-purple-500/10">
                    <TabsTrigger value="projects" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
                      Projets
                    </TabsTrigger>
                    <TabsTrigger value="contacts" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
                      Messages
                    </TabsTrigger>
                  </TabsList>

                  {/* Projects tab */}
                  <TabsContent value="projects" className="mt-4 space-y-4">
                    {editingProject ? (
                      /* Edit form */
                      <div className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-xs text-muted-foreground">Titre</label>
                            <Input
                              value={editingProject.title}
                              onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') })}
                              className="bg-secondary/50 border-purple-500/20 text-white text-sm"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs text-muted-foreground">Catégorie</label>
                            <Input
                              value={editingProject.category}
                              onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                              placeholder="ex: Web App, SaaS..."
                              className="bg-secondary/50 border-purple-500/20 text-white text-sm"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs text-muted-foreground">Description courte</label>
                          <Textarea
                            value={editingProject.description}
                            onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                            rows={2}
                            className="bg-secondary/50 border-purple-500/20 text-white text-sm resize-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs text-muted-foreground">Description longue</label>
                          <Textarea
                            value={editingProject.longDesc}
                            onChange={(e) => setEditingProject({ ...editingProject, longDesc: e.target.value })}
                            rows={4}
                            className="bg-secondary/50 border-purple-500/20 text-white text-sm resize-none"
                          />
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-xs text-muted-foreground">Technologies (séparées par virgules)</label>
                            <Input
                              value={editingProject.tech}
                              onChange={(e) => setEditingProject({ ...editingProject, tech: e.target.value })}
                              placeholder="React, Next.js, Prisma"
                              className="bg-secondary/50 border-purple-500/20 text-white text-sm"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs text-muted-foreground">Image URL</label>
                            <Input
                              value={editingProject.image}
                              onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                              placeholder="https://..."
                              className="bg-secondary/50 border-purple-500/20 text-white text-sm"
                            />
                          </div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-xs text-muted-foreground">URL live</label>
                            <Input
                              value={editingProject.liveUrl}
                              onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                              className="bg-secondary/50 border-purple-500/20 text-white text-sm"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs text-muted-foreground">URL GitHub</label>
                            <Input
                              value={editingProject.githubUrl}
                              onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                              className="bg-secondary/50 border-purple-500/20 text-white text-sm"
                            />
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Switch
                            checked={editingProject.featured}
                            onCheckedChange={(checked) => setEditingProject({ ...editingProject, featured: checked })}
                          />
                          <span className="text-sm text-muted-foreground">Projet mis en avant</span>
                        </div>
                        <div className="flex gap-3">
                          <Button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white cursor-pointer"
                          >
                            <Save className="w-4 h-4 mr-2" />
                            {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => setEditingProject(null)}
                            className="border-purple-500/20 text-muted-foreground cursor-pointer"
                          >
                            Annuler
                          </Button>
                        </div>
                      </div>
                    ) : (
                      /* Project list */
                      <>
                        <Button
                          onClick={() => setEditingProject(emptyProject)}
                          className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white cursor-pointer"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Ajouter un projet
                        </Button>
                        <div className="space-y-2">
                          {projects.map((project) => (
                            <div
                              key={project.id}
                              className="glass rounded-xl p-4 flex items-center justify-between gap-3"
                            >
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium text-white truncate">
                                    {project.title}
                                  </span>
                                  {project.featured && (
                                    <Badge className="bg-purple-500/20 text-purple-400 text-[10px]">
                                      Featured
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-xs text-muted-foreground truncate">{project.category}</p>
                              </div>
                              <div className="flex items-center gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-muted-foreground hover:text-purple-400 h-8 w-8 cursor-pointer"
                                  onClick={() => {
                                    setEditingProject({
                                      title: project.title,
                                      slug: project.slug,
                                      description: project.description,
                                      longDesc: project.longDesc || '',
                                      image: project.image || '',
                                      images: project.images || '',
                                      tech: project.tech,
                                      category: project.category || '',
                                      liveUrl: project.liveUrl || '',
                                      githubUrl: project.githubUrl || '',
                                      featured: project.featured,
                                    });
                                  }}
                                >
                                  <Pencil className="w-3.5 h-3.5" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-muted-foreground hover:text-red-400 h-8 w-8 cursor-pointer"
                                  onClick={() => handleDelete(project.id)}
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </TabsContent>

                  {/* Contacts tab */}
                  <TabsContent value="contacts" className="mt-4 space-y-2">
                    {contacts.length === 0 ? (
                      <p className="text-center text-muted-foreground py-8 text-sm">Aucun message pour le moment.</p>
                    ) : (
                      contacts.map((contact) => (
                        <div
                          key={contact.id}
                          className={`glass rounded-xl p-4 ${!contact.read ? 'border-l-2 border-l-purple-500' : ''}`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-medium text-white">{contact.name}</span>
                                <span className="text-xs text-muted-foreground">{contact.email}</span>
                                {!contact.read && (
                                  <Badge className="bg-purple-500/20 text-purple-400 text-[10px]">Nouveau</Badge>
                                )}
                              </div>
                              <p className="text-sm font-medium text-purple-400 mb-1">{contact.subject}</p>
                              <p className="text-xs text-muted-foreground">{contact.message}</p>
                            </div>
                            {!contact.read && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-green-400 cursor-pointer shrink-0"
                                onClick={() => handleMarkRead(contact.id)}
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </Button>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </TabsContent>
                </Tabs>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
