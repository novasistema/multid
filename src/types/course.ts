export interface CourseDesign {
  hero_mostrar?: boolean;
  color_primario?: string;
  sidebar_titulo?: string | null;
  hero_imagen_url?: string | null;
  sidebar_mostrar?: boolean;
  hero_color_fondo?: string;
  hero_color_texto?: string;
  sidebar_boton_link?: string | null;
  sidebar_imagen_url?: string | null;
  color_fondo_general?: string;
  modulos_color_fondo?: string;
  modulos_color_texto?: string;
  sidebar_boton_texto?: string | null;
  sidebar_descripcion?: string | null;
  modulos_color_progreso?: string;
}

export interface Course {
  id: string;
  nombre: string;
  descripcion: string;
  producto?: string;
  imagen_url?: string;
  activo?: boolean;
  orden?: number;
  created_at?: string;
  diseno?: CourseDesign;
  puntos_limite?: number | null;
}

export interface ModuleItem {
  id: string;
  curso_id: string;
  nombre: string;
  descripcion: string | null;
  orden: number;
  activo: boolean;
  imagen_url: string | null;
  drip_dias: number | null;
  drip_requiere_modulo_anterior?: boolean;
  contenido_quiz?: any;
  parent_modulo_id: string | null;
  drip_mes?: number | null;
  solo_anual?: boolean;
  drip_dias_plan?: number | null;
  categoria_plan_accion?: string | null;
  planes_visibles?: string[] | null;
  visible_para_pendiente?: boolean;
  nivel_desde?: number | null;
}

export interface LessonItem {
  id: string;
  modulo_id: string;
  nombre: string;
  descripcion: string | null;
  bunny_video_id: string | null;
  bunny_video_url: string | null;
  duracion_segundos: number | null;
  orden: number;
  activo: boolean;
  es_preview?: boolean;
  thumbnail_url: string | null;
  descripcion_html: string | null;
  transcripcion: string | null;
  audio_url: string | null;
  audio_duration_seg: number | null;
  tipo: string;
  planes_visibles?: string[] | null;
  incubot_activo?: boolean;
  incubot_objetivo?: string | null;
  incubot_instrucciones?: string | null;
  incubot_preguntas?: string | null;
  incubot_modelo?: string | null;
  incubot_logo?: boolean;
  video_embed_url: string | null;
}

export interface QuizQuestion {
  pregunta: string;
  opciones: string[];
  respuesta_correcta: number;
  explicacion?: string;
  dificultad?: string;
}

export interface ModuleQuiz {
  id: string;
  modulo_id: string;
  preguntas: QuizQuestion[];
  generado_at?: string;
}

export interface CourseData {
  course: Course;
  modules: ModuleItem[];
  lessons: LessonItem[];
  quizzes: ModuleQuiz[];
  all_courses: Course[];
}

export interface StructuredModule extends ModuleItem {
  submodules: StructuredModule[];
  lessons: LessonItem[];
  allLessonsCount: number;
}

export type AppTab = 
  | 'player' 
  | 'curriculum' 
  | 'modules' 
  | 'quizzes' 
  | 'notes'
  | 'comunidad'
  | 'ranking'
  | 'mi-administracion'
  | 'incumatch'
  | 'incumarket'
  | 'contactos'
  | 'pedidos'
  | 'casos-exito';

