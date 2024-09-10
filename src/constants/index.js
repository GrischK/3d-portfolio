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
  {
    imageUrl: javascript,
    name: 'JavaScript',
    type: 'Frontend'
  },
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
      'Developing and maintaining web applications using React.js and other related technologies.',
      'Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.',
      'Implementing responsive design and ensuring cross-browser compatibility.',
      'Participating in code reviews and providing constructive feedback to other developers.'
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
      'Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.',
      'Implementing responsive design and ensuring cross-browser compatibility.',
      'Participating in code reviews and providing constructive feedback to other developers.'
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
    link: 'https://github.com/YourGitHubUsername'
  },
  {
    name: 'LinkedIn',
    iconUrl: linkedin,
    link: 'https://www.linkedin.com/in/YourLinkedInUsername'
  }
];

export const projects = [
  {
    iconUrl: dice,
    theme: 'btn-back-red',
    name: 'Pronos des potos',
    description:
      'Developed a web application that tracks and notifies users of price changes for products on Amazon, helping users find the best deals.',
    link: 'https://github.com/adrianhajdin/pricewise'
  },
  {
    iconUrl: soccer,
    theme: 'btn-back-green',
    name: 'Mapado',
    description:
      'Created a full-stack replica of the popular discussion platform "Threads," enabling users to post and engage in threaded conversations.',
    link: 'https://github.com/adrianhajdin/threads'
  },
  {
    iconUrl: cities,
    theme: 'btn-back-blue',
    name: 'Les fous du Catane',
    description:
      'Designed and built a mobile app for finding and comparing cars on the market, streamlining the car-buying process.',
    link: 'https://github.com/adrianhajdin/project_next13_car_showcase'
  }
];
