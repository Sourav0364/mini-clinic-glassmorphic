import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Pet } from '../types/pet';
import { Card } from './ui/Card';
import { PawPrint, Dog, Cat, Bird, Activity } from 'lucide-react';

export const Dashboard = () => {
  const { pets } = useOutletContext<{ pets: Pet[] }>();

  const totalPets = pets.length;
  const dogsCount = pets.filter((p) => p.species === 'Dog').length;
  const catsCount = pets.filter((p) => p.species === 'Cat').length;
  const birdsCount = pets.filter((p) => p.species === 'Bird').length;
  const othersCount = totalPets - dogsCount - catsCount - birdsCount;

  const stats = [
    { label: 'Total Pets', value: totalPets, icon: PawPrint, color: 'text-indigo-400', bg: 'bg-indigo-500/20' },
    { label: 'Dogs', value: dogsCount, icon: Dog, color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
    { label: 'Cats', value: catsCount, icon: Cat, color: 'text-amber-400', bg: 'bg-amber-500/20' },
    { label: 'Birds', value: birdsCount, icon: Bird, color: 'text-sky-400', bg: 'bg-sky-500/20' },
    { label: 'Others', value: othersCount, icon: Activity, color: 'text-rose-400', bg: 'bg-rose-500/20' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Dashboard</h2>
        <p className="text-slate-400">Overview of your clinic's furry (and feathery) friends.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="flex items-center gap-4 p-5 hover:bg-white/5 transition-colors">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.bg}`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-400">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <Card className="min-h-[300px] flex flex-col">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Additions</h3>
          {pets.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-slate-400">
              No pets added yet.
            </div>
          ) : (
            <div className="space-y-3">
              {pets
                .sort((a, b) => b.createdAt - a.createdAt)
                .slice(0, 5)
                .map((pet) => (
                  <div key={pet.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                        {pet.species === 'Dog' ? <Dog className="w-5 h-5 text-indigo-300" /> :
                         pet.species === 'Cat' ? <Cat className="w-5 h-5 text-indigo-300" /> :
                         pet.species === 'Bird' ? <Bird className="w-5 h-5 text-indigo-300" /> :
                         <PawPrint className="w-5 h-5 text-indigo-300" />}
                      </div>
                      <div>
                        <p className="font-medium text-white">{pet.name}</p>
                        <p className="text-xs text-slate-400">{pet.species} • {pet.breed || 'Unknown breed'}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-300">{pet.ownerName}</p>
                      <p className="text-xs text-slate-500">{new Date(pet.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
