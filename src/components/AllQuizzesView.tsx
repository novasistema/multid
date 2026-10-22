import React, { useState } from 'react';
import { ModuleQuiz, ModuleItem } from '../types/course';
import { Award, CheckCircle, HelpCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { saveQuizScore, getQuizScores } from '../utils/courseHelpers';

interface AllQuizzesViewProps {
  quizzes: ModuleQuiz[];
  modules: ModuleItem[];
}

export const AllQuizzesView: React.FC<AllQuizzesViewProps> = ({ quizzes, modules }) => {
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(
    quizzes.length > 0 ? quizzes[0].id : null
  );
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Map module id to module
  const moduleMap = new Map(modules.map((m) => [m.id, m]));
  const currentQuiz = quizzes.find((q) => q.id === selectedQuizId);
  const currentModule = currentQuiz ? moduleMap.get(currentQuiz.modulo_id) : null;

  // Get score history
  const quizScores = getQuizScores();

  const handleSelectQuiz = (quizId: string) => {
    setSelectedQuizId(quizId);
    setUserAnswers({});
    setIsSubmitted(false);
  };

  const handleSelectAnswer = (qIndex: number, optIndex: number) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({ ...prev, [qIndex]: optIndex }));
  };

  const handleSubmit = () => {
    if (!currentQuiz) return;
    let score = 0;
    currentQuiz.preguntas.forEach((q, idx) => {
      if (userAnswers[idx] === q.respuesta_correcta) {
        score++;
      }
    });
    saveQuizScore(currentQuiz.modulo_id, score, currentQuiz.preguntas.length);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setUserAnswers({});
    setIsSubmitted(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-4 bg-[#121220] rounded-2xl border border-[#232338] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-white font-display flex items-center gap-2">
            <Award className="w-5 h-5 text-[#f7bd3c]" />
            <span>Centro de Evaluaciones & Quizzes</span>
          </h2>
          <p className="text-xs text-[#a0a0b8] mt-1">
            Valida lo aprendido en cada módulo para consolidar tus conocimientos de negocio.
          </p>
        </div>
        <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-[#1e1e32] text-[#f7bd3c] border border-[#2e2e48] self-start sm:self-auto">
          {quizzes.length} Quizzes Disponibles
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left List of Quizzes */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-xs font-bold text-[#8e8ea3] uppercase tracking-wider px-2">
            Selecciona un Módulo
          </div>

          <div className="max-h-[600px] overflow-y-auto space-y-2 pr-1">
            {quizzes.map((q, idx) => {
              const mod = moduleMap.get(q.modulo_id);
              const isSelected = q.id === selectedQuizId;
              const savedScore = quizScores[q.modulo_id];

              return (
                <div
                  key={q.id}
                  onClick={() => handleSelectQuiz(q.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#1e1b38] border-[#f7bd3c] shadow-md'
                      : 'bg-[#121220] border-[#232338] hover:bg-[#18182a]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-[#1f1f33] text-[#8e8ea3]">
                      Módulo #{mod?.orden ?? idx}
                    </span>
                    {savedScore && (
                      <span className={`text-[10px] font-bold ${savedScore.passed ? 'text-[#10b981]' : 'text-[#f59e0b]'}`}>
                        Nota: {savedScore.score}/{savedScore.total}
                      </span>
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-white line-clamp-2">
                    {mod?.nombre || `Quiz ${idx + 1}`}
                  </h4>
                  <div className="text-[11px] text-[#8e8ea3] mt-1">
                    {q.preguntas.length} preguntas interactivas
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Active Quiz Player */}
        <div className="lg:col-span-8">
          {currentQuiz ? (
            <div className="bg-[#121220] p-6 rounded-2xl border border-[#232338] space-y-6">
              <div>
                <span className="text-[11px] font-bold text-[#f7bd3c] uppercase tracking-wider">
                  Evaluación Activa
                </span>
                <h3 className="text-lg font-bold text-white font-display mt-0.5">
                  {currentModule?.nombre || 'Quiz del Módulo'}
                </h3>
                <p className="text-xs text-[#a0a0b8] mt-1">
                  Lee con atención y selecciona la opción correcta para cada enunciado.
                </p>
              </div>

              {/* Questions */}
              <div className="space-y-6">
                {currentQuiz.preguntas.map((q, qIndex) => {
                  const selected = userAnswers[qIndex];
                  const isCorrect = selected === q.respuesta_correcta;

                  return (
                    <div
                      key={qIndex}
                      className="p-4 rounded-xl bg-[#161628] border border-[#282842] space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-sm font-semibold text-white">
                          {qIndex + 1}. {q.pregunta}
                        </span>
                        {q.dificultad && (
                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#202038] text-[#a0a0c0]">
                            {q.dificultad}
                          </span>
                        )}
                      </div>

                      <div className="space-y-2">
                        {q.opciones.map((opt, optIndex) => {
                          let btnStyle = 'bg-[#1b1b30] border-[#2e2e4a] text-[#c0c0d8] hover:bg-[#23233e]';
                          if (isSubmitted) {
                            if (optIndex === q.respuesta_correcta) {
                              btnStyle = 'bg-[#10b981]/20 border-[#10b981] text-[#10b981] font-bold';
                            } else if (selected === optIndex) {
                              btnStyle = 'bg-[#ef4444]/20 border-[#ef4444] text-[#ef4444] font-bold';
                            }
                          } else if (selected === optIndex) {
                            btnStyle = 'bg-[#7c3aed]/30 border-[#7c3aed] text-white font-bold';
                          }

                          return (
                            <button
                              key={optIndex}
                              onClick={() => handleSelectAnswer(qIndex, optIndex)}
                              className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs border transition-all ${btnStyle}`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>

                      {isSubmitted && q.explicacion && (
                        <div className={`p-3 rounded-lg text-xs leading-relaxed border ${
                          isCorrect ? 'bg-[#10b981]/10 text-[#6ee7b7] border-[#10b981]/30' : 'bg-[#ef4444]/10 text-[#fca5a5] border-[#ef4444]/30'
                        }`}>
                          <span className="font-bold">Explicación:</span> {q.explicacion}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Bottom Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-[#232338]">
                <div className="text-xs text-[#a0a0b8]">
                  {Object.keys(userAnswers).length} de {currentQuiz.preguntas.length} preguntas respondidas
                </div>

                {!isSubmitted ? (
                  <button
                    onClick={handleSubmit}
                    disabled={Object.keys(userAnswers).length === 0}
                    className="px-6 py-2.5 rounded-xl bg-[#f7bd3c] text-black font-bold text-xs hover:bg-[#e5a930] disabled:opacity-40 transition-colors shadow-md"
                  >
                    Enviar y Calificar
                  </button>
                ) : (
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#282842] text-white font-bold text-xs hover:bg-[#343454] transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reintentar Quiz</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-[#121220] p-12 rounded-2xl border border-[#232338] text-center text-[#8e8ea3]">
              Selecciona un quiz en la columna izquierda para comenzar.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
