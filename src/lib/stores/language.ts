import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Language = 'en' | 'id';

const initialLanguage: Language = browser
  ? (localStorage.getItem('language') as Language) || 'id'
  : 'id';

export const language = writable<Language>(
  initialLanguage === 'en' ? 'en' : 'id'
);

export function setLanguage(value: Language) {
  language.set(value);

  if (browser) {
    localStorage.setItem('language', value);
  }
}