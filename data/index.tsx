import Banner from "@/components/landingpage/Banner";
import About from "@/components/landingpage/About";
import Gallery from "@/components/landingpage/Gallery";
import Course from "@/components/landingpage/Course";
import Center from "@/components/landingpage/Center";
import { FaEnvelope, FaPhone, FaWhatsapp } from "react-icons/fa";

import { Settings2, SquareTerminal } from "lucide-react";

export const data = {
  navMain: [
    {
      title: "Fee payment",
      url: "#",
      role: "center",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Course Fee",
          url: "#",
        },
      ],
    },
    {
      title: "Verify",
      url: "#",
      role: "admin",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Enrollments",
          url: "#",
        },
        {
          title: "Exam Forms",
          url: "#",
        },

        {
          title: "Marksheets",
          url: "#",
        },
      ],
    },
    {
      title: "Enquiry",
      url: "#",
      role: "admin",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Enquiry",
          url: "#",
        },
      ],
    },
    {
      title: "Gallery",
      url: "#",
      role: "admin",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Gallery Insertion",
          url: "#",
        },
      ],
    },
    {
      title: "Student Info",
      url: "#",
      role: "admin",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Student Info",
          url: "#",
        },
      ],
    },
    {
      title: "Education",
      role: "center",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Online admission",
          url: "#",
        },

        {
          title: "Exam Form",
          url: "#",
        },
        {
          title: "Marksheet",
          url: "#",
        },
      ],
    },
    {
      title: "Downloads",
      role: "center",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "All Downloads",
          url: "#",
        },
      ],
    },
  ],
};

export const menuItems = [
  { name: "Home", pos: <Banner /> },
  { name: "About", pos: <About /> },
  { name: "Gallery", pos: <Gallery /> },
  { name: "Course", pos: <Course /> },
  { name: "Center", pos: <Center /> },
];

export const contactIcons = [
  {
    icon: <FaWhatsapp size={24} />,
    url: "https://api.whatsapp.com/send?phone=+8918580050",
  },
  {
    icon: <FaPhone size={24} />,
    url: "tel:+1234567890",
  },
  {
    icon: <FaEnvelope size={24} />,
    url: "mailto:your@email.com",
  },
];

// about
export const stats = [
  { label: "Projects Done", value: 400 },
  { label: "Active Clients", value: 340 },
  { label: "Get Rewards", value: 95 },
];

// course
export const courses = [
  {
    id: 1,
    category: "Published",
    title: "Basic Computer Concept",
    duration: "3 Months",
    image: "/project.png",
    price: "1000",
  },
  {
    id: 2,
    category: "Published",
    title: "Office Management",
    duration: "3 Months",
    image: "/project.png",
    price: "",
  },
  {
    id: 3,
    category: "Published",
    title: "Tally",
    duration: "3 Months",
    image: "/project.png",
    price: "1000",
  },
  {
    id: 4,
    category: "Published",
    title: "Basic Hardware Maintenance",
    duration: "2 Months",
    image: "/project.png",
    price: "1500",
  },
  {
    id: 5,
    category: "Published",
    title: "CCA",
    duration: "3 Months",
    image: "/project.png",
    price: "1200",
  },
  {
    id: 6,
    category: "Published",
    title: "CITA",
    duration: "3 Months",
    image: "/project.png",
    price: "1000",
  },
  {
    id: 7,
    category: "Published",
    title: "Knowledge on LINUX",
    duration: "3 Months",
    image: "/project.png",
    price: "1000",
  },
  {
    id: 8,
    category: "Published",
    title: "Knowledge on C/C++ Programming",
    duration: "3 Months",
    image: "/project.png",
    price: "1200",
  },
  {
    id: 9,
    category: "Published",
    title: "Python Programming",
    duration: "3 Months",
    image: "/project.png",
    price: "1000",
  },
  {
    id: 10,
    category: "Published",
    title: "Advance Excel",
    duration: "3 Months",
    image: "/project.png",
    price: "1000",
  },
  {
    id: 11,
    category: "Published",
    title: "CCTV Installation & Maintenance",
    duration: "3 Months",
    image: "/project.png",
    price: "1000",
  },
  {
    id: 12,
    category: "Published",
    title: "DTP",
    duration: "4 Months",
    image: "/project.png",
    price: "1500",
  },
  {
    id: 13,
    category: "Published",
    title: "Typing",
    description: "5 Classes per Week",
    duration: "4 Months",
    image: "/project.png",
    price: "800/Month",
  },
  {
    id: 14,
    category: "Published",
    title: "DCA",
    duration: "6 Months",
    image: "/project.png",
    price: "3000",
  },
  {
    id: 15,
    category: "Published",
    title: "DOAP",
    duration: "6 Months",
    image: "/project.png",
    price: "2500",
  },
  {
    id: 16,
    category: "Published",
    title: "DITA",
    duration: "9 Months",
    image: "/project.png",
    price: "4000",
  },
  {
    id: 17,
    category: "Published",
    title: "ADCA",
    duration: "12 Months",
    image: "/project.png",
    price: "5000",
  },
  {
    id: 18,
    category: "Published",
    title: "ADOAP",
    duration: "12 Months",
    image: "/project.png",
    price: "5000",
  },
  {
    id: 19,
    category: "Published",
    title: "Website Designing & Development",
    duration: "20 Months",
    image: "/project.png",
    price: "7000",
  },
];

