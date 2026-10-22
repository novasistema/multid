import React, { useState } from 'react';
import { StructuredModule, LessonItem } from '../types/course';
import { 
  ChevronDown, 
  ChevronRight, 
  Play, 
  CheckCircle, 
  Circle, 
  Clock, 
  Video, 
  BookOpen, 
  Filter, 
  Check, 
  Search,
  Sparkles,
  Layers
} from 'lucide-react';
import { formatDuration } from '../utils/courseHelpers';

interface CourseCurriculumProps {
  structuredModules: StructuredModule[];
  completedLessons: string[];
  activeLessonId: string | null;
  onSelectLesson: (lesson: LessonItem) => void;
  onToggleComplete: (lessonId: string) => void;
}

export const CourseCurriculum: React.FC<CourseCurriculumProps> = ({
  structuredModules,
  completedLessons,
  activeLessonId,
  onSelectLesson,
  onToggleComplete,
}) => {
  // Keep track of which modules are expanded
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(() => {
    // Open first 3 modules by default
    const initial: Record<string, boolean> = {};
    structuredModules.slice(0, 3).forEach((m) => {
      initial[m.id] = true;
    });
    return initial;
  });

  const [filterType, setFilterType] = useState<'all' | 'pending' | 'completed' | 'video'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const toggleModule = (id: string) => {
    setExpandedModules((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    structuredModules.forEach((m) => {
      all[m.id] = true;
      m.submodules.forEach((sub) => {
        all[sub.id] = true;
      });
    });
    setExpandedModules(all);
  };

  const collapseAll = () => {
    setExpandedModules({});
  };

  // Helper to filter lessons based on criteria
  const filterLesson = (l: LessonItem) => {
    if (searchTerm) {
      const match = l.nombre.toLowerCase().includes(searchTerm.toLowerCase());
      if (!match) return false;
    }
    if (filterType === 'completed') return completedLessons.includes(l.id);
    if (filterType === 'pending') return !completedLessons.includes(l.id);
    if (filterType === 'video') return Boolean(l.bunny_video_url || l.video_embed_url);
    return true;
  };

  return (
    <div className="space-y-6">
      
      {/* Curriculum Header & Filter Toolbar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 bg-[#121220] rounded-2xl border border-[#232338]">
        
        {/* Title & Count */}
        <div>
          <h2 className="text-xl font-bold text-white font-display flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#f7bd3c]" />
            <span>Temario y Contenido Completo</span>
          </h2>
          <p className="text-xs text-[#a0a0b8] mt-1">
            Explora las lecciones prácticas paso a paso.
          </p>
        </div>

        {/* Search & Actions */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Search box */}
          <div className="relative flex-1 sm:w-60">
            <Search className="w-3.5 h-3.5 text-[#8e8ea3] absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Filtrar por nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[#18182c] border border-[#2d2d46] text-white focus:outline-none focus:border-[#f7bd3c]"
            />
          </div>

          {/* Quick Filter buttons */}
          <div className="flex items-center gap-1 bg-[#18182c] p-1 rounded-xl border border-[#2b2b44]">
            <button
              onClick={() => setFilterType('all')}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-colors ${
                filterType === 'all' ? 'bg-[#7c3aed] text-white' : 'text-[#8e8ea3] hover:text-white'
              }`}
            >
              Todas
            </button>
            <button
              onClick={() => setFilterType('pending')}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-colors ${
                filterType === 'pending' ? 'bg-[#7c3aed] text-white' : 'text-[#8e8ea3] hover:text-white'
              }`}
            >
              Pendientes
            </button>
            <button
              onClick={() => setFilterType('completed')}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-colors ${
                filterType === 'completed' ? 'bg-[#7c3aed] text-white' : 'text-[#8e8ea3] hover:text-white'
              }`}
            >
              Completadas
            </button>
          </div>

          {/* Expand/Collapse buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={expandAll}
              className="px-2.5 py-1.5 text-xs text-[#a0a0b8] hover:text-white hover:bg-[#1f1f33] rounded-lg transition-colors border border-[#2b2b42]"
            >
              Expandir todo
            </button>
            <button
              onClick={collapseAll}
              className="px-2.5 py-1.5 text-xs text-[#a0a0b8] hover:text-white hover:bg-[#1f1f33] rounded-lg transition-colors border border-[#2b2b42]"
            >
              Colapsar
            </button>
          </div>
        </div>

      </div>

      {/* Modules List */}
      <div className="space-y-4">
        {structuredModules.map((root, rootIndex) => {
          const isExpanded = Boolean(expandedModules[root.id]);
          
          // Count completed in this module (including submodules)
          const allModuleLessons: LessonItem[] = [
            ...root.lessons,
            ...root.submodules.flatMap((s) => s.lessons),
          ];
          const filteredDirect = root.lessons.filter(filterLesson);
          const hasFilteredSublessons = root.submodules.some((s) => s.lessons.some(filterLesson));
          
          // Skip if search active and nothing matches
          if (searchTerm && filteredDirect.length === 0 && !hasFilteredSublessons) {
            return null;
          }

          const completedInModule = allModuleLessons.filter((l) => completedLessons.includes(l.id)).length;
          const totalInModule = allModuleLessons.length;
          const moduleProgress = totalInModule > 0 ? Math.round((completedInModule / totalInModule) * 100) : 0;

          return (
            <div
              key={root.id}
              className="rounded-2xl bg-[#121220] border border-[#232338] overflow-hidden transition-all duration-200"
            >
              {/* Module Header Bar */}
              <div
                onClick={() => toggleModule(root.id)}
                className="p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-[#18182a] transition-colors select-none"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#1e1e34] to-[#121222] border border-[#2e2e4a] flex items-center justify-center text-[#f7bd3c] font-display font-extrabold text-xs flex-shrink-0">
                    {root.orden}
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-base font-bold text-white font-display truncate">
                      {root.nombre}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-[#8e8ea3] mt-0.5">
                      <span>{totalInModule} clases</span>
                      {root.submodules.length > 0 && (
                        <span>• {root.submodules.length} submódulos</span>
                      )}
                      <span>• {completedInModule} completadas</span>
                    </div>
                  </div>
                </div>

                {/* Right Progress & Chevron */}
                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="hidden sm:flex flex-col items-end gap-1">
                    <span className="text-[11px] font-bold text-[#f7bd3c]">
                      {moduleProgress}%
                    </span>
                    <div className="w-24 h-1.5 rounded-full bg-[#1e1e32] overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#7c3aed] to-[#10b981] rounded-full transition-all duration-300"
                        style={{ width: `${moduleProgress}%` }}
                      />
                    </div>
                  </div>

                  <div className="w-7 h-7 rounded-lg bg-[#18182c] flex items-center justify-center text-[#a0a0b8]">
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-[#f7bd3c]" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </div>
                </div>
              </div>

              {/* Collapsible Content */}
              {isExpanded && (
                <div className="border-t border-[#1e1e32] bg-[#0d0d16] p-3 sm:p-4 space-y-3">
                  
                  {/* Direct Lessons */}
                  {filteredDirect.length > 0 && (
                    <div className="divide-y divide-[#171728] rounded-xl bg-[#121220] border border-[#202034] overflow-hidden">
                      {filteredDirect.map((l, idx) => (
                        <LessonRow
                          key={l.id}
                          lesson={l}
                          index={idx + 1}
                          isActive={l.id === activeLessonId}
                          isCompleted={completedLessons.includes(l.id)}
                          onSelect={() => onSelectLesson(l)}
                          onToggleComplete={() => onToggleComplete(l.id)}
                        />
                      ))}
                    </div>
                  )}

                  {/* Submodules Tree */}
                  {root.submodules.map((sub) => {
                    const filteredSubLessons = sub.lessons.filter(filterLesson);
                    if (searchTerm && filteredSubLessons.length === 0) return null;

                    const subCompleted = sub.lessons.filter((l) => completedLessons.includes(l.id)).length;

                    return (
                      <div
                        key={sub.id}
                        className="rounded-xl bg-[#141424] border border-[#272740] p-3 sm:p-4 space-y-2.5"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2 font-bold text-[#e0e0f0]">
                            <Layers className="w-3.5 h-3.5 text-[#f7bd3c]" />
                            <span>{sub.nombre}</span>
                          </div>
                          <span className="text-[11px] text-[#8e8ea3]">
                            {subCompleted} / {sub.lessons.length} completadas
                          </span>
                        </div>

                        <div className="divide-y divide-[#1b1b2f] rounded-lg bg-[#0e0e1a] border border-[#202034] overflow-hidden">
                          {filteredSubLessons.map((sl, sIdx) => (
                            <LessonRow
                              key={sl.id}
                              lesson={sl}
                              index={sIdx + 1}
                              isActive={sl.id === activeLessonId}
                              isCompleted={completedLessons.includes(sl.id)}
                              onSelect={() => onSelectLesson(sl)}
                              onToggleComplete={() => onToggleComplete(sl.id)}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}

                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};

interface LessonRowProps {
  lesson: LessonItem;
  index: number;
  isActive: boolean;
  isCompleted: boolean;
  onSelect: () => void;
  onToggleComplete: () => void;
}

const LessonRow: React.FC<LessonRowProps> = ({
  lesson,
  index,
  isActive,
  isCompleted,
  onSelect,
  onToggleComplete,
}) => {
  return (
    <div
      onClick={onSelect}
      className={`p-3 sm:px-4 sm:py-3.5 flex items-center justify-between gap-3 cursor-pointer transition-colors ${
        isActive ? 'bg-[#1e1b38] border-l-4 border-[#f7bd3c]' : 'hover:bg-[#171728]'
      }`}
    >
      <div className="flex items-center gap-3 min-w-0">
        
        {/* Play Icon / Number badge */}
        <div
          className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors ${
            isActive
              ? 'bg-[#f7bd3c] text-black shadow-md'
              : 'bg-[#18182c] text-[#8e8ea3] group-hover:text-white'
          }`}
        >
          {isActive ? <Play className="w-3.5 h-3.5 fill-black" /> : index}
        </div>

        {/* Thumbnail preview if exists */}
        {lesson.thumbnail_url && (
          <img
            src={lesson.thumbnail_url}
            alt=""
            className="w-12 h-8 rounded object-cover border border-[#2b2b40] hidden sm:block flex-shrink-0"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        )}

        {/* Title and tags */}
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span
              className={`text-xs sm:text-sm font-semibold truncate ${
                isActive ? 'text-[#f7bd3c]' : 'text-[#e5e5f0]'
              }`}
            >
              {lesson.nombre}
            </span>

            {lesson.es_preview && (
              <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/30">
                Gratis
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-[11px] text-[#808098] mt-0.5">
            {lesson.bunny_video_url ? (
              <span className="flex items-center gap-1 text-[#a78bfa]">
                <Video className="w-3 h-3" />
                Video HD
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[#f7bd3c]">
                <BookOpen className="w-3 h-3" />
                Guía / Lectura
              </span>
            )}

            {lesson.duracion_segundos && (
              <span className="flex items-center gap-1">
                • <Clock className="w-2.5 h-2.5" />
                {formatDuration(lesson.duracion_segundos)}
              </span>
            )}

            {lesson.transcripcion && (
              <span className="hidden md:inline">• Con transcripción</span>
            )}
          </div>
        </div>
      </div>

      {/* Completion Toggle Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleComplete();
        }}
        className="p-1.5 text-[#8e8ea3] hover:text-[#10b981] transition-colors flex-shrink-0"
        title={isCompleted ? 'Desmarcar' : 'Marcar como completada'}
      >
        {isCompleted ? (
          <CheckCircle className="w-5 h-5 text-[#10b981]" />
        ) : (
          <Circle className="w-5 h-5 text-[#3b3b55]" />
        )}
      </button>
    </div>
  );
};
