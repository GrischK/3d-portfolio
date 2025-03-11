import { experiences, skills } from '../constants/index.js';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import CTA from '../components/CTA.jsx';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import HackerRoom from '../components/HackRoom.jsx';
import SpinLoader from '../components/SpinLoader.jsx';
import { Suspense } from 'react';

const About = () => {
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
        <h3 className="subhead-text">My Skills</h3>
        <Canvas className={'w-full h-full'}>
          <Suspense fallback={<SpinLoader />}>
            <PerspectiveCamera
              makeDefault
              position={[0, 0, 30]}
            />
            <HackerRoom
              scale={0.05}
              position={[0, 0, 0]}
              rotation={[0, -Math.PI / 2, 0]}
            />
          </Suspense>
        </Canvas>
        <div className="mt-16 flex flex-wrap gap-12">
          {skills.map((skill, index) => (
            <div
              className="block-container w-20 h-20"
              key={`skill-${index}`}
            >
              <div className="btn-back rounded-xl" />
              <div className="btn-front rounded-xl flex justify-center items-center">
                <img
                  src={skill.imageUrl}
                  alt={skill.name}
                  className="w-1/2 h-1/2 object-contain"
                />
              </div>
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
        <div className="mt12 flex">
          <VerticalTimeline>
            {experiences.map((experience, index) => (
              <VerticalTimelineElement
                key={`experience-${index}`}
                date={experience.date}
                icon={
                  <div className="flex justify-center items-center w-full h-full">
                    <img
                      src={experience.icon}
                      alt={experience.company_name}
                      className="w-[60%] h-[60%] object-contain"
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
                  <h3 className="text-black text-xl font-poppins font-semibold">
                    {experience.title}
                  </h3>
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
                        className={`${index < experience.projects.length - 1 ? ' border-b-2 pb-4' : ''}`}
                      >
                        <div className={'flex gap-2'}>
                          {project.url ? (
                            <a
                              href={project.url}
                              target="_blank"
                            >
                              {project.title}
                            </a>
                          ) : (
                            <span> {project.title}</span>
                          )}

                          {/*{project.projectLogo && (*/}
                          {/*  <img*/}
                          {/*    src={project.projectLogo}*/}
                          {/*    alt=""*/}
                          {/*    className={'h-6 w-6 rounded-xl'}*/}
                          {/*  />*/}
                          {/*)}*/}
                        </div>
                        {project.projectTechnologies.length !== 0 && (
                          <div className={'block-container flex gap-2 mt-2 mb-4'}>
                            {project.projectTechnologies.map((projectTechnology, index) => (
                              <div
                                className="block-container w-6 h-6"
                                key={`projectTechnologies-${index}`}
                              >
                                <div className="btn-back" />
                                <div className="btn-front flex justify-center items-center">
                                  <img
                                    src={projectTechnology}
                                    alt={projectTechnology}
                                    className="w-6 h-6 object-contain"
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
