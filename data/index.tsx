import Banner from "@/components/landingpage/Banner";
import About from "@/components/landingpage/About";
import Gallery from "@/components/landingpage/Gallery";
import Course from "@/components/landingpage/Course";
import Center from "@/components/landingpage/Center";
import { FaEnvelope, FaPhone, FaWhatsapp } from "react-icons/fa";
import { Bell, Download, FileText, ClipboardList, User } from "lucide-react";
import Profile from "@/components/studentdashboard/Profile";
import Notification from "@/components/studentdashboard/Notification";
import Downloads from "@/components/studentdashboard/Downloads";
import Result from "@/components/studentdashboard/Result";
import Form from "@/components/studentdashboard/Form";
import Admit from "../components/studentdashboard/Admit";
import Certificate from "@/components/studentdashboard/Certificate";
import Marksheet from "@/components/studentdashboard/Marksheet";
import IDCard from "@/components/studentdashboard/IDCard";
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
          title: "exam fee",
          url: "#",
        },
        {
          title: "Course Fee",
          url: "#",
        },
      ],
    },
    {
      title: "admin",
      url: "#",
      role: "admin",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "enrollments",
          url: "#",
        },
        {
          title: "id cards",
          url: "#",
        },
        {
          title: "admit cards",
          url: "#",
        },
        {
          title: "marks",
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
          title: "id Download",
          url: "#",
        },
        {
          title: "admit download",
          url: "#",
        },
        {
          title: "exam form fillup",
          url: "#",
        },
        {
          title: "Marksheet download",
          url: "#",
        },
        {
          title: "certificate download",
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

export const sideMenu = [
  {
    icon: <User size={24} />,
    name: "Profile",
    section: <Profile />,
  },
  {
    icon: <Bell size={24} />,
    name: "Notifications",
    section: <Notification />,
  },
  {
    icon: <Download size={24} />,
    name: "Downloads",
    section: <Downloads />,
  },
  {
    icon: <FileText size={24} />,
    name: "Result",
    section: <Result />,
  },
  {
    icon: <ClipboardList size={24} />,
    name: "Form Fill-up",
    section: <Form />,
  },
  {
    icon: <ClipboardList size={24} />,
    name: "Admit Form",
    section: <Admit />,
  },
  {
    icon: <ClipboardList size={24} />,
    name: "Certificate Form",
    section: <Certificate />,
  },
  {
    icon: <ClipboardList size={24} />,
    name: "Marksheet Form",
    section: <Marksheet />,
  },
  {
    icon: <ClipboardList size={24} />,
    name: "ID Card Form",
    section: <IDCard />,
  },
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
interface Course {
  name: string;
  description: string;
  fees: string;
}

export const categories = [
  {
    id: 1,
    title: "Adventure Sports",
    description: "Fear Of Driving And Automatic Negative Thoughts",
    lessons: 12,
    duration: "3 hr 30 min",
    price: "$49.99",
    image: "/project.png",
  },
  {
    id: 2,
    title: "Sales and Operations",
    description: "Work more, Earn more while sitting at your home",
    lessons: 23,
    duration: "1 hr 30 min",
    price: "$59.99",
    image: "/project.png",
  },
  {
    id: 3,
    title: "Marketing",
    description: "Foundation course to understand about Software",
    lessons: 23,
    duration: "1 hr 30 min",
    price: "$39.99",
    image: "/project.png",
    badge: "New",
  },
];

// gallery
export const images = [
  {
    src: "/project.png",
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
  { position: [28.6139, 77.209], label: "New Delhi" },
  { position: [19.076, 72.8777], label: "Mumbai" },
  { position: [13.0827, 80.2707], label: "Chennai" },
  { position: [22.5726, 88.3639], label: "Kolkata" },
  { position: [12.9716, 77.5946], label: "Bangalore" },
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
export const examFields = [
  { key: "firstName", label: "First Name", type: "text" },
  { key: "lastName", label: "Last Name", type: "text" },
  { key: "enrollmentNo", label: "Enrollment No", type: "text" },
  { key: "address", label: "Address", type: "text" },
  { key: "centerName", label: "Center Name", type: "text" },
  { key: "idCardNo", label: "ID Card No", type: "number" },
  {
    key: "lastPaymentReceiptNo",
    label: "Last Payment Receipt No",
    type: "text",
  },
  { key: "registeredCourse", label: "Registered Course", type: "text" },
  { key: "mobileNo", label: "Mobile No", type: "number" },
  { key: "whatsappNo", label: "WhatsApp No", type: "number" },
];

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

export const certFields = [
  { key: "sName", label: "Student Name", type: "text" },
  { key: "sdwName", label: "S/D/W Name", type: "text" },
  { key: "courseName", label: "Course Name", type: "text" },
  { key: "duration", label: "Duration", type: "text" },
  { key: "year", label: "Year", type: "text" },
  { key: "grade", label: "Grade", type: "text" },
  {
    key: "enrollNo",
    label: "Enrollment No",
    type: "text",
  },
  { key: "centerName", label: "Center Name", type: "text" },
  { key: "iDate", label: "Issued Date", type: "date" },
];

// Marksheet Form

export const details = [
  { key: "enrollNo", label: "Enrollment No", type: "text", id: "enrollNo" },
  { key: "sName", label: "Student Name", type: "text", id: "sName" },
  { key: "swdName", label: "S/W/D Name", type: "text", id: "swdName" },
  { key: "year", label: "Year", type: "text", id: "year" },
  { key: "courseName", label: "Course Name", type: "text", id: "courseName" },
  { key: "centerName", label: "Center Name", type: "text", id: "centerName" },
  { key: "cAddress", label: "Center Address", type: "text", id: "cAddress" },
  { key: "dob", label: "Data of Birth", type: "date", id: "dob" },
];

export const marks = [
  {
    name: "subject",
    type: "text",
    value: "",
    placeholder: "Subject",
    pattern: "[A-Za-z ]*",
  },
  {
    name: "theoryFullMarks",
    type: "number",
    pattern: "[0-9]*",
    value: "",
    placeholder: "Theory Full Marks",
  },
  {
    name: "practicalFullMarks",
    type: "number",
    value: "",
    placeholder: "Practical Full Marks",
  },
  {
    name: "theoryMarks",
    type: "number",
    value: "",
    placeholder: "Theory Marks",
  },
  {
    name: "practicalMarks",
    type: "number",
    value: "",
    placeholder: "Practical Marks",
  },
];
