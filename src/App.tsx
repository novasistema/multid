import React, { useState, useEffect, useMemo } from 'react';
import initialCourseData from './data/courseData.json';
import { Course, CourseData, LessonItem, ModuleItem, StructuredModule, AppTab } from './types/course';
import { 
  buildStructuredModules, 
  getLinearLessonsList, 
  getCompletedLessons, 
  toggleLessonCompleted, 
  getLastActiveLessonId, 
  saveLastActiveLessonId 
} from './utils/courseHelpers';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { LessonPlayer } from './components/LessonPlayer';
import { CourseCurriculum } from './components/CourseCurriculum';
import { ModulesGridView } from './components/ModulesGridView';
import { AllQuizzesView } from './components/AllQuizzesView';
import { NotesTab } from './components/NotesTab';
import { SearchModal } from './components/SearchModal';

// Tools components
import { MiAdministracionView } from './components/tools/MiAdministracionView';
import { IncuMatchView } from './components/tools/IncuMatchView';
import { IncuMarketView } from './components/tools/IncuMarketView';
import { BuscadorContactosView } from './components/tools/BuscadorContactosView';
import { PedidosView } from './components/tools/PedidosView';
import { CasosExitoView } from './components/tools/CasosExitoView';
import { ComunidadView } from './components/tools/ComunidadView';
import { RankingView } from './components/tools/RankingView';

