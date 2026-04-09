import { Pet } from '../types/pet';

const STORAGE_KEY = 'clinic_pets';

export const getPets = (): Pet[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to parse pets from local storage', error);
    return [];
  }
};

export const savePets = (pets: Pet[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pets));
  } catch (error) {
    console.error('Failed to save pets to local storage', error);
  }
};
