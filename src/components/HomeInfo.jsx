import React from 'react';
import { Link } from 'react-router-dom';
import Arrow from '../assets/icons/arrow.svg?react';

const InfoBox = ({ text, link, btnText }) => (
  <div className="info-box">
    <p className="font-light sm:text-xl text-lg text-center">{text}</p>
    <Link
      to={link}
      className="neo-brutalism-white neo-btn sm:text-xl text-lg"
    >
      {btnText}
      <Arrow className="green-arrow"/>
    </Link>
  </div>
);

const renderContent = {
  1: (
    <h1 className="sm:text-xl text-lg sm:leading-snug text-center neo-brutalism-green py-4 px-8 text-white mx-5 font-light">
      Hi, I am <span className="font-semibold">Grischka</span>👋
      <br />A software Engineer from France.
    </h1>
  ),
  2: (
    <InfoBox
      text="Worked as sofware engineer for many projects and picked many skills along the way"
      link="/about"
      btnText="Learn more"
    />
  ),
  3: (
    <InfoBox
      text="Contributed to several projects over the years. Curious about the impact?"
      link="/projects"
      btnText="Visit my portfolio"
    />
  ),
  4: (
    <InfoBox
      text="Need a project done or looking for a dev? I'm just a few keystrokes away"
      link="/contact"
      btnText="Let's talk"
    />
  ),
  5: (
    <InfoBox
      text="Looking to experiment with some fun animations and interactive 3D? Here is my playground..."
      link="/lab"
      btnText="Dive into my lab"
    />
  )
};

const HomeInfo = ({ currentStage }) => {
  return renderContent[currentStage] || null;
};

export default HomeInfo;
