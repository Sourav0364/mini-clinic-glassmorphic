import React from 'react';
import { useParams, useNavigate, Link, useOutletContext } from 'react-router-dom';
import { Pet } from '../types/pet';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { differenceInYears, differenceInMonths } from 'date-fns';
import { ArrowLeft, Edit2, Calendar, User, Phone, FileText, PawPrint, Clock } from 'lucide-react';

export const PetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPet } = useOutletContext<{ getPet: (id: string) => Pet | undefined }>();

  const pet = id ? getPet(id) : undefined;

  if (!pet) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <PawPrint className="w-16 h-16 text-slate-500 opacity-50" />
        <h2 className="text-2xl font-bold text-white">Pet not found</h2>
        <p className="text-slate-400">The pet you are looking for does not exist or has been removed.</p>
        <Button onClick={() => navigate('/pets')}>Back to Directory</Button>
      </div>
    );
  }

  const calculateAge = (dob: string) => {
    if (!dob) return 'Unknown age';
    const birthDate = new Date(dob);
    const years = differenceInYears(new Date(), birthDate);
    if (years > 0) return `${years} year${years > 1 ? 's' : ''} old`;
    const months = differenceInMonths(new Date(), birthDate);
    return `${months} month${months > 1 ? 's' : ''} old`;
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="secondary" size="sm" onClick={() => navigate('/pets')} className="px-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white mb-1 flex items-center gap-3">
              {pet.name}
              {pet.gender === 'Male' && <span className="text-blue-400 text-2xl">♂</span>}
              {pet.gender === 'Female' && <span className="text-pink-400 text-2xl">♀</span>}
            </h2>
            <p className="text-slate-400 flex items-center gap-2">
              <Badge variant={
                pet.species === 'Dog' ? 'success' :
                pet.species === 'Cat' ? 'warning' :
                pet.species === 'Bird' ? 'info' : 'default'
              }>
                {pet.species}
              </Badge>
              {pet.breed && <span>• {pet.breed}</span>}
            </p>
          </div>
        </div>
        <Link to={`/pets/${pet.id}/edit`}>
          <Button>
            <Edit2 className="w-4 h-4" />
            Edit Profile
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Info Card */}
        <Card className="md:col-span-2 space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-indigo-300 mb-4 border-b border-white/10 pb-2">
              Physical Characteristics
            </h3>
            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
              <div>
                <p className="text-sm text-slate-400 mb-1 flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Date of Birth
                </p>
                <p className="text-white font-medium">
                  {pet.dateOfBirth ? new Date(pet.dateOfBirth).toLocaleDateString() : 'Not specified'}
                  <span className="text-slate-400 text-sm ml-2">({calculateAge(pet.dateOfBirth)})</span>
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-400 mb-1">Colors</p>
                <div className="flex flex-wrap gap-1.5">
                  {pet.colors && pet.colors.length > 0 ? (
                    pet.colors.map(color => (
                      <span key={color} className="px-2 py-0.5 rounded bg-white/10 text-slate-200 text-xs">
                        {color}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-500 text-sm">Not specified</span>
                  )}
                </div>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-slate-400 mb-2">Tags / Traits</p>
                <div className="flex flex-wrap gap-2">
                  {pet.tags && pet.tags.length > 0 ? (
                    pet.tags.map(tag => (
                      <Badge key={tag} variant="info">{tag}</Badge>
                    ))
                  ) : (
                    <span className="text-slate-500 text-sm">No tags added</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-sky-300 mb-4 border-b border-white/10 pb-2 flex items-center gap-2">
              <FileText className="w-5 h-5" /> Medical & Behavioral Notes
            </h3>
            <div className="bg-black/20 rounded-xl p-4 min-h-[100px] border border-white/5">
              {pet.notes ? (
                <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">{pet.notes}</p>
              ) : (
                <p className="text-slate-500 italic">No notes recorded for this pet.</p>
              )}
            </div>
          </div>
        </Card>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border-purple-500/20">
            <h3 className="text-lg font-semibold text-purple-300 mb-4 border-b border-purple-500/20 pb-2 flex items-center gap-2">
              <User className="w-5 h-5" /> Owner Details
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-purple-200/60 mb-1">Name</p>
                <p className="text-white font-medium text-lg">{pet.ownerName}</p>
              </div>
              <div>
                <p className="text-sm text-purple-200/60 mb-1 flex items-center gap-2">
                  <Phone className="w-4 h-4" /> Contact Number
                </p>
                <p className="text-white font-medium">{pet.mobileNumber}</p>
              </div>
            </div>
          </Card>

          <Card className="bg-black/20">
            <div className="flex items-center gap-3 text-slate-400 text-sm">
              <Clock className="w-4 h-4" />
              <div>
                <p>Registered: {new Date(pet.createdAt).toLocaleDateString()}</p>
                <p>Last updated: {new Date(pet.updatedAt).toLocaleDateString()}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
