import React, { useState } from 'react';
import { MessageSquare, ArrowLeft, Heart, Share2, Send, Plus, Sparkles, Filter, Pin } from 'lucide-react';

interface ComunidadViewProps {
  onBackToCourse: () => void;
}

interface PostItem {
  id: string;
  autor: string;
  tiempo: string;
  contenido: string;
  moduloRelacionado: string;
  likes: number;
  comentariosCount: number;
  isPinned?: boolean;
}

const seedPosts: PostItem[] = [
  {
    id: '1',
    autor: 'Equipo Incubadora (Mentores)',
    tiempo: 'Fijado por moderación',
    contenido: '📢 Bienvenidos a todos los nuevos miembros del Ecosistema Multi D. Recuerden que en la pestaña "HERRAMIENTAS" tienen acceso directo a Mi Administración, IncuMatch, IncuMarket, Buscador de Contactos, Pedidos y Casos de Éxito para potenciar su negocio.',
    moduloRelacionado: '🔴 ONBOARDING OFICIAL',
    likes: 142,
    comentariosCount: 38,
    isPinned: true,
  },
  {
    id: '2',
    autor: 'Nicolás Ibáñez (Mentor IA)',
    tiempo: 'Hace 4 horas',
    contenido: '🚀 Acabamos de actualizar los prompts y sistemas de prospección con IA en el Módulo 3. Si están usando automatizaciones para mensajes en frío, revisen la clase de enriquecimiento de leads.',
    moduloRelacionado: '🤖 Inteligencia Artificial',
    likes: 89,
    comentariosCount: 15,
  },
  {
    id: '3',
    autor: 'Javier Morales (Alumno)',
    tiempo: 'Hace 7 horas',
    contenido: 'Acabo de cerrar mi segunda cuenta inmobiliaria aplicando la estructura de llamadas del Módulo 4 (Vender en Frío). De verdad la clave está en el diagnóstico inicial y no apresurar el precio.',
    moduloRelacionado: '4) Vender en Frío',
    likes: 64,
    comentariosCount: 12,
  },
];

export const ComunidadView: React.FC<ComunidadViewProps> = ({ onBackToCourse }) => {
  const [posts, setPosts] = useState<PostItem[]>(seedPosts);
  const [newPostText, setNewPostText] = useState('');
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const newPost: PostItem = {
      id: Date.now().toString(),
      autor: 'Tú (Alumno IDE)',
      tiempo: 'Recién',
      contenido: newPostText,
      moduloRelacionado: 'Debate General',
      likes: 1,
      comentariosCount: 0,
    };

    setPosts([newPost, ...posts]);
    setNewPostText('');
  };

  const handleLike = (id: string) => {
    setLikedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-gradient-to-r from-[#21090e] via-[#161224] to-[#0f0f1c] rounded-2xl border border-[#3b1520] shadow-xl">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToCourse}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#1b1b2f] hover:bg-[#282844] text-[#f7bd3c] text-xs font-bold transition-colors border border-[#32324f]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← Volver al curso</span>
          </button>
          <div>
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#f7bd3c]/20 text-[#f7bd3c] tracking-wider">
              Comunidad Oficial
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white font-display mt-0.5">
              Comunidad IDE — Ecosistema Multi D
            </h1>
          </div>
        </div>

        <div className="text-xs text-[#a0a0b8]">
          Espacio de debate, alianzas y consultas entre emprendedores
        </div>
      </div>

      {/* New Post Box */}
      <div className="p-4 bg-[#121220] rounded-2xl border border-[#232338]">
        <form onSubmit={handleCreatePost} className="space-y-3">
          <textarea
            rows={3}
            value={newPostText}
            onChange={(e) => setNewPostText(e.target.value)}
            placeholder="Comparte una victoria, haz una pregunta a la comunidad o debate una lección..."
            className="w-full p-3.5 rounded-xl bg-[#0f0f1b] border border-[#26263e] text-xs text-white placeholder-[#787890] focus:outline-none focus:border-[#f7bd3c]"
          />
          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-[#8e8ea3]">
              Sé respetuoso y enfócate en aportar valor.
            </span>
            <button
              type="submit"
              disabled={!newPostText.trim()}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#6135f0] text-white text-xs font-bold hover:brightness-110 disabled:opacity-40 transition-all shadow-md"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publicar</span>
            </button>
          </div>
        </form>
      </div>

      {/* Feed */}
      <div className="space-y-4">
        {posts.map((post) => {
          const isLiked = Boolean(likedPosts[post.id]);
          const currentLikes = post.likes + (isLiked ? 1 : 0);

          return (
            <div
              key={post.id}
              className={`p-5 rounded-2xl bg-[#121220] border transition-all space-y-3 ${
                post.isPinned ? 'border-[#f7bd3c]/50 bg-[#161424]' : 'border-[#232338]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#6c131b] to-[#7c3aed] flex items-center justify-center font-bold text-white text-xs">
                    {post.autor.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-2">
                      <span>{post.autor}</span>
                      {post.isPinned && (
                        <span className="text-[10px] bg-[#f7bd3c]/20 text-[#f7bd3c] px-1.5 py-0.5 rounded font-bold flex items-center gap-1">
                          <Pin className="w-2.5 h-2.5" /> Fijado
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-[#707086]">{post.tiempo}</div>
                  </div>
                </div>

                <span className="text-[10px] font-semibold text-[#8e8ea3] bg-[#18182c] px-2 py-0.5 rounded border border-[#282840]">
                  {post.moduloRelacionado}
                </span>
              </div>

              <p className="text-xs text-[#d0d0e5] leading-relaxed whitespace-pre-wrap">
                {post.contenido}
              </p>

              <div className="flex items-center gap-4 pt-2 border-t border-[#1e1e32] text-xs text-[#8e8ea3]">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center gap-1.5 transition-colors ${
                    isLiked ? 'text-[#ec4899] font-bold' : 'hover:text-white'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
                  <span>{currentLikes} likes</span>
                </button>

                <button
                  onClick={() => alert('Abriendo hilo de comentarios...')}
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{post.comentariosCount} comentarios</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
