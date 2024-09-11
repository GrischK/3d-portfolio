import { projects } from '../constants/index.js';
import { Link } from 'react-router-dom';
import { arrow } from '../assets/icons/index.js';

const Projects = () => {
  return (
    <section className="max-container">
      <h1 className="head-text">
        My <span className="blue-gradient_text font-semibold drop-shadow">Projects</span>
      </h1>
      <div>
        <p className="mt-5 flex flex-col gap-3 text-slate-500">
          I'v embarked on numerous projects throughout the years, but theses are the ones I hold
          closest to my heart. Many of them are open-source, so if you come across something that
          piques your interest, feel free to explore the codebase and contribute your ideas for
          further enhancements. Your collaboration is highly valued!
        </p>
        <div className="flex flex-wrap my-20 gap-16">
          {projects.map((project) => (
            <div className="lg:w[400px] w-full">
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
              <div className="mt-5 flex flex-col">
                <h4>{project.name}</h4>
                <p>{project.description}</p>
                <div>
                  <Link
                    to={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-blue-600"
                  >
                    Live link
                  </Link>
                  <img
                    src={arrow}
                    alt="arrow"
                    className="w-4 h-4 object-contain"
                  />
                </div>
              </div>
            </div>
          ))}{' '}
        </div>
      </div>
    </section>
  );
};

export default Projects;
