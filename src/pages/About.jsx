import { experiences, skills } from '../constants/index.js';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import CTA from '../components/CTA.jsx';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import React, { Suspense } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useInView } from '@react-spring/web';
const HeroCamera = React.lazy(() => import('../components/HeroCamera.jsx'));
const Husky2 = React.lazy(() => import('../models/Husky2.jsx'));
const ReactLogo = React.lazy(() => import('../components/ReactLogo.jsx'));
const Cube = React.lazy(() => import('../components/Cube.jsx'));
const Rings = React.lazy(() => import('../components/Rings.jsx'));
const SpinLoader = React.lazy(() => import('../components/SpinLoader.jsx'));
const HackerRoom = React.lazy(() => import('../components/HackRoom.jsx'));

const TimelineElement = React.memo(({ experience }) => (
  <VerticalTimelineElement
    animate={false}
    key={`experience-${experience.title}`}
    date={experience.date}
    icon={
      <div className="flex justify-center items-center w-full h-full">
        <img
          src={experience.icon}
          alt={experience.company_name}
          className="w-[60%] h-[60%] object-contain"
          loading="lazy" // Ajout du lazy loading
        />
      </div>
    }
    contentStyle={{
      borderBottom: '8px',
      borderStyle: 'solid',
      borderBottomColor: experience.iconBg,
      boxShadow: 'none'
    }}
    iconStyle={{
      background: experience.iconBg
    }}
  >
    <div>
      <h3 className="text-black text-xl font-poppins font-semibold">{experience.title}</h3>
      <p
        className="text-black-500 font-medium font-base"
        style={{ margin: 0 }}
      >
        {experience.company_name}
      </p>
      <ul className="my-5 list-disc ml-5 space-y-2">
        {experience.projects.map((project, index) => (
          <div
            key={`projects-${index}`}
            className={`${index < experience.projects.length - 1 ? 'border-b-2 pb-4' : ''}`}
          >
            <div className="flex gap-2">
              {project.url ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.title}
                </a>
              ) : (
                <span>{project.title}</span>
              )}
            </div>
            {project.projectTechnologies.length !== 0 && (
              <div className="block-container flex gap-2 mt-2 mb-4">
                {project.projectTechnologies.map((projectTechnology, index) => (
                  <div
                    className="block-container w-6 h-6"
                    key={`projectTechnologies-${index}`}
                  >
                    <div className="btn-front flex justify-center items-center">
                      <img
                        src={projectTechnology}
                        alt={projectTechnology}
                        className="w-6 h-6 object-contain"
                        loading="lazy" // Ajout du lazy loading
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
            {project.points.map((point, index) => (
              <li
                className="text-black-500/50 font-normal pl-1 text-sm"
                key={`project-point-${index}`}
              >
                {point}
              </li>
            ))}
          </div>
        ))}
      </ul>
    </div>
  </VerticalTimelineElement>
));

const About = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const [ref, inView] = useInView({ rootMargin: '1000px 0px', threshold: 0, triggerOnce: false });

  const Scene = React.memo(() => (
    <Canvas
      className={'w-full'}
      style={{ height: '80vh' }}
    >
      <Suspense
        fallback={
          <SpinLoader
            bg={'white'}
            textColor={'black'}
          />
        }
      >
        <PerspectiveCamera
          makeDefault
          position={[0, 0, 29]}
        />
        <HeroCamera isMobile={isMobile}>
          <HackerRoom
            scale={isMobile ? 0.06 : 0.1}
            position={[isMobile ? 0.5 : 0.1, -4.5, 5]}
            rotation={[0.2, Math.PI, 0]}
          />
          <Husky2
            key="husky-headlow"
            position={[isMobile ? 3.5 : 7.5, -5.3, 10]}
            scale={isMobile ? 1.35 : 2}
            rotation={[Math.PI / 20, -Math.PI / 5, 0]}
            currentAnimation={'Idle_2_HeadLow'}
          />
        </HeroCamera>
        <group>
          <ReactLogo
            position={[isMobile ? 5.2 : 8, isMobile ? 5.4 : 8, 0]}
            scale={isMobile ? 0.5 : 0.6}
          />
          <Cube
            position={[isMobile ? -4 : -15, isMobile ? -6.1 : -4, isMobile ? 10 : 0]}
            rotation={[2.6, 0.8, -1.8]}
            scale={isMobile ? 0.3 : 0.74}
          />
          <Rings
            position={[isMobile ? -12 : -20, isMobile ? 15.5 : 15, 0]}
            scale={isMobile ? 0.5 : 0.7}
          />
        </group>
        <ambientLight intensity={1} />
        <directionalLight
          position={[10, 10, 10]}
          intensity={2}
        />
      </Suspense>
    </Canvas>
  ));

  return (
    <section className="max-container">
      <h1 className="head-text">
        Hello, I'm <span className="blue-gradient_text font-semibold drop-shadow">Grischka</span>
      </h1>
      <div>
        <p className="mt-5 flex flex-col gap-3 text-slate-500">
          Software engineer based in Bordeaux (France), developing Javascript skills in Front-end &
          Back-end.
        </p>
      </div>
      <div className="py-10 flex flex-col">
        <div
          ref={ref}
          className={`h-[80vh] w-full transition-opacity duration-700 ease-out ${inView ? 'opacity-100' : 'opacity-0'}`}
        >
          {inView && <Scene />}
        </div>
        <h3 className="subhead-text">My Skills</h3>
        <div className="mt-16 flex flex-wrap gap-12">
          {skills.map((skill, index) => (
            <div
              className="relative group"
              key={`skill-${index}`}
            >
              <div className="block-container w-20 h-20">
                <div className="btn-back rounded-xl" />
                <div className="btn-front rounded-xl flex justify-center items-center">
                  <img
                    src={skill.imageUrl}
                    alt={skill.name}
                    className="w-1/2 h-1/2 object-contain"
                  />
                </div>
              </div>
              <span className="absolute bottom-[-1.5rem] left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="py-16">
        <h3 className="subhead-text">Work Experience</h3>
        <div>
          <p className="mt-5 flex flex-col gap-3 text-slate-500">
            I worked with different companies, levelling up my skills & teaming up with smart
            people. Here's the rundown:
          </p>
        </div>
        <div className="mt12 flex relative">
          <VerticalTimeline>
            {experiences.map((experience, index) => (
              <TimelineElement
                key={`experience-${index}`}
                experience={experience}
              />
            ))}
          </VerticalTimeline>
        </div>
      </div>
      <hr className="border-slate-200" />
      <CTA />
    </section>
  );
};

export default About;
