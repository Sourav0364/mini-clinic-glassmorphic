import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { PawPrint, LayoutDashboard, List, PlusCircle } from 'lucide-react';
import { cn } from './ui/Input';

export const Layout = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/pets', label: 'Pet List', icon: List },
    { path: '/pets/new', label: 'Add Pet', icon: PlusCircle },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 glass-panel border-r border-white/5 flex-shrink-0 z-10 md:min-h-screen">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <PawPrint className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-purple-200">
            LuxePets
          </h1>
        </div>
        
        <nav className="px-4 pb-6 flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path) && item.path !== '/');
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 whitespace-nowrap',
                  isActive
                    ? 'bg-white/10 text-white shadow-sm border border-white/10'
                    : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                )}
              >
                <Icon className={cn('w-5 h-5', isActive ? 'text-indigo-400' : '')} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto relative">
        {/* Decorative background elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/20 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
