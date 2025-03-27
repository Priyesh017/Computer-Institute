export interface StudentProfileProps {
  name: string;
  Enrollmentno: string;
  imageLink: string;
  IdCardNo: string;
  mobileNo: string;
  wpNo: string;
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

export interface EnrollmentType {
  Enrollmentno: string;
  IdCardNo: string;
  idCardLink: string;
  admitLink: string;
  certificateLink: string;
  marksheetLink: string;
  name: string;
  dob: string;
  createdAt: string;
}

export interface Enrollment {
  name: string;
  Enrollmentno: string;
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

export interface tfd {
  name: string;
  fatherName: string;
  motherName: string;
  Address: string;
  dob: Date;
  mobile: string;
  wapp: string;
  eduqualification: string;
  courseid: string;
  category: string;
  nationality: string;
  sex: string;
  idtype: string;
  idProofNo: string;
}
export type EnrollmentData = {
  id: number;
  Enrollmentno: string;
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
  wpNo: string;
  eduqualification: string;
  activated: boolean;
  courseId: number;
  centerid: number;
  createdAt: string;

  center: {
    Centername: string;
    address: string;
  };
  course: {
    CName: string;
    subjects: string[];
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
  EnrollmentNo: string;
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
  EnrollmentNo: string;
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
    wpNo: string;
    Enrollmentno: string;
    imageLink: string;
    address: string;
    center: {
      Centername: string;
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
