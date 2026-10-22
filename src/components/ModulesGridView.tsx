import React from 'react';
import { StructuredModule, LessonItem } from '../types/course';
import { Layers, Play, CheckCircle, Video, BookOpen, Clock } from 'lucide-react';

interface ModulesGridViewProps {
  structuredModules: StructuredModule[];
  completedLessons: string[];
  onOpenLesson: (lesson: LessonItem) => void;
  onOpenModuleCurriculum: (moduleId: string) => void;
}

export const ModulesGridView: React.FC<ModulesGridViewProps> = ({
  structuredModules,
  completedLessons,
  onOpenLesson,
  onOpenModuleCurriculum,
}) => {
  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="p-4 bg-[#121220] rounded-2xl border border-[#232338] flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white font-display flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#f7bd3c]" />
            <span>Todos los Módulos de la Incubadora</span>
          </h2>
          <p className="text-xs text-[#a0a0b8] mt-1">
            Explora las etapas de crecimiento, validación y escalamiento de tu emprendimiento.
          </p>
        </div>
        <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-[#1e1e32] text-[#f7bd3c] border border-[#2e2e48]">
          {structuredModules.length} Fases Principales
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {structuredModules.map((m) => {
          const allModuleLessons: LessonItem[] = [
            ...m.lessons,
            ...m.submodules.flatMap((s) => s.lessons),
          ];
          const completedInModule = allModuleLessons.filter((l) => completedLessons.includes(l.id)).length;
          const totalInModule = allModuleLessons.length;
          const pct = totalInModule > 0 ? Math.round((completedInModule / totalInModule) * 100) : 0;
          const firstLesson = allModuleLessons[0];

          return (
            <div
              key={m.id}
              className="rounded-2xl bg-[#121220] border border-[#232338] hover:border-[#7c3aed]/50 transition-all duration-300 p-5 flex flex-col justify-between group shadow-lg hover:shadow-[#7c3aed]/10"
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className="w-7 h-7 rounded-lg bg-[#1a1a2e] border border-[#2b2b44] flex items-center justify-center text-xs font-extrabold text-[#f7bd3c]">
                    {m.orden}
                  </span>
                  <span className="text-[11px] font-semibold text-[#10b981] flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    {completedInModule}/{totalInModule} completadas
                  </span>
                </div>

                {/* Module Title */}
                <h3 className="text-base font-bold text-white font-display group-hover:text-[#f7bd3c] transition-colors line-clamp-2 mb-2">
                  {m.nombre}
                </h3>

                {m.descripcion && (
                  <p className="text-xs text-[#9c9cb2] line-clamp-2 mb-4 leading-relaxed">
                    {m.descripcion}
                  </p>
                )}

                {/* Submodules pill if exists */}
                {m.submodules.length > 0 && (
                  <div className="mb-4 text-[11px] text-[#a0a0be] bg-[#16162a] p-2 rounded-lg border border-[#24243a]">
                    <span className="font-semibold text-white">Submódulos: </span>
                    {m.submodules.map((s) => s.nombre.slice(0, 18)).join(', ')}...
                  </div>
                )}
              </div>

              <div>
                {/* Progress bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-[11px] text-[#8e8ea3] mb-1 font-semibold">
                    <span>Progreso</span>
                    <span className="text-white">{pct}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[#1e1e32] overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#7c3aed] to-[#10b981] rounded-full transition-all duration-300"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                {/* Action button */}
                <button
                  onClick={() => firstLesson && onOpenLesson(firstLesson)}
                  disabled={!firstLesson}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#1b1b30] hover:bg-[#7c3aed] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 border border-[#2d2d48] group-hover:border-[#7c3aed]"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{completedInModule > 0 ? 'Continuar Módulo' : 'Iniciar Módulo'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
