// import { meta, shopify, starbucks, tesla } from '../assets/images';
import {
  amiltone,
  apollo,
  consoneo,
  contact,
  cp,
  dice,
  docker,
  express,
  flotto,
  github,
  graphql,
  linkedin,
  motion,
  nestjs,
  nodejs,
  postgresql,
  react,
  soccer,
  tailwindcss,
  typeorm,
  typescript
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
    projects: [
      {
        title: 'Flotto',
        projectLogo: flotto,
        projectTechnologies: [nestjs, docker, typeorm, typescript, postgresql],
        url: 'https://www.flotto-app.com/',
        points: [
          'Developing and maintaining Flotto, a fleet management application using Nest.js and other related technologies.',
          'Minio : Implementing a user document management solution with .',
          'Keycloak : Registration, confirmation emails, password recovery, etc. Custom themes and templates.',
          'Stripe :  Subscriptions with trial periods and payments.',
          'Docker : Updating and maintaining containers for the development environment.',
          'Nest.js : CRUD operations and backend ticket resolution, including bug fixes, performance optimizations, and' +
            ' functional enhancements.',
          'Code reviews : Ensure code quality and adherence to best practices (DOD, Commit, trailer, etc.).',
          'POC : Apisix, including Docker container configuration.',
          'Hackathon : Pentesting activities to identify and resolve vulnerabilities.'
        ]
      },
      {
        title: 'Cliquez-Postez',
        projectLogo: cp,
        projectTechnologies: [react],
        url: 'https://www.cliquezpostez.com/',
        points: [
          'Developing and maintaining Cliquez-Postez website, which enable to send postal letters with few clicks.'
        ]
      }
    ]
  },
  {
    title: 'Web Developer',
    company_name: 'Consoneo',
    icon: consoneo,
    iconBg: '#e7f2eb',
    date: 'Sept 2022 - Sept 2023',
    projects: [
      {
        title: 'Consonéo',
        projectLogo: '',
        projectTechnologies: [],
        points: [
          'React.js : Developing and maintaining web applications using and other related technologies.',
          'Redefining and improving the Design System using React, JavaScript, and Storybook to ensure visual consistency' +
            ' across different components.',
          'Enhancing an internal application by integrating the new components from the Design System.',
          'Writing and executing unit tests using Jest.js.',
          'Implementing containerization solutions with Docker to simplify POC deployment.',
          'Developing full-stack POCs using various technologies such as Nest.js / Next.js / PHP / Symfony / MySQL / PostgreSQL'
        ]
      }
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
