import React from 'react';
import { Link } from 'react-router-dom';
import arrow from '../assets/icons/arrow.svg';

const InfoBox = ({ text, link, btnText }) => (
  <div className="info-box">
    <p className="font-light sm:text-xl text-lg text-center">{text}</p>
    <Link
      to={link}
      className="neo-brutalism-white neo-btn sm:text-xl text-lg"
    >
      {btnText}
      <img
        src={arrow}
        alt="rigth arrow"
        className="w4 h4 object-contain"
      />
    </Link>
  </div>
);

const renderContent = {
  1: (
    <h1 className="sm:text-xl text-lg sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5 font-light">
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
      text="Led some projects over the years. Curious about the impact?"
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
  )
};

const HomeInfo = ({ currentStage }) => {
  return renderContent[currentStage] || null;
};

export default HomeInfo;