export default function App() {
  const [courseData] = useState<CourseData>(initialCourseData as unknown as CourseData);
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => getCompletedLessons());
  const [activeTab, setActiveTab] = useState<AppTab>('player');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Compute hierarchical modules
  const structuredModules = useMemo(() => {
    return buildStructuredModules(courseData.modules, courseData.lessons);
  }, [courseData.modules, courseData.lessons]);

  // Compute linear lessons order for prev/next navigation
  const linearLessons = useMemo(() => {
    return getLinearLessonsList(structuredModules);
  }, [structuredModules]);

  // Active lesson selection (defaults to last saved active or first lesson)
  const [activeLessonId, setActiveLessonId] = useState<string | null>(() => {
    const saved = getLastActiveLessonId();
    if (saved && courseData.lessons.some((l) => l.id === saved)) {
      return saved;
    }
    return courseData.lessons[0]?.id || null;
  });

  const activeLesson = useMemo(() => {
    return courseData.lessons.find((l) => l.id === activeLessonId) || courseData.lessons[0] || null;
  }, [courseData.lessons, activeLessonId]);

  // Module of the active lesson
  const currentModule = useMemo(() => {
    if (!activeLesson) return null;
    return courseData.modules.find((m) => m.id === activeLesson.modulo_id) || null;
  }, [courseData.modules, activeLesson]);

  // Quiz for the current module
  const currentModuleQuiz = useMemo(() => {
    if (!activeLesson) return null;
    return courseData.quizzes.find((q) => q.modulo_id === activeLesson.modulo_id) || null;
  }, [courseData.quizzes, activeLesson]);

  // Handle lesson selection
  const handleSelectLesson = (lesson: LessonItem) => {
    setActiveLessonId(lesson.id);
    saveLastActiveLessonId(lesson.id);
    setActiveTab('player');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle module selection from player dropdown
  const handleSelectModule = (moduleId: string) => {
    const firstLessonInMod = courseData.lessons
      .filter((l) => l.modulo_id === moduleId)
      .sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0))[0];
    if (firstLessonInMod) {
      handleSelectLesson(firstLessonInMod);
    }
  };

  // Toggle completion
  const handleToggleComplete = (lessonId: string) => {
    const updated = toggleLessonCompleted(lessonId);
    setCompletedLessons(updated);
  };

  // Keyboard shortcut ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Course switcher
  const handleSelectCourse = (selectedCourse: Course) => {
    if (selectedCourse.id === courseData.course.id) return;
    alert(`Has seleccionado ${selectedCourse.nombre}. Esta copia contiene la base de datos completa de Incubadora de Emprendedores (7a4c2598-d145-4a07-a073-116fe25d5f89).`);
  };

  const handleBackToCourse = () => {
    setActiveTab('player');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Determine if viewing a tool or the course player
  const isToolView = [
    'mi-administracion',
    'incumatch',
    'incumarket',
    'contactos',
    'pedidos',
    'casos-exito',
    'comunidad',
    'ranking',
  ].includes(activeTab);

  return (
    <div className="min-h-screen bg-[#090910] text-[#f1f1f6] flex flex-col font-sans selection:bg-[#7c3aed] selection:text-white">
      
      {/* Top Header with Tools Menu & Community */}
      <Header
        currentCourse={courseData.course}
        allCourses={courseData.all_courses}
        completedCount={completedLessons.length}
        totalLessons={courseData.lessons.length}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSearch={() => setIsSearchOpen(true)}
        onSelectCourse={handleSelectCourse}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Hero banner shown on main course views */}
        {!isToolView && (
          <HeroBanner
            course={courseData.course}
            totalModules={courseData.modules.length}
            totalLessons={courseData.lessons.length}
            completedCount={completedLessons.length}
            activeLesson={activeLesson}
            onContinueLearning={() => {
              setActiveTab('player');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onExploreModules={() => {
              setActiveTab('curriculum');
            }}
          />
        )}

        {/* 1. Course Views */}
        {activeTab === 'player' && activeLesson && (
          <LessonPlayer
            lesson={activeLesson}
            currentModule={currentModule}
            structuredModules={structuredModules}
            allLessons={linearLessons}
            completedLessons={completedLessons}
            moduleQuiz={currentModuleQuiz}
            onToggleComplete={handleToggleComplete}
            onSelectLesson={handleSelectLesson}
            onSelectModule={handleSelectModule}
          />
        )}

        {activeTab === 'curriculum' && (
          <CourseCurriculum
            structuredModules={structuredModules}
            completedLessons={completedLessons}
            activeLessonId={activeLessonId}
            onSelectLesson={handleSelectLesson}
            onToggleComplete={handleToggleComplete}
          />
        )}

        {activeTab === 'modules' && (
          <ModulesGridView
            structuredModules={structuredModules}
            completedLessons={completedLessons}
            onOpenLesson={handleSelectLesson}
            onOpenModuleCurriculum={(modId) => {
              handleSelectModule(modId);
              setActiveTab('curriculum');
            }}
          />
        )}

        {activeTab === 'quizzes' && (
          <AllQuizzesView
            quizzes={courseData.quizzes}
            modules={courseData.modules}
          />
        )}

        {activeTab === 'notes' && (
          <NotesTab
            onOpenLesson={(lessonId) => {
              const target = courseData.lessons.find((l) => l.id === lessonId);
              if (target) handleSelectLesson(target);
            }}
          />
        )}

        {/* 2. Herramientas Views (From Dropdown in user's screenshot) */}
        {activeTab === 'mi-administracion' && (
          <MiAdministracionView onBackToCourse={handleBackToCourse} />
        )}

        {activeTab === 'incumatch' && (
          <IncuMatchView onBackToCourse={handleBackToCourse} />
        )}

        {activeTab === 'incumarket' && (
          <IncuMarketView onBackToCourse={handleBackToCourse} />
        )}

        {activeTab === 'contactos' && (
          <BuscadorContactosView onBackToCourse={handleBackToCourse} />
        )}

        {activeTab === 'pedidos' && (
          <PedidosView onBackToCourse={handleBackToCourse} />
        )}

        {activeTab === 'casos-exito' && (
          <CasosExitoView onBackToCourse={handleBackToCourse} />
        )}

        {/* 3. Community and Ranking Views */}
        {activeTab === 'comunidad' && (
          <ComunidadView onBackToCourse={handleBackToCourse} />
        )}

        {activeTab === 'ranking' && (
          <RankingView
            onBackToCourse={handleBackToCourse}
            userCompletedCount={completedLessons.length}
          />
        )}

      </main>

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        allLessons={courseData.lessons}
        modules={courseData.modules}
        onSelectLesson={handleSelectLesson}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-[#1e1e30] bg-[#0c0c16] py-8 text-xs text-[#707088]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-[#6c131b] flex items-center justify-center font-bold text-[#f7bd3c] text-xs">
              IDE
            </div>
            <span className="font-semibold text-white">
              Incubadora de Emprendedores — Ecosistema Multi D
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-[11px]">
            <button onClick={() => setActiveTab('mi-administracion')} className="hover:text-[#f7bd3c]">
              Mi Administración
            </button>
            <span>•</span>
            <button onClick={() => setActiveTab('incumatch')} className="hover:text-[#f7bd3c]">
              IncuMatch
            </button>
            <span>•</span>
            <button onClick={() => setActiveTab('incumarket')} className="hover:text-[#f7bd3c]">
              IncuMarket
            </button>
            <span>•</span>
            <button onClick={() => setActiveTab('contactos')} className="hover:text-[#f7bd3c]">
              Contactos
            </button>
            <span>•</span>
            <button onClick={() => setActiveTab('pedidos')} className="hover:text-[#f7bd3c]">
              Pedidos
            </button>
            <span>•</span>
            <button onClick={() => setActiveTab('casos-exito')} className="hover:text-[#f7bd3c]">
              Casos de Éxito
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
