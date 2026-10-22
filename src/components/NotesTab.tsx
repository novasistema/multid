import React, { useState } from 'react';
import { LessonItem } from '../types/course';
import { FileText, Download, Trash2, ExternalLink, BookOpen, Clock } from 'lucide-react';
import { getLessonNotes, saveLessonNote, LessonNote } from '../utils/courseHelpers';

interface NotesTabProps {
  onOpenLesson: (lessonId: string) => void;
}

export const NotesTab: React.FC<NotesTabProps> = ({ onOpenLesson }) => {
  const [notes, setNotes] = useState<Record<string, LessonNote>>(() => getLessonNotes());
  const [searchTerm, setSearchTerm] = useState('');

  const notesList = Object.values(notes).filter((n) => n.text.trim().length > 0);

  const filtered = notesList.filter((n) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      n.lessonTitle.toLowerCase().includes(term) ||
      n.moduleTitle.toLowerCase().includes(term) ||
      n.text.toLowerCase().includes(term)
    );
  });

  const handleDelete = (lessonId: string) => {
    if (confirm('¿Eliminar esta nota?')) {
      const copy = { ...notes };
      delete copy[lessonId];
      setNotes(copy);
      localStorage.setItem('ide_lesson_notes', JSON.stringify(copy));
    }
  };

  const handleExportAll = () => {
    let content = `# Cuaderno de Notas - Incubadora de Emprendedores\nFecha: ${new Date().toLocaleDateString()}\n\n`;
    notesList.forEach((n) => {
      content += `## ${n.lessonTitle} (${n.moduleTitle})\n${n.text}\n\n---\n\n`;
    });

    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cuaderno-incubadora-${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-4 bg-[#121220] rounded-2xl border border-[#232338] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-white font-display flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#f7bd3c]" />
            <span>Mi Cuaderno de Estudio</span>
          </h2>
          <p className="text-xs text-[#a0a0b8] mt-1">
            Revisa todas las notas personales que has tomado a lo largo de las clases.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportAll}
            disabled={notesList.length === 0}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1e1e32] text-[#e0e0f0] text-xs font-bold hover:bg-[#282842] hover:text-white border border-[#2d2d46] disabled:opacity-40 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#f7bd3c]" />
            <span>Exportar Todo (.md)</span>
          </button>
        </div>
      </div>

      {/* Filter */}
      {notesList.length > 0 && (
        <div className="max-w-md">
          <input
            type="text"
            placeholder="Buscar en tus notas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#121220] border border-[#232338] text-white focus:outline-none focus:border-[#f7bd3c]"
          />
        </div>
      )}

      {/* Notes List */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((note) => (
            <div
              key={note.lessonId}
              className="p-5 rounded-2xl bg-[#121220] border border-[#232338] flex flex-col justify-between space-y-4 hover:border-[#7c3aed]/40 transition-colors"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#1e1e32] text-[#f7bd3c]">
                      {note.moduleTitle}
                    </span>
                    <h3 className="text-sm font-bold text-white mt-1.5 line-clamp-2">
                      {note.lessonTitle}
                    </h3>
                  </div>

                  <button
                    onClick={() => handleDelete(note.lessonId)}
                    className="p-1 text-[#8e8ea3] hover:text-[#ef4444] transition-colors"
                    title="Eliminar nota"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="text-xs text-[#c0c0d8] leading-relaxed whitespace-pre-wrap line-clamp-6 bg-[#0e0e18] p-3 rounded-xl border border-[#1f1f32]">
                  {note.text}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#1e1e30] text-[11px]">
                <span className="text-[#808098] flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {new Date(note.updatedAt).toLocaleDateString()}
                </span>

                <button
                  onClick={() => onOpenLesson(note.lessonId)}
                  className="flex items-center gap-1 text-[#a78bfa] hover:text-white font-semibold transition-colors"
                >
                  <span>Ir a la clase</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl bg-[#121220] border border-[#232338] text-[#8e8ea3]">
          <BookOpen className="w-10 h-10 text-[#f7bd3c] mx-auto mb-3 opacity-60" />
          <h3 className="text-sm font-bold text-white mb-1">Aún no tienes notas guardadas</h3>
          <p className="text-xs text-[#8e8ea3] max-w-sm mx-auto">
            Abre cualquier clase en el reproductor y utiliza la pestaña "Mis Notas" para registrar tus ideas clave.
          </p>
        </div>
      )}

    </div>
  );
};
