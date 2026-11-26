export type RouteView =
  | 'home'
  | 'enterprise'
  | 'edutech'
  | 'collaborations'
  | 'verify'
  | 'admin';

export type EnterpriseServiceCategory =
  | 'Custom Web & Mobile App Development'
  | 'SAP Enterprise Solutions'
  | 'ServiceNow Solutions'
  | 'Industrial & R&D Automation';

export type ProgramCategory =
  | 'Online Courses'
  | 'Real-Time Internships'
  | 'Workshops'
  | 'Hackathons';

export type ProgramDomain =
  | 'SAP'
  | 'ServiceNow'
  | 'Full-Stack Web'
  | 'AI & Data Science'
  | 'Cloud & DevOps';

export type ProgramMode =
  | 'Online Live'
  | 'Hybrid (Hyderabad)'
  | 'On-Campus';

export interface EnterpriseService {
  id: string;
  index: string;
  category: EnterpriseServiceCategory;
  headline: string;
  summary: string;
  techStack: string[];
  deliverables: string[];
  typicalTimeline: string;
  engagementModel: string;
  highlightMetric: string;
  featured?: boolean;
}

export interface CaseStudy {
  id: string;
  client: string;
  sector: string;
  location: string;
  serviceCategory: EnterpriseServiceCategory;
  title: string;
  challenge: string;
  outcomeMetric: string;
  outcomeDetail: string;
  stack: string[];
}

export interface Program {
  id: string;
  code: string;
  title: string;
  category: ProgramCategory;
  domain: ProgramDomain;
  mode: ProgramMode;
  duration: string;
  feeInr: number;
  nextBatch: string;
  seatsTotal: number;
  seatsFilled: number;
  mentor: string;
  mentorRole: string;
  summary: string;
  syllabus: string[];
  outcomes: string[];
  active: boolean;
}

export type LeadStatus = 'New' | 'Discovery' | 'Proposal Sent' | 'Won' | 'Archived';

export interface B2BLead {
  id: string;
  referenceCode: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  serviceCategory: EnterpriseServiceCategory | 'General Corporate Inquiry';
  estimatedTimeline: string;
  currency: 'INR' | 'USD';
  budgetRange: string;
  projectBrief: string;
  status: LeadStatus;
  createdAt: string;
  source: 'Enterprise Quote Modal' | 'Contact Drawer';
}

export type EnrollmentStatus = 'Pending' | 'Confirmed' | 'Completed';

export interface StudentEnrollment {
  id: string;
  registrationId: string;
  studentName: string;
  email: string;
  phone: string;
  college: string;
  branchAndYear: string;
  programId: string;
  programTitle: string;
  programDomain: ProgramDomain;
  programCategory: ProgramCategory;
  preferredMode: ProgramMode;
  status: EnrollmentStatus;
  createdAt: string;
  certificateId?: string;
}

export type PartnershipType =
  | 'MoU Signed'
  | 'Centre of Excellence'
  | 'Hackathon Host'
  | 'Placement Drive';

export interface UniversityPartner {
  id: string;
  name: string;
  city: string;
  affiliation: string;
  partnershipType: PartnershipType;
  sinceYear: number;
  studentsTrained: number;
  focusAreas: string[];
}

export type MoUStatus = 'Under Review' | 'Discussion Scheduled' | 'MoU Active';

export interface MoUProposal {
  id: string;
  referenceCode: string;
  institutionName: string;
  contactName: string;
  designation: string;
  email: string;
  phone: string;
  city: string;
  studentStrength: string;
  tracks: string[];
  notes: string;
  status: MoUStatus;
  createdAt: string;
}

export interface CertificateRecord {
  certificateId: string;
  studentName: string;
  college: string;
  programTitle: string;
  domain: ProgramDomain;
  category: ProgramCategory;
  issueDate: string;
  duration: string;
  grade: string;
  projectTitle: string;
  status: 'Valid' | 'Revoked';
  signatory: string;
}

export interface PlacementStory {
  id: string;
  studentName: string;
  college: string;
  programCompleted: string;
  placedCompany: string;
  role: string;
  location: string;
  packageRange: string;
  quote: string;
  batchYear: string;
}
