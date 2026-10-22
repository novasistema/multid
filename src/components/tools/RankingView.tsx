import React from 'react';
import { Trophy, ArrowLeft, Flame, Award, Star, Medal } from 'lucide-react';

interface RankingViewProps {
  onBackToCourse: () => void;
  userCompletedCount: number;
}

interface RankingUser {
  rank: number;
  nombre: string;
  negocio: string;
  puntos: number;
  racha: number;
  clasesCompletadas: number;
  badge: string;
}

const leaderboardSeed: RankingUser[] = [
  { rank: 1, nombre: 'Tomás Romero', negocio: 'Growth Pipeline B2B', puntos: 4850, racha: 42, clasesCompletadas: 172, badge: 'Leyenda IDE' },
  { rank: 2, nombre: 'Camila Villalba', negocio: 'Cosmética Natural D2C', puntos: 4420, racha: 38, clasesCompletadas: 165, badge: 'Emprendedor Pro' },
  { rank: 3, nombre: 'Javier Morales', negocio: 'CRM Inmobiliario', puntos: 3980, racha: 31, clasesCompletadas: 154, badge: 'Emprendedor Pro' },
  { rank: 4, nombre: 'Lucía Fernández', negocio: 'Agencia Reels & Content', puntos: 3620, racha: 25, clasesCompletadas: 141, badge: 'Escalador' },
  { rank: 5, nombre: 'Agustín Rivas', negocio: 'High-Ticket Closers', puntos: 3200, racha: 19, clasesCompletadas: 128, badge: 'Escalador' },
];

export const RankingView: React.FC<RankingViewProps> = ({ onBackToCourse, userCompletedCount }) => {
  const userPoints = userCompletedCount * 25 + 150;

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-gradient-to-r from-[#211608] via-[#161224] to-[#0f0f1c] rounded-2xl border border-[#3d2910] shadow-xl">
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
              Tabla de Líderes
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white font-display mt-0.5">
              Ranking de Alumnos — Incubadora de Emprendedores
            </h1>
          </div>
        </div>

        <div className="text-xs text-[#a0a0b8]">
          Gana puntos completando clases, aprobando quizzes y manteniendo tu racha diaria
        </div>
      </div>

      {/* Your current standing card */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-[#18182c] to-[#121220] border border-[#f7bd3c]/40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#6c131b] to-[#7c3aed] flex items-center justify-center font-bold text-white text-sm">
            TÚ
          </div>
          <div>
            <div className="text-xs font-bold text-[#f7bd3c]">Tu Posición Actual: #6 en el Ecosistema</div>
            <h3 className="text-base font-bold text-white font-display">Alumno IDE Pro</h3>
            <div className="text-xs text-[#8e8ea3] mt-0.5">
              {userCompletedCount} clases terminadas • 5 días de racha activa
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-[10px] text-[#8e8ea3] uppercase font-bold">Puntos Totales</div>
            <div className="text-xl font-black text-[#f7bd3c] flex items-center gap-1">
              <Star className="w-4 h-4 fill-current" /> {userPoints} pts
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="rounded-2xl bg-[#121220] border border-[#232338] overflow-hidden">
        <div className="p-4 bg-[#0e0e18] border-b border-[#232338] flex items-center justify-between text-xs font-bold text-[#8e8ea3] uppercase tracking-wider">
          <span>Posición & Alumno</span>
          <div className="flex items-center gap-8">
            <span className="hidden sm:inline">Racha</span>
            <span className="hidden sm:inline">Clases</span>
            <span>Puntaje</span>
          </div>
        </div>

        <div className="divide-y divide-[#1b1b2d]">
          {leaderboardSeed.map((u) => (
            <div
              key={u.rank}
              className="p-4 flex items-center justify-between gap-4 hover:bg-[#18182c] transition-colors"
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-extrabold text-xs ${
                    u.rank === 1
                      ? 'bg-[#f7bd3c] text-black shadow-md'
                      : u.rank === 2
                      ? 'bg-[#cbd5e1] text-black'
                      : u.rank === 3
                      ? 'bg-[#d97706] text-white'
                      : 'bg-[#1e1e32] text-[#8e8ea3]'
                  }`}
                >
                  {u.rank}
                </div>
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <span>{u.nombre}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#1e1e32] text-[#f7bd3c] font-semibold">
                      {u.badge}
                    </span>
                  </div>
                  <div className="text-xs text-[#8e8ea3]">{u.negocio}</div>
                </div>
              </div>

              <div className="flex items-center gap-8 text-xs font-semibold">
                <div className="hidden sm:flex items-center gap-1 text-[#f97316]">
                  <Flame className="w-3.5 h-3.5 fill-current" />
                  <span>{u.racha} días</span>
                </div>

                <div className="hidden sm:block text-[#a0a0b8]">
                  {u.clasesCompletadas} clases
                </div>

                <div className="text-[#f7bd3c] font-bold text-sm min-w-[70px] text-right">
                  {u.puntos} pts
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
