import React, { Suspense, useState } from 'react';

const Avatar = React.lazy(() => import('../components/Avatar.jsx'));
const HeroSection = React.lazy(() => import('../components/HeroSection.jsx'));

const Lab = () => {
  const [page, setPage] = useState(null);

  return (
    <>
      {page === null && (
        <div className="min-h-[100vh] flex flex-col items-center justify-center text-center gap-8 bg-[#171720]">
          <button
            className={`w-[fit-content] border-transparent hover:bg-gradient-to-r from-[#00c6ff] to-[#0072ff] hover:text-white transition-all duration-300 px-4 py-3 rounded-full text-sm uppercase border bg-white text-black'}`}
            onClick={() => setPage(0)}
          >
            3D Hero Section
          </button>
          <button
            className={`w-[fit-content] border-transparent hover:bg-gradient-to-r from-[#00c6ff] to-[#0072ff] hover:text-white transition-all duration-300 px-4 py-3 rounded-full text-sm uppercase border bg-white text-black'}`}
            onClick={() => setPage(1)}
          >
            Custom my car
          </button>
        </div>
      )}
      <Suspense fallback={<div className="text-white text-center hidden">Chargement...</div>}>
        <>
          {page === 0 && <HeroSection />}
          {page === 1 && <Avatar />}
        </>
      </Suspense>
    </>
  );
};

export default Lab;
