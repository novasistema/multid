import { ModuleItem, LessonItem, StructuredModule, CourseData } from '../types/course';

const STORAGE_KEY_COMPLETED = 'ide_completed_lessons';
const STORAGE_KEY_ACTIVE = 'ide_last_active_lesson';
const STORAGE_KEY_NOTES = 'ide_lesson_notes';
const STORAGE_KEY_QUIZ = 'ide_quiz_scores';

/**
 * Build hierarchical modules structure:
 * Root modules (parent_modulo_id === null) containing their direct lessons and any submodules.
 */
export function buildStructuredModules(modules: ModuleItem[], lessons: LessonItem[]): StructuredModule[] {
  const lessonsByModule = new Map<string, LessonItem[]>();
  lessons.forEach((lesson) => {
    const list = lessonsByModule.get(lesson.modulo_id) || [];
    list.push(lesson);
    lessonsByModule.set(lesson.modulo_id, list);
  });

  // Sort lessons within each module by 'orden'
  lessonsByModule.forEach((list) => {
    list.sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0));
  });

  const submodulesByParent = new Map<string, ModuleItem[]>();
  const rootModules: ModuleItem[] = [];

  modules.forEach((mod) => {
    if (mod.parent_modulo_id) {
      const list = submodulesByParent.get(mod.parent_modulo_id) || [];
      list.push(mod);
      submodulesByParent.set(mod.parent_modulo_id, list);
    } else {
      rootModules.push(mod);
    }
  });

  // Sort roots and submodules by 'orden'
  rootModules.sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0));
  submodulesByParent.forEach((list) => {
    list.sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0));
  });

  return rootModules.map((root) => {
    const subs = submodulesByParent.get(root.id) || [];
    const structuredSubs: StructuredModule[] = subs.map((sub) => {
      const subLessons = lessonsByModule.get(sub.id) || [];
      return {
        ...sub,
        submodules: [],
        lessons: subLessons,
        allLessonsCount: subLessons.length,
      };
    });

    const directLessons = lessonsByModule.get(root.id) || [];
    const totalSubLessons = structuredSubs.reduce((acc, curr) => acc + curr.lessons.length, 0);

    return {
      ...root,
      submodules: structuredSubs,
      lessons: directLessons,
      allLessonsCount: directLessons.length + totalSubLessons,
    };
  });
}

/**
 * Flatten the curriculum into a sequential list of lessons in curriculum order.
 * This ensures "Anterior" and "Siguiente" navigate naturally through all 179 classes.
 */
export function getLinearLessonsList(structured: StructuredModule[]): LessonItem[] {
  const linear: LessonItem[] = [];
  structured.forEach((root) => {
    root.lessons.forEach((l) => linear.push(l));
    root.submodules.forEach((sub) => {
      sub.lessons.forEach((l) => linear.push(l));
    });
  });
  return linear;
}

/**
 * Storage Helpers
 */
export function getCompletedLessons(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_COMPLETED);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleLessonCompleted(lessonId: string): string[] {
  try {
    const current = getCompletedLessons();
    const set = new Set(current);
    if (set.has(lessonId)) {
      set.delete(lessonId);
    } else {
      set.add(lessonId);
    }
    const updated = Array.from(set);
    localStorage.setItem(STORAGE_KEY_COMPLETED, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export function getLastActiveLessonId(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY_ACTIVE);
  } catch {
    return null;
  }
}

export function saveLastActiveLessonId(lessonId: string) {
  try {
    localStorage.setItem(STORAGE_KEY_ACTIVE, lessonId);
  } catch {
    // Ignore storage errors
  }
}

export interface LessonNote {
  lessonId: string;
  lessonTitle: string;
  moduleTitle: string;
  text: string;
  updatedAt: string;
}

export function getLessonNotes(): Record<string, LessonNote> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_NOTES);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveLessonNote(note: LessonNote) {
  try {
    const current = getLessonNotes();
    current[note.lessonId] = note;
    localStorage.setItem(STORAGE_KEY_NOTES, JSON.stringify(current));
  } catch {
    // Ignore storage errors
  }
}

export function getQuizScores(): Record<string, { score: number; total: number; passed: boolean; date: string }> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_QUIZ);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveQuizScore(moduloId: string, score: number, total: number) {
  try {
    const current = getQuizScores();
    current[moduloId] = {
      score,
      total,
      passed: (score / total) >= 0.7,
      date: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY_QUIZ, JSON.stringify(current));
  } catch {
    // Ignore storage errors
  }
}

export function formatDuration(seconds: number | null): string {
  if (!seconds || seconds <= 0) return '';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins < 60) {
    return `${mins}:${secs.toString().padStart(2, '0')} min`;
  }
  const hours = Math.floor(mins / 60);
  const remMins = mins % 60;
  return `${hours}h ${remMins}m`;
}
