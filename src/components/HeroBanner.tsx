import React from 'react';
import { Course, LessonItem } from '../types/course';
import { Play, Sparkles, Award, Video, CheckCircle, Clock, BookOpen } from 'lucide-react';

interface HeroBannerProps {
  course: Course;
  totalModules: number;
  totalLessons: number;
  completedCount: number;
  activeLesson: LessonItem | null;
  onContinueLearning: () => void;
  onExploreModules: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  course,
  totalModules,
  totalLessons,
  completedCount,
  activeLesson,
  onContinueLearning,
  onExploreModules,
}) => {
  const percentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
  const heroImage = course.diseno?.hero_imagen_url || course.imagen_url;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1b080d] via-[#120d1c] to-[#0a0a14] border border-[#36131c] shadow-2xl mb-8">
      {/* Background ambient glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#7c3aed]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-96 h-96 bg-[#6c131b]/25 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 px-6 py-8 sm:px-10 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Details & Actions */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          
          {/* Top Pill / Badge */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-[#f7bd3c]/15 text-[#f7bd3c] border border-[#f7bd3c]/30 flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#f7bd3c]" />
              Formación Principal
            </span>
            <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-[#7c3aed]/20 text-[#c4b5fd] border border-[#7c3aed]/30 flex items-center gap-1">
              <Video className="w-3 h-3" />
              179 Clases en Video
            </span>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#1c1c30] text-[#a0a0b8] border border-[#2b2b46]">
              {totalModules} Módulos
            </span>
          </div>

          {/* Course Title */}
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-display tracking-tight leading-tight mb-3">
            {course.nombre}
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base text-[#c5c5d6] leading-relaxed mb-6 max-w-2xl font-light">
            {course.descripcion ||
              'Formación principal para emprendedores que quieren validar y escalar su negocio. Aprende sistemas probados, ventas en frío, marketing de alto impacto y mentalidad empresarial.'}
          </p>

          {/* Progress Bar in Banner */}
          <div className="mb-6 bg-[#0f0f1c]/80 p-3.5 rounded-xl border border-[#26263e] max-w-xl">
            <div className="flex items-center justify-between text-xs font-semibold mb-2">
              <span className="text-[#a0a0b8] flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-[#10b981]" />
                Progreso del curso
              </span>
              <span className="text-[#f7bd3c] font-bold">
                {completedCount} de {totalLessons} clases ({percentage}%)
              </span>
            </div>
            <div className="w-full bg-[#1e1e32] h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#6c131b] via-[#7c3aed] to-[#10b981] h-full transition-all duration-500 rounded-full"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onContinueLearning}
              className="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-[#8e1a24] to-[#6c131b] text-white font-bold text-sm shadow-lg shadow-[#6c131b]/40 hover:brightness-110 active:scale-[0.98] transition-all border border-[#f7bd3c]/30"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>
                {activeLesson ? `Continuar: ${activeLesson.nombre.slice(0, 28)}...` : 'Comenzar a aprender'}
              </span>
            </button>

            <button
              onClick={onExploreModules}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1b1b2d] hover:bg-[#23233a] text-[#e0e0ed] font-semibold text-sm transition-colors border border-[#2f2f4a]"
            >
              <BookOpen className="w-4 h-4 text-[#f7bd3c]" />
              <span>Ver Temario Completo</span>
            </button>
          </div>
        </div>

        {/* Right Column: Hero Cover Artwork */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative group w-full max-w-md">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#6c131b] to-[#7c3aed] rounded-2xl blur-lg opacity-40 group-hover:opacity-75 transition duration-500"></div>
            <div className="relative overflow-hidden rounded-xl bg-[#0e0e18] border border-[#381e28] shadow-2xl">
              {heroImage ? (
                <img
                  src={heroImage}
                  alt={course.nombre}
                  className="w-full h-56 sm:h-64 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    // Fallback artwork if network image fails
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e18] via-transparent to-transparent"></div>
              
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-semibold px-3 py-2 rounded-lg bg-[#0e0e18]/80 backdrop-blur-md border border-[#2b2b40]">
                <div className="flex items-center gap-1.5 text-[#f7bd3c]">
                  <Award className="w-4 h-4 text-[#f7bd3c]" />
                  <span>Acceso Completo & Evaluaciones</span>
                </div>
                <span className="text-[#a0a0b8] text-[11px]">Plataforma IDE</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
