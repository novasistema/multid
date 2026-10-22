import React, { useState, useRef, useEffect } from 'react';
import { Course, AppTab } from '../types/course';
import { 
  Play, 
  Search, 
  CheckCircle2, 
  BookOpen, 
  FileText, 
  Layers, 
  ChevronDown, 
  Award,
  Users,
  Briefcase,
  Heart,
  ShoppingBag,
  Star,
  Trophy,
  Flame,
  ArrowLeft,
  FileSpreadsheet
} from 'lucide-react';

interface HeaderProps {
  currentCourse: Course;
  allCourses: Course[];
  completedCount: number;
  totalLessons: number;
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  onOpenSearch: () => void;
  onSelectCourse: (course: Course) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCourse,
  allCourses,
  completedCount,
  totalLessons,
  activeTab,
  setActiveTab,
  onOpenSearch,
  onSelectCourse,
}) => {
  const [courseDropdownOpen, setCourseDropdownOpen] = useState(false);
  const [herramientasOpen, setHerramientasOpen] = useState(false);
  const herramientasRef = useRef<HTMLDivElement | null>(null);

  const percentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (herramientasRef.current && !herramientasRef.current.contains(event.target as Node)) {
        setHerramientasOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isToolActive = [
    'mi-administracion',
    'incumatch',
    'incumarket',
    'contactos',
    'pedidos',
    'casos-exito',
  ].includes(activeTab);

  const herramientasItems: Array<{
    tab: AppTab;
    title: string;
    sub: string;
    icon: React.ReactNode;
  }> = [
    {
      tab: 'mi-administracion',
      title: 'MI ADMINISTRACIÓN',
      sub: 'Tablero de tu negocio',
      icon: <FileSpreadsheet className="w-4 h-4 text-[#8c7237]" />,
    },
    {
      tab: 'incumatch',
      title: 'INCUMATCH',
      sub: 'Conexiones y contactos',
      icon: <Heart className="w-4 h-4 text-[#8c7237]" />,
    },
    {
      tab: 'incumarket',
      title: 'INCUMARKET',
      sub: 'Negocios del ecosistema',
      icon: <ShoppingBag className="w-4 h-4 text-[#8c7237]" />,
    },
    {
      tab: 'contactos',
      title: 'BUSCADOR DE CONTACTOS',
      sub: '¿A quién necesitás?',
      icon: <Users className="w-4 h-4 text-[#8c7237]" />,
    },
    {
      tab: 'pedidos',
      title: 'PEDIDOS',
      sub: 'Necesidades y propuestas',
      icon: <Briefcase className="w-4 h-4 text-[#8c7237]" />,
    },
    {
      tab: 'casos-exito',
      title: 'CASOS DE ÉXITO',
      sub: 'Logros verificados',
      icon: <Star className="w-4 h-4 text-[#8c7237]" />,
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0d0d18]/95 backdrop-blur-md border-b border-[#232338]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Main Bar */}
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Left: Brand + Course Switcher */}
          <div className="flex items-center gap-2.5">
            <div 
              onClick={() => setActiveTab('player')}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#8e1a24] to-[#40060b] border border-[#f7bd3c]/40 flex items-center justify-center font-display font-extrabold text-[#f7bd3c] text-base sm:text-lg shadow-md tracking-wider group-hover:scale-105 transition-transform">
                IDE
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#f7bd3c]">
                  ECOSISTEMA MULTI D
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-white font-display tracking-tight leading-none truncate max-w-[170px] md:max-w-xs">
                  Incubadora de Emprendedores
                </span>
              </div>
            </div>

            {/* If in a tool, show quick return pill */}
            {isToolActive && (
              <button
                onClick={() => setActiveTab('player')}
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-lg bg-[#6c131b]/30 text-[#f7bd3c] border border-[#f7bd3c]/40 hover:bg-[#6c131b]/50 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Volver al curso</span>
              </button>
            )}
          </div>

          {/* Center: Ecosystem Main Buttons (COMUNIDAD, HERRAMIENTAS, RANKING) */}
          <div className="flex items-center gap-2">
            
            {/* 1. COMUNIDAD Button */}
            <button
              onClick={() => setActiveTab('comunidad')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all border ${
                activeTab === 'comunidad'
                  ? 'bg-[#6c131b] text-white border-[#f7bd3c] shadow-md shadow-[#6c131b]/40'
                  : 'bg-[#181829] text-[#e0e0ed] border-[#36131c] hover:border-[#f7bd3c]/60 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-[#f7bd3c]" />
              <span className="hidden xs:inline">Comunidad</span>
            </button>

            {/* 2. HERRAMIENTAS Dropdown Button (matching screenshot exactly) */}
            <div className="relative" ref={herramientasRef}>
              <button
                onClick={() => setHerramientasOpen(!herramientasOpen)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all border ${
                  isToolActive || herramientasOpen
                    ? 'bg-[#6c131b] text-[#f7bd3c] border-[#f7bd3c] shadow-lg shadow-[#6c131b]/50'
                    : 'bg-[#1f0d14] text-[#f5eedc] border-[#521c25] hover:border-[#f7bd3c]/60'
                }`}
                aria-haspopup="menu"
                aria-expanded={herramientasOpen}
              >
                <Briefcase className="w-3.5 h-3.5 text-[#f7bd3c]" />
                <span>Herramientas</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${herramientasOpen ? 'rotate-180 text-[#f7bd3c]' : 'text-[#a08a90]'}`} />
              </button>

              {/* Exact Cream/Sand Popover Dropdown from user screenshot */}
              {herramientasOpen && (
                <div 
                  role="menu"
                  className="absolute right-0 sm:left-0 sm:right-auto mt-2 w-[270px] sm:w-[290px] bg-[#FAF7F2] border border-[#d6c7b6] rounded-xl shadow-[0_16px_50px_rgba(46,14,19,0.25)] p-2 z-50 animate-fade-in"
                >
                  <div className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-widest text-[#8c7237] border-b border-[#e5dcce] mb-1">
                    Módulos & Herramientas IDE
                  </div>

                  {herramientasItems.map((item) => {
                    const isCurrent = activeTab === item.tab;

                    return (
                      <button
                        key={item.tab}
                        onClick={() => {
                          setHerramientasOpen(false);
                          setActiveTab(item.tab);
                        }}
                        className={`w-full flex items-center gap-3 p-2.5 rounded-lg text-left transition-colors group ${
                          isCurrent ? 'bg-[#ede5d8]' : 'hover:bg-[#f2ece1]'
                        }`}
                      >
                        {/* Gold Icon Box */}
                        <span className="w-8 h-8 rounded-lg bg-[rgba(140,114,55,0.14)] border border-[rgba(140,114,55,0.2)] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                          {item.icon}
                        </span>

                        {/* Title and Subtitle */}
                        <span className="flex flex-col min-w-0">
                          <span className="text-[12px] font-bold text-[#2e0e13] font-display tracking-wide leading-tight">
                            {item.title}
                          </span>
                          <span className="text-[11px] text-[#6e6862] font-medium leading-tight">
                            {item.sub}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 3. RANKING Trophy Button */}
            <button
              onClick={() => setActiveTab('ranking')}
              className={`p-2 rounded-full border transition-all ${
                activeTab === 'ranking'
                  ? 'bg-[#f7bd3c] text-black border-[#f7bd3c] shadow-md'
                  : 'bg-[#181829] text-[#f7bd3c] border-[#36131c] hover:border-[#f7bd3c]/60'
              }`}
              title="Tabla de Líderes y Ranking"
            >
              <Trophy className="w-4 h-4 fill-current" />
            </button>

            {/* Streak Pill */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181829] border border-[rgba(187,157,84,0.30)] text-[11px] font-bold text-[#f5eedc] uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 text-[#f97316] fill-current" />
              <span>5 días</span>
            </div>

          </div>

          {/* Right: Search + Course Progress */}
          <div className="flex items-center gap-2">
            
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 text-xs rounded-xl bg-[#151525] border border-[#2a2a40] text-[#9e9eb4] hover:text-white hover:border-[#7c3aed] transition-colors"
              title="Buscar en las 179 clases"
            >
              <Search className="w-3.5 h-3.5 text-[#f7bd3c]" />
              <span className="hidden xl:inline">Buscar clases...</span>
              <kbd className="hidden xl:inline px-1.5 py-0.5 text-[10px] bg-[#222236] text-[#8e8ea3] rounded border border-[#30304a]">
                ⌘K
              </kbd>
            </button>

            {/* Progress Circle Pill */}
            <div 
              onClick={() => setActiveTab('player')}
              className="flex items-center gap-2 px-2.5 py-1 bg-[#141424] rounded-xl border border-[#232338] cursor-pointer hover:border-[#7c3aed] transition-colors"
              title="Progreso del curso"
            >
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-[11px] font-bold text-white leading-none">
                  {completedCount}/{totalLessons}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-[#9e9eb4]">
                  {percentage}%
                </span>
              </div>
              <div className="w-7 h-7 sm:w-8 sm:h-8 relative flex items-center justify-center">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 transform -rotate-90">
                  <circle
                    cx="16"
                    cy="16"
                    r="12"
                    stroke="#232338"
                    strokeWidth="3"
                    fill="transparent"
                  />
                  <circle
                    cx="16"
                    cy="16"
                    r="12"
                    stroke="#10b981"
                    strokeWidth="3"
                    strokeDasharray={75.4}
                    strokeDashoffset={75.4 - (75.4 * percentage) / 100}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-500 ease-out"
                  />
                </svg>
                <CheckCircle2 className="w-3 h-3 text-[#10b981] absolute" />
              </div>
            </div>

          </div>

        </div>

        {/* Secondary Sub-navigation Bar (Course Sections) */}
        <div className="flex items-center overflow-x-auto py-2 gap-1.5 border-t border-[#1f1f33] no-scrollbar">
          <button
            onClick={() => setActiveTab('player')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs whitespace-nowrap rounded-lg font-bold transition-all ${
              activeTab === 'player'
                ? 'bg-gradient-to-r from-[#7c3aed] to-[#6135f0] text-white shadow-md'
                : 'text-[#a2a2bc] hover:text-white hover:bg-[#18182c]'
            }`}
          >
            <Play className="w-3 h-3 fill-current" />
            <span>Reproductor de Clases</span>
          </button>

          <button
            onClick={() => setActiveTab('curriculum')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs whitespace-nowrap rounded-lg font-bold transition-all ${
              activeTab === 'curriculum'
                ? 'bg-[#282842] text-white border border-[#3c3c60]'
                : 'text-[#a2a2bc] hover:text-white hover:bg-[#18182c]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-[#f7bd3c]" />
            <span>Temario</span>
          </button>

          <button
            onClick={() => setActiveTab('modules')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs whitespace-nowrap rounded-lg font-bold transition-all ${
              activeTab === 'modules'
                ? 'bg-[#282842] text-white border border-[#3c3c60]'
                : 'text-[#a2a2bc] hover:text-white hover:bg-[#18182c]'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-[#f7bd3c]" />
            <span>Módulos (40)</span>
          </button>

          <button
            onClick={() => setActiveTab('quizzes')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs whitespace-nowrap rounded-lg font-bold transition-all ${
              activeTab === 'quizzes'
                ? 'bg-[#282842] text-white border border-[#3c3c60]'
                : 'text-[#a2a2bc] hover:text-white hover:bg-[#18182c]'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-[#f7bd3c]" />
            <span>Evaluaciones</span>
          </button>

          <button
            onClick={() => setActiveTab('notes')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs whitespace-nowrap rounded-lg font-bold transition-all ${
              activeTab === 'notes'
                ? 'bg-[#282842] text-white border border-[#3c3c60]'
                : 'text-[#a2a2bc] hover:text-white hover:bg-[#18182c]'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-[#f7bd3c]" />
            <span>Mi Cuaderno</span>
          </button>
        </div>

      </div>
    </header>
  );
};
