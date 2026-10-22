import React, { useState, useEffect, useRef } from 'react';
import { LessonItem, ModuleItem } from '../types/course';
import { Search, X, Play, Video, BookOpen, Clock, ChevronRight } from 'lucide-react';
import { formatDuration } from '../utils/courseHelpers';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  allLessons: LessonItem[];
  modules: ModuleItem[];
  onSelectLesson: (lesson: LessonItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  allLessons,
  modules,
  onSelectLesson,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Map module id to name
  const moduleMap = new Map(modules.map((m) => [m.id, m.nombre]));

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const results = query.trim()
    ? allLessons
        .filter((l) => {
          const q = query.toLowerCase();
          const matchTitle = l.nombre.toLowerCase().includes(q);
          const matchDesc = l.descripcion?.toLowerCase().includes(q) || false;
          const matchTranscript = l.transcripcion?.toLowerCase().includes(q) || false;
          const moduleName = moduleMap.get(l.modulo_id)?.toLowerCase() || '';
          const matchModule = moduleName.includes(q);
          return matchTitle || matchDesc || matchTranscript || matchModule;
        })
        .slice(0, 20)
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-2xl bg-[#121220] border border-[#2e2e48] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 p-4 border-b border-[#232338] bg-[#0e0e18]">
          <Search className="w-5 h-5 text-[#f7bd3c]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por clase, tema, módulo o contenido transcrito..."
            className="flex-1 bg-transparent text-sm text-white placeholder-[#787890] focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#8e8ea3] hover:text-white hover:bg-[#1e1e32] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-[#18182c]">
          {query.trim() === '' ? (
            <div className="p-8 text-center text-xs text-[#8e8ea3]">
              Escribe palabras clave como <span className="text-[#f7bd3c]">"marketing"</span>,{' '}
              <span className="text-[#f7bd3c]">"ventas"</span>,{' '}
              <span className="text-[#f7bd3c]">"hábitos"</span> o{' '}
              <span className="text-[#f7bd3c]">"IA"</span> para buscar entre las 179 clases.
            </div>
          ) : results.length > 0 ? (
            results.map((l) => {
              const modTitle = moduleMap.get(l.modulo_id) || 'Módulo';

              return (
                <div
                  key={l.id}
                  onClick={() => {
                    onSelectLesson(l);
                    onClose();
                  }}
                  className="p-3.5 hover:bg-[#1a1a2e] rounded-xl cursor-pointer flex items-center justify-between gap-3 transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-[#18182c] border border-[#2b2b40] flex items-center justify-center text-[#f7bd3c] flex-shrink-0 group-hover:bg-[#7c3aed] group-hover:text-white transition-colors">
                      <Play className="w-3.5 h-3.5 fill-current" />
                    </div>

                    <div className="min-w-0">
                      <span className="text-[10px] font-bold text-[#f7bd3c] uppercase truncate block">
                        {modTitle}
                      </span>
                      <h4 className="text-xs sm:text-sm font-semibold text-white truncate group-hover:text-[#f7bd3c] transition-colors">
                        {l.nombre}
                      </h4>
                      <div className="flex items-center gap-2 text-[10px] text-[#808096] mt-0.5">
                        {l.bunny_video_url ? (
                          <span className="flex items-center gap-1 text-[#a78bfa]">
                            <Video className="w-3 h-3" /> Video HD
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-3 h-3" /> Guía
                          </span>
                        )}
                        {l.duracion_segundos && (
                          <span>• {formatDuration(l.duracion_segundos)}</span>
                        )}
                        {l.transcripcion && <span>• Transcripción indexada</span>}
                      </div>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-[#8e8ea3] group-hover:text-white transition-colors flex-shrink-0" />
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-xs text-[#8e8ea3]">
              No se encontraron clases que coincidan con <span className="text-white">"{query}"</span>.
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-[#0d0d16] border-t border-[#1e1e30] flex items-center justify-between text-[11px] text-[#707086]">
          <span>{results.length} coincidencias encontradas</span>
          <span>Presiona ESC para cerrar</span>
        </div>
      </div>
    </div>
  );
};
