import { BookContainer } from '../components/BookContainer.jsx';

const Lab = () => {
  return (
    <>
      <HeroSection />
      <div className={'h-screen w-screen bg-amber-300'}>Coucou</div>
      <BookContainer/>
    </>
  );
};

import HeroSection from '../components/HeroSection.jsx';

export default Lab;