// gallery
export const images = [
  {
    src: "/project.png", // client upload korar por ekhane update korbo
    name: "Program",
    gallery: ["/project.png", "/project.png", "/project.png"],
  },
  {
    src: "/project.png",
    name: "Picnic",
    gallery: ["/project.png", "/project.png", "/project.png"],
  },
  {
    src: "/project.png",
    name: "Classroom",
    gallery: ["/project.png", "/project.png", "/project.png"],
  },
  {
    src: "/project.png",
    name: "Examination",
    gallery: ["/project.png", "/project.png", "/project.png"],
  },
  {
    src: "/project.png",
    name: "Tree Plantation",
    gallery: ["/project.png", "/project.png", "/project.png"],
  },
  {
    src: "/project.png",
    name: "Cultural Fest",
    gallery: ["/project.png", "/project.png", "/project.png"],
  },
  {
    src: "/project.png",
    name: "Award Ceremony",
    gallery: ["/project.png", "/project.png", "/project.png"],
  },
  {
    src: "/project.png",
    name: "Certification",
    gallery: ["/project.png", "/project.png", "/project.png"],
  },
];

// Map
export const markers = [
  {
    position: [23.24787204917826, 87.0755423782607],
    label: "Jaltaki gora, Bankura - Raniganj Rd, Bankura, West Bengal: 722101",
  },
  {
    position: [22.815395509826303, 86.64094832383695],
    label:
      "RJ8R+39W Vivekanand Computer training center Jhilimili, বিবেকানন্দ কম্পিউটার ট্রেনিং সেন্টার ঝিলিমিলি, Jhilimili Rd, Jhilimili, West Bengal: 722148",
  },
  {
    position: [22.441094189000548, 86.99271726615162],
    label:
      "Jhargram National Youth Computer Center & Mind Mantra Abacus Jhargram, Chandra Apartment, Raj College Road, Jhargram, West Bengal: 721507",
  },
  {
    position: [23.15471920640986, 87.32319480850578],
    label:
      "583F+R79 Radhanagar Youth Computer Training Centre, Radha Nagar, West Bengal: 722157",
  },
  {
    position: [22.261376592341517, 87.01470513916067],
    label:
      "Lodhasuli - Ragra Main Rd, Khas Jangal, Lakshi Sagar, West Bengal: 721507",
  },
];

// IDCard Form
export const idCardFields = [
  { key: "sName", label: "Student Name", type: "text" },
  { key: "cName", label: "Course Name", type: "text" },
  { key: "idCardNo", label: "ID Card No.", type: "number" },
  { key: "enrollmentNo", label: "Enrollment No", type: "text" },
  { key: "address", label: "Address", type: "text" },
  { key: "centerName", label: "Center Name", type: "text" },
];

// Exam Form

// Admit Form
export const admitFields = [
  {
    key: "enrollNo",
    label: "Enrollment No",
    type: "text",
  },
  {
    key: "stuName",
    label: "Student Name",
    type: "text",
  },
  {
    key: "fName",
    label: "Father Name",
    type: "text",
  },
  {
    key: "courseCode",
    label: "Course Code",
    type: "text",
  },
  {
    key: "atiCode",
    label: "ATI Code",
    type: "text",
  },
  {
    key: "ecCode",
    label: "Exam Center Code",
    type: "text",
  },
];

export const marks = [
  {
    name: "subject",
    type: "text",

    placeholder: "Subject",
    pattern: "[A-Za-z ]*",
  },
  {
    name: "theoryFullMarks",
    type: "number",
    pattern: "[0-9]*",

    placeholder: "Theory Full Marks",
  },
  {
    name: "practicalFullMarks",
    type: "number",

    placeholder: "Practical Full Marks",
  },
  {
    name: "theoryMarks",
    type: "number",

    placeholder: "Theory Marks",
  },
  {
    name: "practicalMarks",
    type: "number",

    placeholder: "Practical Marks",
  },
];
