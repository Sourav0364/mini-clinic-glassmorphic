import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {savePets} from '../utils/storage';

/**
 * Dev-only seed route. Visiting /seed will write the seedPets into storage
 * and redirect to /pets. This component is intentionally tiny and guarded
 * by a check in the router so it won't be reachable in production builds.
 */
export const Seed = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the seed data from the public folder at runtime so the module
    // isn't required during server/build time (fixes Vercel build issues).
    fetch('/seedPets.json')
      .then((res) => res.json())
      .then((data) => {
        try {
          savePets(data);
        } catch (err) {
          try { localStorage.setItem('clinic_pets', JSON.stringify(data)); } catch {}
        }
        // small delay so storage settles and UI can pick it up
        setTimeout(() => navigate('/pets'), 150);
      })
      .catch(() => {
        // If fetch fails, ensure navigation still occurs
        navigate('/pets');
      });
  }, [navigate]);

  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="text-center text-slate-300">Seeding sample data and redirecting…</div>
    </div>
  );
};

export default Seed;
