import React, { useState, useEffect, useRef } from 'react';
import { LessonItem, ModuleItem, ModuleQuiz, StructuredModule } from '../types/course';
import { 
  Play, 
  Pause, 
  CheckCircle, 
  Circle, 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  FileText, 
  Award, 
  MessageSquare, 
  Volume2, 
  Download, 
  Copy, 
  Check, 
  Sparkles, 
  ExternalLink,
  Layers,
  Search,
  Clock
} from 'lucide-react';
import { formatDuration, saveLessonNote, getLessonNotes, LessonNote } from '../utils/courseHelpers';

interface LessonPlayerProps {
  lesson: LessonItem;
  currentModule: ModuleItem | null;
  structuredModules: StructuredModule[];
  allLessons: LessonItem[];
  completedLessons: string[];
  moduleQuiz: ModuleQuiz | null;
  onToggleComplete: (lessonId: string) => void;
  onSelectLesson: (lesson: LessonItem) => void;
  onSelectModule: (moduleId: string) => void;
}

export const LessonPlayer: React.FC<LessonPlayerProps> = ({
  lesson,
  currentModule,
  structuredModules,
  allLessons,
  completedLessons,
  moduleQuiz,
  onToggleComplete,
  onSelectLesson,
  onSelectModule,
}) => {
  const [activeTab, setActiveTab] = useState<'desc' | 'transcription' | 'quiz' | 'notes' | 'incubot'>('desc');
  const [noteText, setNoteText] = useState('');
  const [copiedTranscript, setCopiedTranscript] = useState(false);
  const [transcriptSearch, setTranscriptSearch] = useState('');
  const [audioPlaybackRate, setAudioPlaybackRate] = useState<number>(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Incubot chat state
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string }>>([]);
  const [chatInput, setChatInput] = useState('');

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Load existing note when lesson changes
  useEffect(() => {
    const notes = getLessonNotes();
    setNoteText(notes[lesson.id]?.text || '');
    setQuizAnswers({});
    setQuizSubmitted(false);
    setChatMessages([
      {
        sender: 'bot',
        text: `¡Hola! Soy Incubot, tu copiloto de aprendizaje para la clase: "${lesson.nombre}". ¿En qué puedo orientarte hoy sobre este contenido?`,
      },
    ]);
  }, [lesson.id]);

  // Handle note change and persist
  const handleNoteChange = (text: string) => {
    setNoteText(text);
    saveLessonNote({
      lessonId: lesson.id,
      lessonTitle: lesson.nombre,
      moduleTitle: currentModule?.nombre || 'Módulo',
      text,
      updatedAt: new Date().toISOString(),
    });
  };

  // Find previous and next lesson in linear order
  const currentIndex = allLessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const isCompleted = completedLessons.includes(lesson.id);

  // Copy transcript to clipboard
  const handleCopyTranscript = () => {
    if (!lesson.transcripcion) return;
    navigator.clipboard.writeText(lesson.transcripcion);
    setCopiedTranscript(true);
    setTimeout(() => setCopiedTranscript(false), 2000);
  };

  // Incubot quick prompt
  const handleSendPrompt = (promptText: string) => {
    if (!promptText.trim()) return;
    const userMsg = promptText.trim();
    setChatMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setChatInput('');

    setTimeout(() => {
      let botResponse = '';
      const lower = userMsg.toLowerCase();
      if (lower.includes('resumen') || lower.includes('clave') || lower.includes('puntos')) {
        botResponse = `📌 **Puntos clave de "${lesson.nombre}"**:\n1. Objetivo: Validar la propuesta y asegurar tracción real en tu negocio.\n2. Ejecución: Evitar la procrastinación en teoría y aplicar el sistema paso a paso.\n3. Medición: Monitorea tus métricas clave de conversión y satisfacción del cliente.`;
      } else if (lower.includes('ejercicio') || lower.includes('práctica')) {
        botResponse = `🎯 **Ejercicio práctico para hoy**:\n1. Escribe en tu cuaderno una lista de 5 acciones inmediatas basadas en lo aprendido.\n2. Ejecuta al menos una antes de pasar a la siguiente clase.\n3. Comparte tus dudas o resultados en la comunidad de Incubadora.`;
      } else {
        botResponse = `Excelente consulta respecto a "${lesson.nombre}". En esta lección el foco es adquirir claridad operativa y mentalidad de ejecución. Te recomiendo revisar la transcripción adjunta y anotar en "Mis Notas" cualquier idea específica para tu nicho.`;
      }
      setChatMessages((prev) => [...prev, { sender: 'bot', text: botResponse }]);
    }, 600);
  };

  // Lessons of current module for the sidebar playlist
  const moduleLessons = allLessons.filter((l) => l.modulo_id === lesson.modulo_id);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
      
      {/* Main Video & Content Column (8 cols) */}
      <div className="lg:col-span-8 flex flex-col gap-4">
        
        {/* Breadcrumb Header */}
        <div className="flex items-center justify-between gap-2 px-1">
          <div className="flex items-center gap-2 text-xs text-[#a0a0b8] truncate">
            <span className="font-semibold text-[#f7bd3c] truncate">
              {currentModule?.nombre || 'Módulo'}
            </span>
            <span>/</span>
            <span className="text-white truncate font-medium">{lesson.nombre}</span>
          </div>

          <span className="text-[11px] font-semibold text-[#9090aa] bg-[#171728] px-2.5 py-1 rounded-md border border-[#26263c] whitespace-nowrap">
            Clase {currentIndex + 1} de {allLessons.length}
          </span>
        </div>

        {/* Video Player Container */}
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black acad-video-glow">
          {lesson.bunny_video_url ? (
            <iframe
              src={lesson.bunny_video_url}
              title={lesson.nombre}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
            />
          ) : lesson.video_embed_url ? (
            <iframe
              src={lesson.video_embed_url}
              title={lesson.nombre}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
            />
          ) : (
            /* Non-video reading / guide lesson fallback */
            <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#1b0d18] via-[#111122] to-[#0d0d17] text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#f7bd3c]/10 border border-[#f7bd3c]/30 flex items-center justify-center text-[#f7bd3c] mb-4">
                <BookOpen className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 max-w-lg font-display">
                {lesson.nombre}
              </h3>
              <p className="text-sm text-[#a8a8c0] max-w-md mb-6">
                Esta clase corresponde a material de lectura, guía descargable o análisis estratégico. Consulta el contenido detallado en la pestaña de descripción a continuación.
              </p>
              <button
                onClick={() => setActiveTab('desc')}
                className="px-5 py-2.5 rounded-xl bg-[#7c3aed] text-white font-semibold text-xs hover:bg-[#6d28d9] transition-colors"
              >
                Ver Contenido y Materiales
              </button>
            </div>
          )}
        </div>

        {/* Audio Player Bar (if lesson has audio) */}
        {lesson.audio_url && (
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-[#141424] rounded-xl border border-[#2b2b42]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#7c3aed]/20 text-[#a78bfa] flex items-center justify-center">
                <Volume2 className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Audio de la clase</div>
                <div className="text-[10px] text-[#9090aa]">Disponible para escuchar mientras trabajas</div>
              </div>
            </div>

            <audio
              ref={audioRef}
              controls
              src={lesson.audio_url}
              className="h-8 max-w-xs flex-1"
            />

            <div className="flex items-center gap-1.5">
              {[1, 1.25, 1.5, 2].map((rate) => (
                <button
                  key={rate}
                  onClick={() => {
                    setAudioPlaybackRate(rate);
                    if (audioRef.current) audioRef.current.playbackRate = rate;
                  }}
                  className={`px-2 py-1 text-[10px] font-bold rounded ${
                    audioPlaybackRate === rate
                      ? 'bg-[#7c3aed] text-white'
                      : 'bg-[#1e1e32] text-[#8e8ea3] hover:text-white'
                  }`}
                >
                  {rate}x
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Controls Bar: Navigation & Complete Button */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-[#121220] rounded-xl border border-[#232338]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => prevLesson && onSelectLesson(prevLesson)}
              disabled={!prevLesson}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-[#1a1a2e] text-[#d0d0e0] hover:text-white hover:bg-[#252540] disabled:opacity-35 disabled:hover:bg-[#1a1a2e] disabled:cursor-not-allowed transition-all border border-[#2d2d44]"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            <button
              onClick={() => nextLesson && onSelectLesson(nextLesson)}
              disabled={!nextLesson}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-[#1a1a2e] text-[#d0d0e0] hover:text-white hover:bg-[#252540] disabled:opacity-35 disabled:hover:bg-[#1a1a2e] disabled:cursor-not-allowed transition-all border border-[#2d2d44]"
            >
              <span>Siguiente</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Toggle Complete Button */}
          <button
            onClick={() => onToggleComplete(lesson.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              isCompleted
                ? 'bg-[#10b981]/15 text-[#10b981] border-[#10b981]/40 hover:bg-[#10b981]/25'
                : 'bg-[#7c3aed] text-white border-[#7c3aed] hover:bg-[#6d28d9] shadow-md shadow-[#7c3aed]/20'
            }`}
          >
            {isCompleted ? (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>Clase Completada ✓</span>
              </>
            ) : (
              <>
                <Circle className="w-4 h-4" />
                <span>Marcar como completada</span>
              </>
            )}
          </button>
        </div>

        {/* Lesson Sub-Tabs & Details */}
        <div className="bg-[#121220] rounded-2xl border border-[#232338] overflow-hidden">
          
          {/* Sub-Tabs Nav */}
          <div className="flex items-center overflow-x-auto border-b border-[#232338] px-3 gap-2 bg-[#0e0e18]">
            <button
              onClick={() => setActiveTab('desc')}
              className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'desc'
                  ? 'border-[#f7bd3c] text-[#f7bd3c]'
                  : 'border-transparent text-[#9090aa] hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Descripción y Materiales</span>
            </button>

            {lesson.transcripcion && (
              <button
                onClick={() => setActiveTab('transcription')}
                className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
                  activeTab === 'transcription'
                    ? 'border-[#f7bd3c] text-[#f7bd3c]'
                    : 'border-transparent text-[#9090aa] hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Transcripción Completa</span>
              </button>
            )}

            {moduleQuiz && moduleQuiz.preguntas && moduleQuiz.preguntas.length > 0 && (
              <button
                onClick={() => setActiveTab('quiz')}
                className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
                  activeTab === 'quiz'
                    ? 'border-[#f7bd3c] text-[#f7bd3c]'
                    : 'border-transparent text-[#9090aa] hover:text-white'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>Quiz del Módulo ({moduleQuiz.preguntas.length})</span>
              </button>
            )}

            <button
              onClick={() => setActiveTab('notes')}
              className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'notes'
                  ? 'border-[#f7bd3c] text-[#f7bd3c]'
                  : 'border-transparent text-[#9090aa] hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Mis Notas {noteText ? '•' : ''}</span>
            </button>

            <button
              onClick={() => setActiveTab('incubot')}
              className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'incubot'
                  ? 'border-[#7c3aed] text-[#c4b5fd]'
                  : 'border-transparent text-[#9090aa] hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#a78bfa]" />
              <span>Incubot Copiloto</span>
            </button>
          </div>

          {/* Sub-Tab Contents */}
          <div className="p-6">
            
            {/* 1. Descripción */}
            {activeTab === 'desc' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white font-display">
                  {lesson.nombre}
                </h2>

                {lesson.descripcion_html ? (
                  <div
                    className="prose prose-invert max-w-none text-sm text-[#c0c0d4] leading-relaxed [&_a]:text-[#f7bd3c] [&_a]:underline [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mb-3 [&_h1]:text-lg [&_h2]:text-base [&_h3]:text-sm [&_strong]:text-white"
                    dangerouslySetInnerHTML={{ __html: lesson.descripcion_html }}
                  />
                ) : lesson.descripcion ? (
                  <p className="text-sm text-[#c0c0d4] leading-relaxed whitespace-pre-wrap">
                    {lesson.descripcion}
                  </p>
                ) : (
                  <div className="text-sm text-[#8c8ca5] bg-[#0f0f1a] p-4 rounded-xl border border-[#202034]">
                    Esta clase está enfocada en el contenido práctico en video. Toma apuntes de las ideas clave y utiliza la pestaña de transcripción para buscar conceptos específicos.
                  </div>
                )}

                {/* Additional Info / Takeaways card */}
                <div className="mt-6 pt-5 border-t border-[#232338] grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#161628] p-3.5 rounded-xl border border-[#282842]">
                    <div className="text-xs font-bold text-[#f7bd3c] mb-1">Módulo Actual</div>
                    <div className="text-xs text-[#e0e0ed] font-medium">
                      {currentModule?.nombre || 'General'}
                    </div>
                  </div>
                  <div className="bg-[#161628] p-3.5 rounded-xl border border-[#282842]">
                    <div className="text-xs font-bold text-[#10b981] mb-1">Estado de la Clase</div>
                    <div className="text-xs text-[#e0e0ed] font-medium">
                      {isCompleted ? 'Completada y registrada' : 'Pendiente por completar'}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Transcripción */}
            {activeTab === 'transcription' && lesson.transcripcion && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="w-3.5 h-3.5 text-[#8e8ea3] absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Buscar palabras en la transcripción..."
                      value={transcriptSearch}
                      onChange={(e) => setTranscriptSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[#161626] border border-[#2a2a40] text-white focus:outline-none focus:border-[#f7bd3c]"
                    />
                  </div>
                  <button
                    onClick={handleCopyTranscript}
                    className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-[#1e1e32] text-[#d5d5e5] hover:text-white border border-[#2f2f48]"
                  >
                    {copiedTranscript ? <Check className="w-3.5 h-3.5 text-[#10b981]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedTranscript ? 'Copiado' : 'Copiar texto'}</span>
                  </button>
                </div>

                <div className="max-h-96 overflow-y-auto p-4 rounded-xl bg-[#0d0d16] border border-[#212134] text-xs sm:text-sm text-[#b5b5cc] leading-relaxed whitespace-pre-wrap font-mono">
                  {transcriptSearch ? (
                    // Simple search highlight
                    lesson.transcripcion
                      .split(new RegExp(`(${transcriptSearch})`, 'gi'))
                      .map((part, i) =>
                        part.toLowerCase() === transcriptSearch.toLowerCase() ? (
                          <mark key={i} className="bg-[#f7bd3c] text-black font-bold px-1 rounded">
                            {part}
                          </mark>
                        ) : (
                          part
                        )
                      )
                  ) : (
                    lesson.transcripcion
                  )}
                </div>
              </div>
            )}

            {/* 3. Quiz del Módulo */}
            {activeTab === 'quiz' && moduleQuiz && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white font-display mb-1">
                    Evaluación del Módulo: {currentModule?.nombre}
                  </h3>
                  <p className="text-xs text-[#a0a0b8]">
                    Responde las siguientes preguntas para comprobar tu asimilación de los conceptos.
                  </p>
                </div>

                <div className="space-y-6">
                  {moduleQuiz.preguntas.map((q, qIndex) => {
                    const selected = quizAnswers[qIndex];
                    const isAnswered = selected !== undefined;
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
                            if (quizSubmitted) {
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
                                onClick={() => {
                                  if (!quizSubmitted) {
                                    setQuizAnswers({ ...quizAnswers, [qIndex]: optIndex });
                                  }
                                }}
                                className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs border transition-all ${btnStyle}`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>

                        {quizSubmitted && q.explicacion && (
                          <div className={`p-2.5 rounded-lg text-xs leading-relaxed border ${
                            isCorrect ? 'bg-[#10b981]/10 text-[#6ee7b7] border-[#10b981]/30' : 'bg-[#ef4444]/10 text-[#fca5a5] border-[#ef4444]/30'
                          }`}>
                            <span className="font-bold">Explicación:</span> {q.explicacion}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#232338]">
                  <div className="text-xs text-[#a0a0b8]">
                    {Object.keys(quizAnswers).length} de {moduleQuiz.preguntas.length} respondidas
                  </div>

                  {!quizSubmitted ? (
                    <button
                      onClick={() => setQuizSubmitted(true)}
                      disabled={Object.keys(quizAnswers).length === 0}
                      className="px-5 py-2 rounded-xl bg-[#f7bd3c] text-black font-bold text-xs hover:bg-[#e5a930] disabled:opacity-40 transition-colors"
                    >
                      Calificar Respuestas
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setQuizSubmitted(false);
                        setQuizAnswers({});
                      }}
                      className="px-5 py-2 rounded-xl bg-[#282842] text-white font-bold text-xs hover:bg-[#343454] transition-colors"
                    >
                      Reintentar Evaluación
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* 4. Mis Notas */}
            {activeTab === 'notes' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white">Notas Personales de la Clase</h3>
                  <span className="text-[11px] text-[#10b981] font-semibold flex items-center gap-1">
                    <Check className="w-3 h-3" /> Auto-guardado en tu navegador
                  </span>
                </div>

                <textarea
                  rows={8}
                  value={noteText}
                  onChange={(e) => handleNoteChange(e.target.value)}
                  placeholder="Escribe tus apuntes clave, tareas pendientes o reflexiones para implementar en tu negocio..."
                  className="w-full p-4 rounded-xl bg-[#0f0f1b] border border-[#26263e] text-sm text-[#e0e0f0] focus:outline-none focus:border-[#7c3aed] resize-y"
                />

                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      const blob = new Blob([noteText], { type: 'text/plain;charset=utf-8' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `notas-${lesson.nombre.slice(0, 25)}.txt`;
                      a.click();
                    }}
                    disabled={!noteText.trim()}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[#1a1a2e] text-[#d5d5e5] hover:text-white border border-[#2b2b42] disabled:opacity-40"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Descargar archivo de notas</span>
                  </button>
                </div>
              </div>
            )}

            {/* 5. Incubot Copiloto */}
            {activeTab === 'incubot' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#7c3aed] to-[#6135f0] flex items-center justify-center text-white">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Incubot Copiloto</h3>
                    <p className="text-[11px] text-[#9090aa]">Tutor asistencial para resolver dudas de la lección</p>
                  </div>
                </div>

                {/* Suggestions */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {[
                    '¿Cuáles son los 3 puntos clave de esta clase?',
                    'Dame un ejercicio práctico para aplicar hoy',
                    '¿Cómo adapto esta clase si mi negocio es de servicios?',
                  ].map((sugg, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendPrompt(sugg)}
                      className="text-[11px] px-3 py-1.5 rounded-full bg-[#18182d] border border-[#2b2b46] text-[#b0b0cc] hover:text-white hover:border-[#7c3aed] transition-colors"
                    >
                      {sugg}
                    </button>
                  ))}
                </div>

                {/* Chat feed */}
                <div className="h-64 overflow-y-auto space-y-3 p-3 bg-[#0d0d17] rounded-xl border border-[#202034] text-xs">
                  {chatMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] p-3 rounded-xl whitespace-pre-wrap leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-[#7c3aed] text-white rounded-tr-none'
                            : 'bg-[#18182b] text-[#d5d5ea] border border-[#282840] rounded-tl-none'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input box */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendPrompt(chatInput)}
                    placeholder="Escribe tu consulta sobre la clase..."
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#141424] border border-[#292942] text-xs text-white focus:outline-none focus:border-[#7c3aed]"
                  />
                  <button
                    onClick={() => handleSendPrompt(chatInput)}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#6135f0] text-white text-xs font-bold hover:brightness-110 transition-all"
                  >
                    Enviar
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>

      {/* Right Column: Module Lessons Playlist & Switcher (4 cols) */}
      <div className="lg:col-span-4 flex flex-col gap-4">
        
        {/* Module Switcher Header */}
        <div className="bg-[#121220] p-4 rounded-2xl border border-[#232338]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#f7bd3c] flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              Módulo Actual
            </span>
            <span className="text-[11px] text-[#8e8ea3] font-semibold">
              {moduleLessons.length} Clases
            </span>
          </div>

          <h3 className="text-sm font-bold text-white mb-3 line-clamp-2">
            {currentModule?.nombre || 'Módulo'}
          </h3>

          {/* Module Selector Dropdown */}
          <select
            value={lesson.modulo_id}
            onChange={(e) => onSelectModule(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl bg-[#18182c] border border-[#2d2d46] text-[#e0e0f0] focus:outline-none focus:border-[#f7bd3c]"
          >
            {structuredModules.map((root) => (
              <React.Fragment key={root.id}>
                <option value={root.id}>
                  {root.nombre} ({root.lessons.length} clases)
                </option>
                {root.submodules.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    &nbsp;&nbsp;↳ {sub.nombre} ({sub.lessons.length} clases)
                  </option>
                ))}
              </React.Fragment>
            ))}
          </select>
        </div>

        {/* Playlist of Current Module */}
        <div className="bg-[#121220] rounded-2xl border border-[#232338] overflow-hidden flex flex-col">
          <div className="p-3.5 border-b border-[#232338] bg-[#0e0e18] flex items-center justify-between">
            <span className="text-xs font-bold text-white">Clases en este módulo</span>
            <span className="text-[11px] text-[#10b981] font-semibold">
              {moduleLessons.filter((l) => completedLessons.includes(l.id)).length} / {moduleLessons.length} listas
            </span>
          </div>

          <div className="max-h-[600px] overflow-y-auto divide-y divide-[#1b1b2d]">
            {moduleLessons.map((item, idx) => {
              const isActive = item.id === lesson.id;
              const isItemCompleted = completedLessons.includes(item.id);

              return (
                <div
                  key={item.id}
                  onClick={() => onSelectLesson(item)}
                  className={`p-3 cursor-pointer flex items-center gap-3 transition-colors ${
                    isActive
                      ? 'bg-[#1e1b36] border-l-4 border-[#f7bd3c]'
                      : 'hover:bg-[#171728]'
                  }`}
                >
                  {/* Thumbnail / Play Badge */}
                  <div className="relative w-16 h-11 rounded-lg overflow-hidden bg-[#18182c] flex-shrink-0 border border-[#2a2a40]">
                    {item.thumbnail_url ? (
                      <img
                        src={item.thumbnail_url}
                        alt={item.nombre}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      {isActive ? (
                        <div className="w-5 h-5 rounded-full bg-[#f7bd3c] flex items-center justify-center text-black">
                          <Play className="w-2.5 h-2.5 fill-black" />
                        </div>
                      ) : (
                        <Play className="w-3.5 h-3.5 text-white/80" />
                      )}
                    </div>
                  </div>

                  {/* Title & Metadata */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[10px] font-bold text-[#8e8ea3]">
                        #{idx + 1}
                      </span>
                      {item.duracion_segundos && (
                        <span className="text-[10px] text-[#8e8ea3] flex items-center gap-0.5">
                          <Clock className="w-2.5 h-2.5" />
                          {formatDuration(item.duracion_segundos)}
                        </span>
                      )}
                    </div>

                    <h4
                      className={`text-xs font-semibold line-clamp-2 leading-snug ${
                        isActive ? 'text-[#f7bd3c]' : 'text-[#e0e0f0]'
                      }`}
                    >
                      {item.nombre}
                    </h4>
                  </div>

                  {/* Complete Checkbox */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleComplete(item.id);
                    }}
                    className="p-1 text-[#8e8ea3] hover:text-[#10b981] transition-colors"
                  >
                    {isItemCompleted ? (
                      <CheckCircle className="w-4 h-4 text-[#10b981]" />
                    ) : (
                      <Circle className="w-4 h-4 text-[#444460]" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
