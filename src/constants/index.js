// import { meta, shopify, starbucks, tesla } from '../assets/images';
import {
  contact,
  css,
  express,
  git,
  github,
  html,
  javascript,
  linkedin,
  motion,
  mui,
  nodejs,
  react,
  sass,
  tailwindcss,
  typescript,
  apollo,
  docker,
  graphql,
  nestjs,
  postgresql,
  typeorm,
  amiltone,
  consoneo,
  dice,
  soccer,
  cities
} from '../assets/icons';

export const skills = [
  // {
  //   imageUrl: css,
  //   name: 'CSS',
  //   type: 'Frontend'
  // },
  // {
  //   imageUrl: html,
  //   name: 'HTML',
  //   type: 'Frontend'
  // },
  // {
  //   imageUrl: javascript,
  //   name: 'JavaScript',
  //   type: 'Frontend'
  // },
  {
    imageUrl: typescript,
    name: 'TypeScript',
    type: 'Frontend'
  },
  {
    imageUrl: react,
    name: 'React',
    type: 'Frontend'
  },
  {
    imageUrl: nodejs,
    name: 'Node.js',
    type: 'Backend'
  },
  {
    imageUrl: express,
    name: 'Express',
    type: 'Backend'
  },
  {
    imageUrl: nestjs,
    name: 'NestJs',
    type: 'Backend'
  },
  {
    imageUrl: apollo,
    name: 'Apollo',
    type: 'Fullstack'
  },
  {
    imageUrl: graphql,
    name: 'GraphQL',
    type: 'Fullstack'
  },
  {
    imageUrl: typeorm,
    name: 'TypeORM',
    type: 'Backend'
  },
  {
    imageUrl: docker,
    name: 'Docker',
    type: 'DevOps'
  },
  {
    imageUrl: postgresql,
    name: 'PostgreSQL',
    type: 'Database'
  },
  {
    imageUrl: motion,
    name: 'Motion',
    type: 'Animation'
  },
  // {
  //   imageUrl: mui,
  //   name: 'Material-UI',
  //   type: 'Frontend'
  // },
  // {
  //   imageUrl: sass,
  //   name: 'Sass',
  //   type: 'Frontend'
  // },
  {
    imageUrl: tailwindcss,
    name: 'Tailwind CSS',
    type: 'Frontend'
  },
  // {
  //   imageUrl: git,
  //   name: 'Git',
  //   type: 'Version Control'
  // },
  {
    imageUrl: github,
    name: 'GitHub',
    type: 'Version Control'
  }
];

export const experiences = [
  {
    title: 'Full stack Developer',
    company_name: 'Amiltone',
    icon: amiltone,
    iconBg: '#e7ecf2',
    date: 'Oct 2023 - Present',
    points: [
      'Developing and maintaining Flotto, a fleet management application using Nest.js and other related technologies.',
      'Implementing a user document management solution with Minio.',
      'Configuring Keycloak for sending registration confirmation emails, password recovery, etc. Integrating custom' +
        ' themes and creating templates. Deploying on the dedicated server.',
      'Integrating Stripe for managing subscriptions with trial periods and payments.',
      'CRUD operations and backend ticket resolution in Nest.js, including bug fixes, performance optimizations, and' +
        ' functional enhancements.',
      'Updating and maintaining Docker containers for the development environment.',
      'Setting up a proof of concept (POC) with Apisix, including Docker container configuration.',
      'Actively participating in code reviews to ensure code quality and adherence to best practices (DOD, Commit' +
        ' trailer, etc.).',
      'Preparing for a hackathon and conducting pentesting activities to identify and resolve vulnerabilities.'
    ]
  },
  {
    title: 'Web Developer',
    company_name: 'Consoneo',
    icon: consoneo,
    iconBg: '#e7f2eb',
    date: 'Sept 2022 - Sept 2023',
    points: [
      'Developing and maintaining web applications using React.js and other related technologies.',
      'Redefining and improving the Design System using React, JavaScript, and Storybook to ensure visual consistency' +
        ' across different components.',
      'Enhancing an internal application by integrating the new components from the Design System.',
      'Writing and executing unit tests using Jest.js.',
      'Implementing containerization solutions with Docker to simplify POC deployment.',
      'Developing full-stack POCs using various technologies such as Nest.js / Next.js / PHP / Symfony / MySQL / PostgreSQL'
    ]
  }
];

export const socialLinks = [
  {
    name: 'Contact',
    iconUrl: contact,
    link: '/contact'
  },
  {
    name: 'GitHub',
    iconUrl: github,
    link: 'https://github.com/GrischK'
  },
  {
    name: 'LinkedIn',
    iconUrl: linkedin,
    link: 'https://www.linkedin.com/in/grischka-gorski-gg'
  }
];

export const projects = [
  {
    iconUrl: soccer,
    theme: 'btn-back-red',
    name: 'Pronos des potos',
    description:
      'Responsive web application that allows users to make predictions about Euro 2024 matches. Generation of a' +
      ' dynamic leaderboard in real-time.',
    link: 'https://github.com/GrischK/Pronos-euro-des-potos'
  },
  {
    iconUrl: soccer,
    theme: 'btn-back-green',
    name: 'Mapado',
    description:
      "Web and native application offering the ability to view a city's points of interest. Role creation with an admin dashboard to assign permissions and manage cities and points of interest..",
    link: 'https://github.com/WildCodeSchool/2209-wns-adleman-mapado'
  },
  {
    iconUrl: dice,
    theme: 'btn-back-blue',
    name: 'Les fous du Catane',
    description:
      'Responsive web application themed around the board game Catan. Random avatar creation using the Avataaars API, game score recording, leaderboard generation, dynamic podium with animations.',
    link: ''
  }
];
