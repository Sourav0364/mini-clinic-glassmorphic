import { useState, useEffect, useCallback } from 'react';
import { Pet } from '../types/pet';
import { getPets, savePets } from '../utils/storage';
import { v4 as uuidv4 } from 'uuid';

export const usePets = () => {
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    setPets(getPets());
  }, []);

  const addPet = useCallback((petData: Omit<Pet, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newPet: Pet = {
      ...petData,
      id: uuidv4(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setPets((prev) => {
      const updated = [...prev, newPet];
      savePets(updated);
      return updated;
    });
    return newPet;
  }, []);

  const updatePet = useCallback((id: string, petData: Partial<Omit<Pet, 'id' | 'createdAt' | 'updatedAt'>>) => {
    setPets((prev) => {
      const updated = prev.map((pet) =>
        pet.id === id ? { ...pet, ...petData, updatedAt: Date.now() } : pet
      );
      savePets(updated);
      return updated;
    });
  }, []);

  const deletePet = useCallback((id: string) => {
    setPets((prev) => {
      const updated = prev.filter((pet) => pet.id !== id);
      savePets(updated);
      return updated;
    });
  }, []);

  const getPet = useCallback((id: string) => {
    return pets.find((pet) => pet.id === id);
  }, [pets]);

  return { pets, addPet, updatePet, deletePet, getPet };
};
