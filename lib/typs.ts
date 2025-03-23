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
  createdAt: string;
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
