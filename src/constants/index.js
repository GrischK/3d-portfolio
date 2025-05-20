// import { meta, shopify, starbucks, tesla } from '../assets/images';
import {
  amiltone,
  apollo,
  aws,
  consoneo,
  contact,
  cp,
  dice,
  docker,
  express,
  flotto,
  github,
  graphql,
  js,
  linkedin,
  map,
  nestjs,
  nodejs,
  postgresql,
  python,
  react,
  soccer,
  storybook,
  tailwindcss,
  threejs,
  typeorm,
  typescript,
  wildCodeSchool,
  figma,
  framer,
  leaflet,
  materialUi,
  reactNative,
  jest,
  playwright,
  typeGraphQL,
  githubactions,
  nginx,
  caddy,
  alrj,
  prisma,
  nodemailer,
  mysql,
} from '../assets/icons';

export const skills = [
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
    imageUrl: nestjs,
    name: 'NestJS',
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
    imageUrl: threejs,
    name: 'Three.js',
    type: '3D'
  },
  {
    imageUrl: tailwindcss,
    name: 'Tailwind',
    type: 'Frontend'
  },
  {
    imageUrl: github,
    name: 'GitHub',
    type: 'Version Control'
  },
  {
    imageUrl: aws,
    name: 'AWS',
    type: 'Backend'
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
        title: 'Cliquez-Postez',
        projectLogo: cp,
        projectTechnologies: [react, aws, js, typescript, python, graphql],
        url: 'https://www.cliquezpostez.com/',
        points: [
          'Developed and maintained the Cliquez-Postez website, which enables users to send postal letters with just a few clicks.',
          'AWS : Lambda, Amplify, DynamoDB, API Gateway, CloudFormation, S3, SNS... to build scalable solutions',
          'JS & Python : Developed serverless functions using AWS Lambda with layers for efficient deployment.',
          'Integrated the La Poste API to send registered letters and creating a CRON job to retrieve letter statuses.',
          'Connected to an internal system to send other letters for printing',
          'Implemented SMS notifications using AWS SNS to keep users informed about their letter statuses and delivery updates.'
        ]
      },
      {
        title: 'Flotto',
        projectLogo: flotto,
        projectTechnologies: [nestjs, docker, typeorm, typescript, postgresql],
        url: 'https://www.flotto-app.com/',
        points: [
          'Developed and maintained Flotto, a fleet management application using Nest.js and related technologies.',
          'Minio : Implemented a user document management solution.',
          'Keycloak : For user registration, confirmation emails, password recovery, etc. with custom themes and templates.',
          'Stripe :  Subscriptions with trial periods and payment processing.',
          'Docker : Updated and maintained containers for the development environment.',
          'Nest.js : CRUD operations and backend ticket resolution, including bug fixes, performance optimizations, and' +
            ' functional enhancements.',
          'Code reviews : To ensure code quality and adherence to best practices (DOD, Commit, trailer, etc.).',
          'POC : Apisix, including Docker container configuration.',
          'Hackathon : Pentesting activities to identify and resolve vulnerabilities.'
        ]
      }
    ]
  },
  {
    title: 'Full-Stack Developer',
    company_name: 'Consoneo',
    icon: consoneo,
    iconBg: '#e7f2eb',
    date: 'Sept 2022 - Sept 2023',
    projects: [
      {
        title: 'Design System',
        projectLogo: '',
        projectTechnologies: [react, js, storybook],
        points: [
          'React, JavaScript & Storybook : Redefined and enhanced the Design System to ensure visual consistency across components.',
          'Jest.js : Wrote and executed unit tests using to ensure code reliability.'
        ]
      },
      {
        title: 'Other',
        projectLogo: '',
        projectTechnologies: [react, nestjs, docker, postgresql],
        points: [
          'React : Developed and maintained web applications using React.js and other related technologies.',
          'Enhanced an internal application by integrating components from the updated Design System.',
          'Implemented containerization solutions with Docker to streamline POC deployment.',
          'Developed full-stack POCs using technologies such as Nest.js, Next.js, PHP, Symfony, MySQL, PostgreSQL'
        ]
      }
    ]
  },
  {
    title: 'Full-Stack Developer',
    company_name: 'Wild Code School',
    icon: wildCodeSchool,
    iconBg: '#faf1ff',
    date: 'Sept 2022 - Sept 2023',
    projects: [
      {
        title: 'Mapado – City Exploration App',
        projectLogo: '',
        projectTechnologies: [
          react,
          reactNative,
          typescript,
          graphql,
          apollo,
          figma,
          materialUi,
          framer,
          leaflet
        ],
        points: [
          'React, React Native (Expo) & TypeScript: Built responsive and interactive user interfaces for both web and mobile platforms.',
          'Apollo Client & GraphQL: Managed client-side data efficiently with type-safe queries and caching.',
          'React Router & React Navigation: Implemented smooth navigation across platforms.',
          'Figma: Created interactive mockups and prototypes for feature previews.',
          'UI Libraries: Integrated Material UI, Framer Motion, and Leaflet for engaging UI/UX and interactive maps.'
        ]
      },
      {
        title: 'Backend & DevOps',
        projectLogo: '',
        projectTechnologies: [
          nodejs,
          express,
          apollo,
          typeGraphQL,
          typeorm,
          postgresql,
          docker,
          githubactions,
          nginx,
          caddy
        ],
        points: [
          'GraphQL API: Designed and implemented a robust backend using Node.js, Express, Apollo Server, and TypeGraphQL.',
          'Database: Modeled complex relationships with TypeORM and PostgreSQL.',
          'Security: Applied authentication rules with @Authorized and hashed passwords using Argon2.',
          'External APIs: Integrated third-party services (geolocation, city images) to enrich content.',
          'Docker & CI/CD: Dockerized all services and set up CI/CD pipelines with GitHub Actions, deployed on VPS using Nginx, Caddy, and DockerHub webhooks.'
        ]
      },
      {
        title: 'Testing, Security & Collaboration',
        projectLogo: '',
        projectTechnologies: [jest, playwright],
        points: [
          'Testing: Wrote unit (Jest), integration, and end-to-end (Playwright) tests in isolated environments using mocks.',
          'Security: Secured server access (SSH, fail2ban, custom ports), implemented protections against XSS, CSRF, and SQL injections.',
          'Agile & Git Workflow: Worked in Agile Scrum sprints, managed tasks in a backlog, used advanced Git flows (feature/dev/staging/main), and enforced 2-person PR validation.'
        ]
      }
    ]
  },
  {
    title: 'Full-Stack Developer',
    company_name: 'Alrj',
    icon: alrj,
    iconBg: '#fff3e6',
    date: 'May 2022 - July 2022',
    projects: [
      {
        title: 'Allergy-Friendly Product Search',
        projectLogo: '',
        projectTechnologies: [react, tailwindcss],
        points: [
          'React & Tailwind CSS: Built a responsive user interface with Tailwind, Flowbite components, and Heroicons.',
          'User Journeys: Implemented flows for sign-up, family profile management, allergy input, and product search/consultation.',
          'Favorites & Product Details: Enabled saving favorites and visualizing detailed product data, including label display.'
        ]
      },
      {
        title: 'REST API & Backend Logic',
        projectLogo: '',
        projectTechnologies: [nodejs, express, prisma, mysql, nodemailer],
        points: [
          'API Design: Created a secure REST API using Node.js, Express, and Prisma for MySQL database access.',
          'Authentication: Secured user authentication using Argon2 and managed user/family profile accounts.',
          'Data Validation: Validated input data with Joi and handled transactional emails with Nodemailer and Mustache templates.',
          'Advanced Search: Developed allergy-aware product filtering logic based on user profiles.'
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
    iconUrl: map,
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
