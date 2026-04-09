export type Species = 'Dog' | 'Cat' | 'Bird' | 'Other';
export type Gender = 'Male' | 'Female' | '';
export type PetColor = 'Black' | 'White' | 'Brown' | 'Golden' | 'Grey' | 'Mixed';
export type PetTag = 'Aggressive' | 'Friendly' | 'Senior' | 'Playful' | 'Anxious' | 'Calm';

export interface Pet {
  id: string;
  name: string;
  species: Species | '';
  breed: string;
  gender: Gender;
  colors: PetColor[];
  dateOfBirth: string; // YYYY-MM-DD
  ownerName: string;
  mobileNumber: string;
  notes: string;
  tags: PetTag[];
  createdAt: number;
  updatedAt: number;
}
