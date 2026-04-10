import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {savePets} from '../utils/storage';
import {seedPets} from '../data/seedPets';

/**
 * Dev-only seed route. Visiting /seed will write the seedPets into storage
 * and redirect to /pets. This component is intentionally tiny and guarded
 * by a check in the router so it won't be reachable in production builds.
 */
export const Seed = () => {
  const navigate = useNavigate();

  useEffect(() => {
    try {
      savePets(seedPets);
      // small delay so storage settles and UI can pick it up
      setTimeout(() => navigate('/pets'), 150);
    } catch (err) {
      // fallback: attempt direct localStorage write
      try { localStorage.setItem('clinic_pets', JSON.stringify(seedPets)); } catch {}
      navigate('/pets');
    }
  }, [navigate]);

  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="text-center text-slate-300">Seeding sample data and redirecting…</div>
    </div>
  );
};

export default Seed;
