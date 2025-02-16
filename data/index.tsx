import Banner from "@/components/Banner";
import About from "@/components/About";
import Register from "@/components/Register";
import Gallery from "@/components/Gallery";
import Education from "@/components/Education";
import Course from "@/components/Course";
import Center from "@/components/Center";

export const menuItems = [
  {name : "Home", pos : <Banner />},
  { name : "About", pos : <About />},
  { name : "Register", pos : <Register />},
  { name : "Gallery", pos : <Gallery />},
  { name : "Education", pos : <Education />},
  { name : "Course", pos : <Course />},
  { name : "Center", pos : <Center />},
];

interface Course {
  name: string;
  description: string;
  fees: string;
}

export const courses: Course[] = [
  { name: 'React for Beginners', description: 'Learn the basics of React, including components, state management, and hooks.', fees: '$99' },
  { name: 'Next.js Mastery', description: 'Deep dive into Next.js 13+, covering server-side rendering, static site generation, and API routes.', fees: '$149' },
  { name: 'Tailwind CSS Essentials', description: 'Style faster with Tailwind, mastering utility-first design and responsive layouts.', fees: '$79' },
];

export const images = [
  { src: '/project.png', name: 'Program', gallery: ['/project.png', '/project.png', '/project.png'] },
  { src: '/project.png', name: 'Picnic', gallery: ['/project.png', '/project.png', '/project.png'] },
  { src: '/project.png', name: 'Classroom', gallery: ['/project.png', '/project.png', '/project.png'] },
  { src: '/project.png', name: 'Examination', gallery: ['/project.png', '/project.png', '/project.png'] },
  { src: '/project.png', name: 'Tree Plantation', gallery: ['/project.png', '/project.png', '/project.png'] },
  { src: '/project.png', name: 'Cultural Fest', gallery: ['/project.png', '/project.png', '/project.png'] },
  { src: '/project.png', name: 'Award Ceremony', gallery: ['/project.png', '/project.png', '/project.png'] },
  { src: '/project.png', name: 'Certification', gallery: ['/project.png', '/project.png', '/project.png'] },
];