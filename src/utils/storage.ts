import { DiaryEntry } from '../types/diary';

const STORAGE_KEY = 'pixelDiary_entries';

export const saveDiaryEntry = (entry: DiaryEntry): void => {
  const entries = getAllDiaryEntries();
  const existingIndex = entries.findIndex(e => e.date === entry.date);
  
  if (existingIndex >= 0) {
    entries[existingIndex] = entry;
  } else {
    entries.push(entry);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
};

export const getDiaryEntry = (date: string): DiaryEntry | null => {
  const entries = getAllDiaryEntries();
  return entries.find(entry => entry.date === date) || null;
};

export const getAllDiaryEntries = (): DiaryEntry[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading diary entries:', error);
    return [];
  }
};

export const deleteDiaryEntry = (date: string): void => {
  const entries = getAllDiaryEntries();
  const filteredEntries = entries.filter(entry => entry.date !== date);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredEntries));
};