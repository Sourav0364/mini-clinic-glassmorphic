import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useOutletContext } from 'react-router-dom';
import { Pet, Species, Gender, PetColor, PetTag } from '../types/pet';
import { Card } from './ui/Card';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { Button } from './ui/Button';
import { Textarea } from './ui/Textarea';
import { MultiSelect } from './ui/MultiSelect';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';

const SPECIES_OPTIONS = [
  { label: 'Dog', value: 'Dog' },
  { label: 'Cat', value: 'Cat' },
  { label: 'Bird', value: 'Bird' },
  { label: 'Other', value: 'Other' },
];

const GENDER_OPTIONS = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
];

const COLOR_OPTIONS = [
  { label: 'Black', value: 'Black' },
  { label: 'White', value: 'White' },
  { label: 'Brown', value: 'Brown' },
  { label: 'Golden', value: 'Golden' },
  { label: 'Grey', value: 'Grey' },
  { label: 'Mixed', value: 'Mixed' },
];

const TAG_OPTIONS = [
  { label: 'Aggressive', value: 'Aggressive' },
  { label: 'Friendly', value: 'Friendly' },
  { label: 'Senior', value: 'Senior' },
  { label: 'Playful', value: 'Playful' },
  { label: 'Anxious', value: 'Anxious' },
  { label: 'Calm', value: 'Calm' },
];

export const PetForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addPet, updatePet, getPet } = useOutletContext<{
    addPet: (pet: any) => Pet;
    updatePet: (id: string, pet: any) => void;
    getPet: (id: string) => Pet | undefined;
  }>();

  const isEditing = !!id;

  const [formData, setFormData] = useState({
    name: '',
    species: '' as Species | '',
    breed: '',
    gender: '' as Gender,
    colors: [] as PetColor[],
    dateOfBirth: '',
    ownerName: '',
    mobileNumber: '',
    notes: '',
    tags: [] as PetTag[],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isEditing && id) {
      const pet = getPet(id);
      if (pet) {
        setFormData({
          name: pet.name,
          species: pet.species,
          breed: pet.breed,
          gender: pet.gender,
          colors: pet.colors,
          dateOfBirth: pet.dateOfBirth,
          ownerName: pet.ownerName,
          mobileNumber: pet.mobileNumber,
          notes: pet.notes,
          tags: pet.tags || [],
        });
      } else {
        navigate('/pets');
      }
    }
  }, [id, isEditing, getPet, navigate]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Pet name is required';
    if (!formData.species) newErrors.species = 'Species is required';
    if (!formData.ownerName.trim()) newErrors.ownerName = 'Owner name is required';
    
    const mobileRegex = /^\d{10}$/;
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!mobileRegex.test(formData.mobileNumber.replace(/\D/g, ''))) {
      newErrors.mobileNumber = 'Must be a valid 10-digit number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleMultiSelect = (field: 'colors' | 'tags') => (selected: string[]) => {
    setFormData((prev) => ({ ...prev, [field]: selected }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSaving(true);
    
    // Simulate network delay for premium feel
    await new Promise((resolve) => setTimeout(resolve, 600));

    try {
      if (isEditing && id) {
        updatePet(id, formData);
      } else {
        addPet(formData);
      }
      navigate('/pets');
    } catch (error) {
      console.error('Failed to save pet', error);
      setIsSaving(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="secondary" size="sm" onClick={() => navigate(-1)} className="px-2">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-1">
            {isEditing ? 'Edit Pet Profile' : 'New Pet Registration'}
          </h2>
          <p className="text-slate-400">
            {isEditing ? 'Update the details for this pet.' : 'Enter the details to register a new pet.'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="space-y-8">
          {/* Pet Details Section */}
          <div>
            <h3 className="text-lg font-semibold text-indigo-300 mb-4 flex items-center gap-2 border-b border-white/10 pb-2">
              Pet Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Pet Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                required
                placeholder="e.g. Bella"
              />
              <Select
                label="Species"
                name="species"
                value={formData.species}
                onChange={handleChange}
                error={errors.species}
                options={SPECIES_OPTIONS}
                required
              />
              <Input
                label="Breed"
                name="breed"
                value={formData.breed}
                onChange={handleChange}
                placeholder="e.g. Golden Retriever"
              />
              <Select
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                options={GENDER_OPTIONS}
              />
              <Input
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                max={today}
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
              <div className="md:col-span-2 space-y-6">
                <MultiSelect
                  label="Colors"
                  options={COLOR_OPTIONS}
                  selected={formData.colors}
                  onChange={handleMultiSelect('colors')}
                />
                <MultiSelect
                  label="Tags / Characteristics"
                  options={TAG_OPTIONS}
                  selected={formData.tags}
                  onChange={handleMultiSelect('tags')}
                />
              </div>
            </div>
          </div>

          {/* Owner Details Section */}
          <div>
            <h3 className="text-lg font-semibold text-purple-300 mb-4 flex items-center gap-2 border-b border-white/10 pb-2">
              Owner Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Owner Name"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                error={errors.ownerName}
                required
                placeholder="e.g. John Doe"
              />
              <Input
                label="Mobile Number"
                name="mobileNumber"
                type="tel"
                value={formData.mobileNumber}
                onChange={handleChange}
                error={errors.mobileNumber}
                required
                placeholder="e.g. 9876543210"
              />
            </div>
          </div>

          {/* Additional Info */}
          <div>
            <h3 className="text-lg font-semibold text-sky-300 mb-4 flex items-center gap-2 border-b border-white/10 pb-2">
              Additional Notes
            </h3>
            <Textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Any special medical conditions, allergies, or behavioral notes..."
            />
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-white/10">
            <Button type="button" variant="secondary" onClick={() => navigate(-1)} disabled={isSaving}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving} className="min-w-[120px]">
              {isSaving ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  {isEditing ? 'Save Changes' : 'Register Pet'}
                </>
              )}
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
};
