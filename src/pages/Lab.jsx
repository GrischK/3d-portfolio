import React, { Suspense, useState } from 'react';

const Avatar = React.lazy(() => import('../components/Avatar.jsx'));
const HeroSection = React.lazy(() => import('../components/HeroSection.jsx'));

const Lab = () => {
  const [page, setPage] = useState(null);

  return (
    <>
      {page === null && (
        <div className="bg-black pt-20 flex items-center justify-center text-center gap-2">
          <button
            className={`w-[fit-content] border-transparent hover:border-white transition-all duration-300 px-4 py-3 rounded-full text-sm uppercase border ${action ? 'bg-white text-black' : 'text-white'}`}
            onClick={() => setPage(0)}
          >
            Hero Section
          </button>
          <button
            className={`w-[fit-content] border-transparent hover:border-white transition-all duration-300 px-4 py-3 rounded-full text-sm uppercase border ${action ? 'bg-white text-black' : 'text-white'}`}
            onClick={() => setPage(1)}
          >
            Avatar
          </button>
        </div>
      )}
      <Suspense fallback={<div className="text-white text-center hidden">Chargement...</div>}>
        <>
          <button onClick={() => setPage(null)}>Back</button>
          {page === 0 && <HeroSection />}
          {page === 1 && <Avatar />}
        </>
      </Suspense>
    </>
  );
};

export default Lab;
