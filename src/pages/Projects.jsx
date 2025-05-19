import { projects } from '../constants/index.js';
import { Link, useSearchParams } from 'react-router-dom';
import CTA from '../components/CTA.jsx';
import Arrow from '../assets/icons/arrow.svg?react';
import { BookContainer } from '../components/BookContainer.jsx';
import { animated, useSpring } from '@react-spring/web';

const Projects = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const step = parseInt(searchParams.get('step') || '1');

  const handleChangeStep = () => {
    setSearchParams({ step: '2' });
  };

  const transitionToStep2 = useSpring({
    opacity: step === 2 ? 1 : 0,
    transform: step === 2 ? 'translateY(0px)' : 'translateY(20px)',
    immediate: step === 1,
    config: {
      tension: 220,
      friction: 20,
      mass: 1
    },
    // Ajout d'un délai pour laisser le temps au DOM de se mettre à jour
    delay: step === 2 ? 50 : 0
  });

  return (
    <>
      {step === 1 && (
        <BookContainer
          handelChangeStep={handleChangeStep}
          displayButton={true}
        />
      )}
      {step === 2 && (
        <animated.section
          className="max-container"
          style={transitionToStep2}
        >
          <h1 className="head-text">
            My <span className="blue-gradient_text font-semibold drop-shadow">Projects</span>
          </h1>
          <div>
            <p className="mt-5 flex flex-col gap-3 text-slate-500">
              I'v embarked on numerous personal projects throughout the years, but theses are the
              ones I hold closest to my heart. All of them are open-source, so if you come across
              something that piques your interest, feel free to explore the codebase and contribute
              your ideas for further enhancements. Your collaboration is highly valued!
            </p>
            <div className="flex flex-wrap my-20 gap-16">
              {projects.map((project) => (
                <div
                  className="lg:w-[400px] w-full"
                  key={project.name}
                >
                  <div className="block-container w-12 h-12">
                    <div className={`btn-back rounded-xl ${project.theme}`} />
                    <div className="btn-front rounded-xl flex justify-center items-center">
                      <img
                        src={project.iconUrl}
                        alt="project icon"
                        className="w-1/2 h-1/2 object-contain"
                      />
                    </div>
                  </div>
                  <div className="mt-5 flex flex-col gap-4">
                    <h4 className="text-2xl font-poppins font-semibold">{project.name}</h4>
                    <p className="mt2 text-slate-500">{project.description}</p>
                    <div className="mt5 flex items-center font-poppins group hover:cursor-pointer relative block w-14">
                      <Link
                        to={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-blue-600 absolute w-full"
                      >
                        Link
                      </Link>
                      <Arrow className="blue-arrow transition-transform duration-300 group-hover:translate-x-2 absolute right-0" />
                    </div>
                  </div>
                </div>
              ))}{' '}
            </div>
          </div>
          <div className={'flex justify-center mb-16'}>
            <button
              onClick={() => setStep(1)}
              className={`font-medium border-transparent hover:border-white transition-all duration-300 px-4 py-3 rounded-full text-lg uppercase shrink-0 border text-white ml-3 bg-gradient-to-r from-[#00c6ff] to-[#0072ff] bg-[length:200%_200%] bg-left hover:bg-right transition-[background-position] duration-500`}
            >
              Look at the book
            </button>
          </div>
          <hr className="border-slate-200 " />
          <CTA />
        </animated.section>
      )}
    </>
  );
};

export default Projects;
