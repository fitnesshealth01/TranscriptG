export interface ParchmentCourse {
  id: string;
  code: string;
  title: string;
  creditsAttempted: number;
  creditsEarned: number;
  grade: string;
  gradePoints?: number;
  isIncludedInGpa: boolean;
  category?: string; // Major, General Education, Elective, Prerequisite, AP/Honors
  termName: string;
}

export interface ParchmentTerm {
  termName: string;
  academicLevel?: string; // Undergraduate, Graduate, High School
  termGpa?: number;
  termCreditsAttempted?: number;
  termCreditsEarned?: number;
  courses: ParchmentCourse[];
}

export interface ParchmentStudentInfo {
  name: string;
  studentId?: string;
  birthDate?: string;
  ssnLast4?: string;
  issueDate?: string;
  documentId?: string; // Parchment DID / Order tracking ID
  printStatus?: string;
}

export interface ParchmentInstitutionInfo {
  name: string;
  address?: string;
  registrarName?: string;
  accreditation?: string;
  schoolType?: "University" | "College" | "High School" | "Community College" | "Other";
}

export interface ParchmentDegreeInfo {
  degreeAwarded?: string; // e.g. "Bachelor of Science"
  major?: string;
  minor?: string;
  graduationDate?: string;
  honors?: string; // e.g. "Magna Cum Laude", "Dean's List"
  classRank?: string;
}

export interface ParchmentSummary {
  cumulativeGpa: number;
  totalCreditsAttempted: number;
  totalCreditsEarned: number;
  totalQualityPoints?: number;
  unweightedGpa?: number;
  weightedGpa?: number;
  gradingScale?: string;
}

export interface ParchmentTransferCredit {
  institution: string;
  coursesSummary?: string;
  totalCredits: number;
}

export interface ParchmentAuthenticity {
  hasParchmentDocId: boolean;
  documentId?: string;
  hasDigitalSignatureNote: boolean;
  blueRibbonNotice?: string;
  securityWatermarkDetected?: boolean;
}

export interface ParchmentAcademicInsights {
  strengths: string[];
  creditCompletionRate: number; // Percentage (e.g. 100%)
  gradeDistribution: {
    A: number;
    B: number;
    C: number;
    D: number;
    F: number;
    Other: number;
  };
  deanListTerms: string[];
  transferReadyAudit?: string;
  academicStanding?: string; // "Good Standing", "Dean's Honors", etc.
}

export interface ParchmentParsedData {
  studentInfo: ParchmentStudentInfo;
  institutionInfo: ParchmentInstitutionInfo;
  degreeInfo: ParchmentDegreeInfo;
  terms: ParchmentTerm[];
  summary: ParchmentSummary;
  transferCredits?: ParchmentTransferCredit[];
  authenticity: ParchmentAuthenticity;
  academicInsights: ParchmentAcademicInsights;
}
