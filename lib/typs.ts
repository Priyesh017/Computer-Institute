export interface StudentProfileProps {
  name: string;
  EnrollmentNo: number;
  imageLink: string;
  IdCardNo: string;
  mobileNo: string;
  email: string;
  dob: string;
  father: string;
  mother: string;
  center: string;
  course: string;
  eduqualification: string;
  EnrollmentType: string;
  idCardLink: string;
  admitLink: string;
  certificateLink: string;
  marksheetLink: string;
  createdAt: string;
}

export interface Enrollmenttype {
  admitLink: string;
  certificateLink: string;
  dob: string; // or Date if you want to parse it
  idCardLink: string;
  marksheetLink: string;
  imageLink: string;
  name: string;
  createdAt: string; // or Date
  EnrollmentNo: number;
  id: number;
  activated: boolean;
  status: {
    id: number;
    val: string;
  };
  centerid: number;
}

export interface Enrollment {
  name: string;
  EnrollmentNo: number;
  activated: boolean;
  id: number;

  course: {
    price: number;
  };
  amount?: {
    TotalPaid: number;
    amountRemain: number;
  };
}

export interface typefd {
  courseid: string;
}
export interface Subject {
  subject: string;
  theoryFullMarks: string;
  practicalFullMarks: string;
  theoryMarks: string;
  practicalMarks: string;
}
export interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  subjects: Subject[];
  totalMarks: number;
  percentage: number;
  grade: string;
  result: string;
}
export type EnrollmentData = {
  id: number;
  EnrollmentNo: number;
  IdCardNo: string;
  idCardLink: string;
  admitLink: string;
  certificateLink: string;
  marksheetLink: string;
  name: string;
  dob: string;
  father: string;
  mother: string;
  address: string;
  mobileNo: string;
  email: string;
  eduqualification: string;
  activated: boolean;
  courseId: number;
  centerid: number;
  createdAt: string;
  examformFillup: {
    verified: boolean;
  };
  center: {
    Centername: string;
    address: string;
  };
  course: {
    CName: string;
    subjects: {
      SubName: string;
      theoryFullMarks: number;
      practFullMarks: number;
    }[];
  };
};

export type ApiResponse = {
  success: boolean;
  data: EnrollmentData;
};

export type MarksWithEnrollment = {
  id: number;
  marks: Mark[];
  remarks: "PASS" | "FAIL";
  EnrollmentNo: number;
  grade: string;
  totalMarks: number;
  percentage: number;
  verified: boolean;
  createdAt: Date;
  year: string;
  serialNo: number;
  enrollment: {
    name: string;
    father: string;
    dob: Date;
    imageLink: string;
    course: {
      CName: string;
      Duration: number;
    };
    center: {
      Centername: string;
      address: string;
      code: string;
    };
  };
};
type Mark = {
  subject: string;
  theoryMarks: string;
  practicalMarks: string;
  theoryFullMarks: string;
  practicalFullMarks: string;
};
export type DataItem = {
  id: number;
  EnrollmentNo: number;
  verified: boolean;
  createdAt: string;
  ExamCenterCode: string;
  ATI_CODE: string;
  practExmdate: string;
  theoryExamdate: string;
  practExmtime: string;
  theoryExmtime: string;
  sem: string;
  enrollment: {
    name: string;
    mobileNo: string;
    email: string;
    EnrollmentNo: number;
    imageLink: string;
    address: string;
    center: {
      Centername: string;
      code: number;
    };
    father: string;
    IdCardNo: string;
    amount: {
      lastPaymentRecieptno: string;
    };
    course: {
      CName: string;
    };
  };
};
