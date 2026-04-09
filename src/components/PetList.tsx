import React, { useState, useMemo } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { Pet } from '../types/pet';
import { Card } from './ui/Card';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { Search, Edit2, Eye, Plus, FilterX } from 'lucide-react';
import { differenceInYears, differenceInMonths } from 'date-fns';

export const PetList = () => {
  const { pets } = useOutletContext<{ pets: Pet[] }>();
  const [searchTerm, setSearchTerm] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState('');

  const filteredPets = useMemo(() => {
    return pets.filter((pet) => {
      const matchesSearch =
        pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.ownerName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSpecies = speciesFilter ? pet.species === speciesFilter : true;
      return matchesSearch && matchesSpecies;
    }).sort((a, b) => a.name.localeCompare(b.name));
  }, [pets, searchTerm, speciesFilter]);

  const calculateAge = (dob: string) => {
    if (!dob) return 'Unknown';
    const birthDate = new Date(dob);
    const years = differenceInYears(new Date(), birthDate);
    if (years > 0) return `${years} yr${years > 1 ? 's' : ''}`;
    const months = differenceInMonths(new Date(), birthDate);
    return `${months} mo${months > 1 ? 's' : ''}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Pet Directory</h2>
          <p className="text-slate-400">Manage and view all registered pets.</p>
        </div>
        <Link to="/pets/new">
          <Button className="shadow-indigo-500/20">
            <Plus className="w-4 h-4" />
            Add New Pet
          </Button>
        </Link>
      </div>

      <Card className="p-4 flex flex-col sm:flex-row gap-4 items-end">
        <div className="flex-1 w-full">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              placeholder="Search by pet or owner name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="w-full sm:w-48">
          <Select
            value={speciesFilter}
            onChange={(e) => setSpeciesFilter(e.target.value)}
            options={[
              { label: 'All Species', value: '' },
              { label: 'Dog', value: 'Dog' },
              { label: 'Cat', value: 'Cat' },
              { label: 'Bird', value: 'Bird' },
              { label: 'Other', value: 'Other' },
            ]}
          />
        </div>
        {(searchTerm || speciesFilter) && (
          <Button
            variant="secondary"
            onClick={() => {
              setSearchTerm('');
              setSpeciesFilter('');
            }}
            className="w-full sm:w-auto px-3"
            title="Clear filters"
          >
            <FilterX className="w-5 h-5" />
          </Button>
        )}
      </Card>

      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="p-4 text-sm font-medium text-slate-300">Pet Name</th>
                <th className="p-4 text-sm font-medium text-slate-300">Species & Breed</th>
                <th className="p-4 text-sm font-medium text-slate-300">Age</th>
                <th className="p-4 text-sm font-medium text-slate-300">Owner</th>
                <th className="p-4 text-sm font-medium text-slate-300">Contact</th>
                <th className="p-4 text-sm font-medium text-slate-300 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredPets.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    No pets found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredPets.map((pet) => (
                  <tr key={pet.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="font-medium text-white">{pet.name}</div>
                        {pet.gender === 'Male' && <span className="text-blue-400 text-xs">♂</span>}
                        {pet.gender === 'Female' && <span className="text-pink-400 text-xs">♀</span>}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1">
                        <Badge variant={
                          pet.species === 'Dog' ? 'success' :
                          pet.species === 'Cat' ? 'warning' :
                          pet.species === 'Bird' ? 'info' : 'default'
                        } className="w-fit">
                          {pet.species}
                        </Badge>
                        <span className="text-xs text-slate-400">{pet.breed || '-'}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-slate-300">{calculateAge(pet.dateOfBirth)}</td>
                    <td className="p-4 text-sm text-slate-300">{pet.ownerName}</td>
                    <td className="p-4 text-sm text-slate-300">{pet.mobileNumber}</td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link to={`/pets/${pet.id}`}>
                          <Button variant="secondary" size="sm" className="px-2 py-1.5" title="View Details">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Link to={`/pets/${pet.id}/edit`}>
                          <Button variant="secondary" size="sm" className="px-2 py-1.5" title="Edit Pet">
                            <Edit2 className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
