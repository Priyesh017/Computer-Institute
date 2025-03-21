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
      title: "Notice",
      role: "admin",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Notice Writing",
          url: "#",
        },
      ],
    },
    {
      title: "Notes",
      role: "admin",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Upload Notes",
          url: "#",
        },
      ],
    },
    {
      title: "Video",
      role: "admin",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Upload Video",
          url: "#",
        },
      ],
    },
    {
      title: "Subject Entry",
      role: "admin",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Subject Entry",
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

export const frameworksEdu = [
  {
    value: "8th Pass",
    label: "8th Pass",
  },
  {
    value: "10th Pass",
    label: "10th Pass",
  },
  {
    value: "12th Pass",
    label: "12th Pass",
  },
  {
    value: "Graduation",
    label: "Graduation",
  },
];
export const Nationality = [
  {
    value: "INDIAN",
    label: "Indian",
  },
  {
    value: "FOREIGNER",
    label: "Foreigner",
  },
];
export const sexValue = [
  {
    value: "MALE",
    label: "Male",
  },
  {
    value: "FEMALE",
    label: "Female",
  },
  {
    value: "TRANSGENDER",
    label: "Transgender",
  },
];

export const CategoryValue = [
  {
    value: "SC",
    label: "SC",
  },
  {
    value: "ST",
    label: "ST",
  },
  {
    value: "GENERAL",
    label: "GENERAL",
  },
  {
    value: "OBC",
    label: "OBC",
  },

  {
    value: "PH",
    label: "PH",
  },
  {
    value: "OTHERS",
    label: "OTHERS",
  },
];
export const IdCardType = [
  {
    value: "aadhar",
    label: "Aadhar",
  },
  {
    value: "voter",
    label: "Voter",
  },
  {
    value: "drivingLicense",
    label: "DrivingLicense",
  },
];

export const indianStatesWithDistricts = [
  {
    value: "Andhra Pradesh",
    label: "Andhra Pradesh",
    districts: [
      "Anantapur",
      "Chittoor",
      "East Godavari",
      "Guntur",
      "Krishna",
      "Kurnool",
      "Nellore",
      "Prakasam",
      "Srikakulam",
      "Visakhapatnam",
      "Vizianagaram",
      "West Godavari",
      "YSR Kadapa",
    ],
  },
  {
    value: "Arunachal Pradesh",
    label: "Arunachal Pradesh",
    districts: [
      "Tawang",
      "West Kameng",
      "East Kameng",
      "Papum Pare",
      "Kurung Kumey",
      "Kra Daadi",
      "Lower Subansiri",
      "Upper Subansiri",
      "West Siang",
      "East Siang",
      "Siang",
      "Upper Siang",
      "Lower Siang",
      "Dibang Valley",
      "Lower Dibang Valley",
      "Anjaw",
      "Lohit",
      "Changlang",
      "Tirap",
      "Longding",
    ],
  },
  {
    value: "Assam",
    label: "Assam",
    districts: [
      "Baksa",
      "Barpeta",
      "Biswanath",
      "Bongaigaon",
      "Cachar",
      "Charaideo",
      "Chirang",
      "Darrang",
      "Dhemaji",
      "Dhubri",
      "Dibrugarh",
      "Goalpara",
      "Golaghat",
      "Hailakandi",
      "Hojai",
      "Jorhat",
      "Kamrup",
      "Kamrup Metropolitan",
      "Karbi Anglong",
      "Karimganj",
      "Kokrajhar",
      "Lakhimpur",
      "Majuli",
      "Morigaon",
      "Nagaon",
      "Nalbari",
      "Dima Hasao",
      "Sivasagar",
      "Sonitpur",
      "South Salmara-Mankachar",
      "Tinsukia",
      "Udalguri",
      "West Karbi Anglong",
    ],
  },
  {
    value: "Bihar",
    label: "Bihar",
    districts: [
      "Araria",
      "Arwal",
      "Aurangabad",
      "Banka",
      "Begusarai",
      "Bhagalpur",
      "Bhojpur",
      "Buxar",
      "Darbhanga",
      "East Champaran",
      "Gaya",
      "Gopalganj",
      "Jamui",
      "Jehanabad",
      "Kaimur",
      "Katihar",
      "Khagaria",
      "Kishanganj",
      "Lakhisarai",
      "Madhepura",
      "Madhubani",
      "Munger",
      "Muzaffarpur",
      "Nalanda",
      "Nawada",
      "Patna",
      "Purnia",
      "Rohtas",
      "Saharsa",
      "Samastipur",
      "Saran",
      "Sheikhpura",
      "Sheohar",
      "Sitamarhi",
      "Siwan",
      "Supaul",
      "Vaishali",
      "West Champaran",
    ],
  },
  {
    value: "Chhattisgarh",
    label: "Chhattisgarh",
    districts: [
      "Balod",
      "Baloda Bazar",
      "Balrampur",
      "Bastar",
      "Bemetara",
      "Bijapur",
      "Bilaspur",
      "Dantewada",
      "Dhamtari",
      "Durg",
      "Gariaband",
      "Janjgir-Champa",
      "Jashpur",
      "Kabirdham",
      "Kanker",
      "Kondagaon",
      "Korba",
      "Koriya",
      "Mahasamund",
      "Mungeli",
      "Narayanpur",
      "Raigarh",
      "Raipur",
      "Rajnandgaon",
      "Sukma",
      "Surajpur",
      "Surguja",
    ],
  },
  {
    value: "Delhi",
    label: "Delhi",
    districts: [
      "Central Delhi",
      "East Delhi",
      "New Delhi",
      "North Delhi",
      "North East Delhi",
      "North West Delhi",
      "Shahdara",
      "South Delhi",
      "South East Delhi",
      "South West Delhi",
      "West Delhi",
    ],
  },
  {
    value: "Goa",
    label: "Goa",
    districts: ["North Goa", "South Goa"],
  },
  {
    value: "Gujarat",
    label: "Gujarat",
    districts: [
      "Ahmedabad",
      "Amreli",
      "Anand",
      "Aravalli",
      "Banaskantha",
      "Bharuch",
      "Bhavnagar",
      "Botad",
      "Chhota Udaipur",
      "Dahod",
      "Dang",
      "Devbhoomi Dwarka",
      "Gandhinagar",
      "Gir Somnath",
      "Jamnagar",
      "Junagadh",
      "Kheda",
      "Kutch",
      "Mahisagar",
      "Mehsana",
      "Morbi",
      "Narmada",
      "Navsari",
      "Panchmahal",
      "Patan",
      "Porbandar",
      "Rajkot",
      "Sabarkantha",
      "Surat",
      "Surendranagar",
      "Tapi",
      "Vadodara",
      "Valsad",
    ],
  },
  {
    value: "Haryana",
    label: "Haryana",
    districts: [
      "Ambala",
      "Bhiwani",
      "Charkhi Dadri",
      "Faridabad",
      "Fatehabad",
      "Gurugram",
      "Hisar",
      "Jhajjar",
      "Jind",
      "Kaithal",
      "Karnal",
      "Kurukshetra",
      "Mahendragarh",
      "Nuh",
      "Palwal",
      "Panchkula",
      "Panipat",
      "Rewari",
      "Rohtak",
      "Sirsa",
      "Sonipat",
      "Yamunanagar",
    ],
  },
  {
    value: "Himachal Pradesh",
    label: "Himachal Pradesh",
    districts: [
      "Bilaspur",
      "Chamba",
      "Hamirpur",
      "Kangra",
      "Kinnaur",
      "Kullu",
      "Lahaul and Spiti",
      "Mandi",
      "Shimla",
      "Sirmaur",
      "Solan",
      "Una",
    ],
  },
  {
    value: "Jammu and Kashmir",
    label: "Jammu and Kashmir",
    districts: [
      "Anantnag",
      "Bandipora",
      "Baramulla",
      "Budgam",
      "Doda",
      "Ganderbal",
      "Jammu",
      "Kathua",
      "Kishtwar",
      "Kulgam",
      "Kupwara",
      "Poonch",
      "Pulwama",
      "Rajouri",
      "Ramban",
      "Reasi",
      "Samba",
      "Shopian",
      "Srinagar",
      "Udhampur",
    ],
  },
  {
    value: "Karnataka",
    label: "Karnataka",
    districts: [
      "Bagalkot",
      "Ballari",
      "Belagavi",
      "Bengaluru Rural",
      "Bengaluru Urban",
      "Bidar",
      "Chamarajanagar",
      "Chikkaballapur",
      "Chikkamagaluru",
      "Chitradurga",
      "Dakshina Kannada",
      "Davanagere",
      "Dharwad",
      "Gadag",
      "Hassan",
      "Haveri",
      "Kalaburagi",
      "Kodagu",
      "Kolar",
      "Koppal",
      "Mandya",
      "Mysuru",
      "Raichur",
      "Ramanagara",
      "Shivamogga",
      "Tumakuru",
      "Udupi",
      "Uttara Kannada",
      "Vijayapura",
      "Yadgir",
    ],
  },
];
