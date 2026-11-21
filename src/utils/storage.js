export const STORAGE = {
 progress: "udit_progress",
 bookmarks: "udit_bookmarks",
 challenges: "udit_challenges",
 challengeHistory: "udit_challenge_history"
};

export function read(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Browsing data remains usable in memory if storage is unavailable.
  }
}

export function getProgress() {
  return read(STORAGE.progress, {
    lessons: [],
    practice: [],
    exams: {},
    visitedLanguages: [],
    streak: 0,
    lastActiveDate: null,
    points: 0
  });
}

export function saveProgress(progress) {
  write(STORAGE.progress, progress);
  window.dispatchEvent(new Event("udit-progress"));
  return progress;
}

export function updateProgress(updater) {
  const next = updater(getProgress());
  const today = new Date().toISOString().slice(0, 10);
  if (next.lastActiveDate !== today) {
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    next.streak = next.lastActiveDate === yesterday ? (next.streak || 0) + 1 : 1;
    next.lastActiveDate = today;
  }
  return saveProgress(next);
}

export function getBookmarks() {
  return read(STORAGE.bookmarks, []);
}

export function toggleBookmark(item) {
  const bookmarks = getBookmarks();
  const exists = bookmarks.some(bookmark => bookmark.id === item.id);
  const next = exists ? bookmarks.filter(bookmark => bookmark.id !== item.id) : [...bookmarks, item];
  write(STORAGE.bookmarks, next);
  window.dispatchEvent(new Event("udit-bookmarks"));
  return next;
}
