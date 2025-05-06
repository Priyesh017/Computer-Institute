import About from "@/components/landingpage/About";
import Gallery from "@/components/landingpage/Gallery";
import Course from "@/components/landingpage/Course";
import Testimonials from "@/components/landingpage/Testimonials";
import Center from "@/components/landingpage/Center";
import { FaEnvelope, FaPhone, FaWhatsapp } from "react-icons/fa";

import { Settings2, SquareTerminal } from "lucide-react";

export const navMain = [
  {
    title: "Fee payment",
    url: "#",
    role: "center",
    icon: SquareTerminal,
    isActive: true,
    items: [
      {
        title: "Course Fee",
        url: "/admin/coursefee",
      },
    ],
  },

  {
    title: "Course Management",
    url: "#",
    role: "admin",
    icon: SquareTerminal,
    isActive: true,
    items: [
      {
        title: "Course Add",
        url: "/admin/courseentry",
      },
      {
        title: "Course Update",
        url: "/admin/courseupdate",
      },
    ],
  },
  {
    title: "Student Profile",
    url: "#",
    role: "student",
    icon: SquareTerminal,
    isActive: true,
    items: [
      {
        title: "Profile",
        url: "/student/profile",
      },
      {
        title: "Downloads",
        url: "/student/downloads",
      },
      {
        title: "Notes",
        url: "/student/notes",
      },
      {
        title: "Videos",
        url: "/student/videos",
      },
    ],
  },
  {
    title: "Video Section",
    url: "#",
    role: "center",
    icon: SquareTerminal,
    isActive: true,
    items: [
      {
        title: "Videos",
        url: "/admin/allvideos",
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
        url: "/admin/enrollments",
      },
      {
        title: "Exam Forms",
        url: "/admin/examforms",
      },

      {
        title: "Marksheets",
        url: "/admin/marksheets",
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
        title: "All Enquiries",
        url: "/admin/enquiries",
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
        url: "/admin/galleryinsert",
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
        url: "/admin/noticewrite",
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
        url: "/admin/noteswrite",
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
        url: "/admin/videoupload",
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
        url: "/admin/subjectentry",
      },
    ],
  },
  {
    title: "Coordinator Entry",
    role: "admin",
    url: "#",
    icon: Settings2,
    items: [
      {
        title: "Coordinator Entry",
        url: "/admin/coordinatorentry",
      },
    ],
  },
  {
    title: "All Branches",
    role: "admin",
    url: "#",
    icon: Settings2,
    items: [
      {
        title: "All Branches",
        url: "/admin/allbranches",
      },
    ],
  },
  {
    title: "Banner Entry",
    role: "admin",
    url: "#",
    icon: Settings2,
    items: [
      {
        title: "Banner Entry",
        url: "/admin/bannerentry",
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
        url: "/admin/studententry",
      },

      {
        title: "Exam Form",
        url: "/admin/examformfillup",
      },
      {
        title: "Marksheet",
        url: "/admin/marksheetentry",
      },
    ],
  },
  {
    title: "Enrollments",
    role: "center",
    url: "#",
    icon: Settings2,
    items: [
      {
        title: "All Enrollments",
        url: "/admin/alldownloads",
      },
    ],
  },
];

export const menuItems = [
  { name: "About", pos: <About /> },
  { name: "Gallery", pos: <Gallery /> },
  { name: "Course", pos: <Course /> },
  { name: "Reviews", pos: <Testimonials /> },
  { name: "Contact Us", pos: <Center /> },
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
  { key: "EnrollmentNo", label: "Enrollment No", type: "text" },
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
    name: "theoryFullMarks",
    type: "number",
    pattern: "[1-9][0-9]*",

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

export const WestBengalDistricts = [
  { value: "ALIPURDUAR", label: "Alipurduar" },
  { value: "BANKURA", label: "Bankura" },
  { value: "BIRBHUM", label: "Birbhum" },
  { value: "COOCH_BEHAR", label: "Cooch Behar" },
  { value: "DARJEELING", label: "Darjeeling" },
  { value: "DAKSHIN_DINAJPUR", label: "Dakshin Dinajpur" },
  { value: "HOOGHLY", label: "Hooghly" },
  { value: "HOWRAH", label: "Howrah" },
  { value: "JALPAIGURI", label: "Jalpaiguri" },
  { value: "JHARGRAM", label: "Jhargram" },
  { value: "KALIMPONG", label: "Kalimpong" },
  { value: "KOLKATA", label: "Kolkata" },
  { value: "MALDA", label: "Malda" },
  { value: "MURSHIDABAD", label: "Murshidabad" },
  { value: "NADIA", label: "Nadia" },
  { value: "NORTH_24_PARGANAS", label: "North 24 Parganas" },
  { value: "PASCHIM_BARDHAMAN", label: "Paschim Bardhaman" },
  { value: "PASCHIM_MEDINIPUR", label: "Paschim Medinipur" },
  { value: "PURBA_BARDHAMAN", label: "Purba Bardhaman" },
  { value: "PURBA_MEDINIPUR", label: "Purba Medinipur" },
  { value: "PURULIA", label: "Purulia" },
  { value: "SOUTH_24_PARGANAS", label: "South 24 Parganas" },
  { value: "UTTAR_DINAJPUR", label: "Uttar Dinajpur" },
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
export const semValue = [
  {
    value: "1",
    label: "1",
  },
  {
    value: "2",
    label: "2",
  },
  {
    value: "3",
    label: "3",
  },
  {
    value: "4",
    label: "4",
  },
  {
    value: "5",
    label: "5",
  },
  {
    value: "6",
    label: "6",
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
    value: "aadhaar",
    label: "Aadhaar",
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

export const IdCardType2 = [
  {
    value: "aadhaar",
    label: "Aadhaar",
  },
  {
    value: "BirthCertificate",
    label: "Birth Certificate",
  },
  {
    value: "Admit",
    label: "Admit",
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
  {
    value: "West Bengal",
    label: "West Bengal",
    districts: [
      "ALIPURDUAR",
      "BANKURA",
      "PASCHIM_BARDHAMAN",
      "PURBA_BARDHAMAN",
      "BIRBHUM",
      "COOCH_BEHAR",
      "DAKSHIN_DINAJPUR",
      "DARJEELING",
      "HOOGHLY",
      "HOWRAH",
      "JALPAIGURI",
      "JHARGRAM",
      "KALIMPONG",
      "KOLKATA",
      "MALDA",
      "MURSHIDABAD",
      "NADIA",
      "NORTH_24_PARGANAS",
      "SOUTH_24_PARGANAS",
      "PASCHIM_MEDINIPUR",
      "PURBA_MEDINIPUR",
      "PURULIA",
    ],
  },
];

export const enqinp1 = [
  { label: "Applicant's Name", field: "name" },
  { label: "Email", field: "email" },
  { label: "Father's Name", field: "father" },
  { label: "C/O Name", field: "coName" },
  { label: "Date of Birth", field: "dob", type: "date" },
  { label: "Mobile No", field: "mobileNo", type: "tel" },
  { label: "Address Line", field: "AddressLine" },
  { label: "Village", field: "vill" },
  { label: "Post Office", field: "po" },
  { label: "Police Station", field: "ps" },
  { label: "Pincode", field: "pin" },
];

export const enqinp2 = [
  { label: "ID Proof No", field: "idProofNo" },
  { label: "Trade License No", field: "tradeLicense" },
  { label: "Square Fit", field: "squareFit" },
  { label: "House Room No", field: "houseRoomNo" },
];
