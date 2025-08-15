import type { Link, Status, Tech } from '../components/svelte/projects/types/tags';

export const projects = [
  {
    title: 'Portfolio Website',
    description:
      "I wanted my portfolio to be more than just another scrolling résumé, so I built it as an interactive game. Using PixiJS for rich, responsive visuals and Svelte for a snappy UI, it blends playful exploration with a clear, no-nonsense route for visitors who just want the content. It's part personal brand statement, part technical playground, and 100% mine from concept to code.",
    impact:
      'Shows my ability to merge creative design with strong technical execution, making a memorable first impression.',
    status: 'progress' as Status,
    techStack: ['svelte', 'pixijs', 'typescript'] as Tech[],
    links: [
      { url: 'https://github.com/samthesomebody/portfolio-website', type: 'github' as Link },
      { url: 'https://gamedevsam.com/', type: 'live' as Link },
    ],
  },
  {
    title: 'Child Safety Animations',
    description:
      'Produced a suite of animated training videos clarifying the difference between child safety and child protection for professional and volunteer audiences. Built custom Unity scripts to automate repetitive animation tasks, improving production speed and consistency. Every video was exported at high quality for easy distribution, ensuring the content was clear, engaging, and accessible to a wide audience.',
    impact:
      'Delivered training materials that improved clarity, saved production time, and supported critical education efforts.',
    status: 'completed' as Status,
    techStack: ['unity', 'c_sharp', 'animation'] as Tech[],
    links: [{ url: '#', type: 'private' as Link }],
    images: [
      {
        src: '/images/projects/child-safety/1.png',
        alt: 'Child safety animation scene showing training video interface',
      },
      {
        src: '/images/projects/child-safety/2.png',
        alt: 'Child safety animation scene showing training video interface',
      },
      {
        src: '/images/projects/child-safety/3.png',
        alt: 'Child safety animation scene showing training video interface',
      },
      {
        src: '/images/projects/child-safety/4.png',
        alt: 'Child safety animation scene showing training video interface',
      },
    ],
  },
  {
    title: 'Investment Property Assistant',
    description:
      'A solo project to turn raw property data into actionable insights. Features interactive dashboards that help users evaluate potential investment properties at a glance. Future plans include integrating automated data scraping and machine learning–driven forecasts to predict returns, rental yield, and market trends, making it a powerful tool for long-term investment planning.',
    impact:
      'Lays the foundation for a data-driven platform that could save investors time, reduce risk, and boost decision-making accuracy.',
    status: 'progress' as Status,
    techStack: ['react', 'tailwind', 'typescript'] as Tech[],
    links: [
      { url: 'https://github.com/SamTheSomebody/investment-property-assistant', type: 'github' as Link },
      { url: '', type: 'private' as Link },
    ],
    images: [
      {
        src: '/images/projects/investment-property-assistant/demo.webp',
        alt: 'Investment property assistant demo',
      },
    ],
  },
  {
    title: 'GV Crocs',
    description:
      'Built and deployed a volunteer-run website for the Goulburn Valley Crocs swim club with an ultra-lean tech stack to keep costs almost zero. Leveraged Formspree for sign-ups and Google Calendar for events, eliminating the need for a backend while still delivering a clean, mobile-friendly, and easy-to-update site that serves as a hub for prospective members.',
    impact:
      'Provided the club with a professional, functional web presence without adding ongoing financial or technical burdens.',
    status: 'completed' as Status,
    techStack: ['html', 'tailwind', 'github_pages', 'formspree', 'no_cost'] as Tech[],
    links: [
      { url: 'https://github.com/samthesomebody/gvcrocs', type: 'github' as Link },
      { url: 'https://gvcrocs.org/', type: 'live' as Link },
    ],
    images: [
      {
        src: '/images/projects/gv-crocs/Page.png',
        alt: 'GV Crocs website homepage',
      },
      {
        src: '/images/projects/gv-crocs/Hover.png',
        alt: 'GV Crocs website hover state',
      },
      {
        src: '/images/projects/gv-crocs/Lighthouse.png',
        alt: 'GV Crocs website lighthouse report',
      },
    ],
  },
  {
    title: 'Mini by Sam (V.1)',
    description:
      'Designed and built a fully custom 36-key split ergonomic keyboard from the ground up, including PCB design, firmware programming, and assembly. The layout prioritises comfort and portability, while the firmware offers a tailored typing experience. This project reflects my end-to-end design capabilities and love for optimising tools to fit the user perfectly.',
    impact:
      'Demonstrates my ability to take a hardware concept from initial idea to fully functioning, user-ready product.',
    status: 'completed' as Status,
    techStack: ['firmware', 'pcb_design', 'hardware'] as Tech[],
    links: [{ url: 'https://github.com/SamTheSomebody/zmk-keyboard-mini', type: 'github' as Link }],
  },
  {
    title: 'Pomodo',
    description:
      "A command-line Pomodoro timer combined with a to-do list that uses smart task prioritisation to help you start quickly and focus on high-impact work. Built with Bubbletea for a clean terminal UI and Cobra for flexible command handling, it's designed for speed, simplicity, and keeping you in the zone.",
    impact: 'Turns time management into a fast, distraction-free workflow for developers and terminal power users.',
    status: 'progress' as Status,
    techStack: ['go', 'bubbletea', 'cobra', 'cli'] as Tech[],
    links: [{ url: 'https://github.com/SamTheSomebody/pomodo', type: 'github' as Link }],
  },
  {
    title: 'Qcka',
    description:
      'A lightweight CLI utility for managing bash aliases without editing configuration files manually. Lets you create, list, and remove aliases directly from the terminal in seconds, streamlining shell customisation for power users and newcomers alike.',
    impact: 'Saves developers time and reduces friction when personalising their command-line environment.',
    status: 'completed' as Status,
    techStack: ['go', 'cobra', 'cli'] as Tech[],
    links: [{ url: 'https://github.com/SamTheSomebody/qcka', type: 'github' as Link }],
  },
  {
    title: 'Cyberfluent',
    description:
      'Led the development of seven Unity WebGL modules for enterprise cybersecurity training, owning everything from CI/CD pipelines to AWS infrastructure. Achieved a 90% reduction in load times through targeted asset compression, build optimisation, and runtime logic refactoring. Built Unity Editor extensions and internal dashboards to speed up development, integrated RESTful APIs for progress tracking and authentication, and worked closely with animators, designers, and QA to deliver fast, polished, browser-friendly training experiences at scale.',
    impact:
      'Enabled the company to deliver high-quality, high-performance training to thousands of users with minimal downtime and maximum engagement.',
    status: 'completed' as Status,
    techStack: ['react', 'tailwind', 'aws', 'unity', 'c_sharp', 'typescript'] as Tech[],
    links: [
      { url: 'https://www.cyberfluent.com.au/', type: 'live' as Link },
      { url: '', type: 'private' as Link },
    ],
  },
  {
    title: 'Lydillias',
    description:
      'Developed a functional prototype for a metaverse MVP aimed at securing funding. Implemented a day and night cycle, smooth player movement, and early-stage worldbuilding elements to demonstrate visual and technical potential. Although the project was shelved, it showcased my ability to rapidly prototype immersive environments under tight timelines.',
    impact:
      "Proved complex worldbuilding and gameplay systems could be delivered quickly, strengthening the project's pitch for funding.",
    status: 'cancelled' as const,
    techStack: ['unreal_engine', 'c_plus_plus'] as Tech[],
    links: [
      { url: 'https://idyllias.com/', type: 'live' as const },
      { url: '', type: 'private' as const },
    ],
  },
];
