import { projects } from '../constants/index.js';
import { Link } from 'react-router-dom';
import CTA from '../components/CTA.jsx';
import Arrow from '../assets/icons/arrow.svg?react';
import { useState } from 'react';
import { BookContainer } from '../components/BookContainer.jsx';

const Projects = () => {
  const [step, setStep] = useState(1);

  const handelChangeStep = () => {
    setStep(2);
  };

  return (
    <>
      {step === 1 && (
        <BookContainer
          handelChangeStep={handelChangeStep}
          displayButton={true}
        />
      )}
      {step === 2 && (
        <section className="max-container">
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
                    <div className="mt5 flex items-center gap-2 font-poppins">
                      <Link
                        to={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-blue-600"
                      >
                        Live link
                      </Link>
                      <Arrow className="blue-arrow" />
                    </div>
                  </div>
                </div>
              ))}{' '}
            </div>
          </div>
          <button
            onClick={() => setStep(1)}
            className={`border-transparent hover:border-white transition-all duration-300 px-4 py-3 rounded-full text-lg uppercase shrink-0 border bg-black/30 text-white ml-3`}
          >
            Look at the book
          </button>
          <hr className="border-slate-200 " />
          <CTA />
        </section>
      )}
    </>
  );
};

export default Projects;
