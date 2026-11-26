import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  INITIAL_B2B_LEADS,
  INITIAL_CERTIFICATES,
  INITIAL_ENROLLMENTS,
  INITIAL_MOU_PROPOSALS,
  INITIAL_PROGRAMS,
  UNIVERSITY_PARTNERS,
} from '../data/seedData';
import {
  B2BLead,
  CertificateRecord,
  EnrollmentStatus,
  LeadStatus,
  MoUProposal,
  MoUStatus,
  Program,
  ProgramCategory,
  ProgramDomain,
  ProgramMode,
  StudentEnrollment,
  UniversityPartner,
} from '../types';

const STORAGE_KEY = 'shreevedha_portal_state_v1';

interface PersistedState {
  leads: B2BLead[];
  enrollments: StudentEnrollment[];
  mouProposals: MoUProposal[];
  certificates: CertificateRecord[];
  programs: Program[];
  partners: UniversityPartner[];
}

interface AppDataContextValue extends PersistedState {
  addB2BLead: (
    payload: Omit<B2BLead, 'id' | 'referenceCode' | 'status' | 'createdAt'>
  ) => B2BLead;
  updateLeadStatus: (id: string, status: LeadStatus) => void;
  addEnrollment: (
    payload: Omit<StudentEnrollment, 'id' | 'registrationId' | 'status' | 'createdAt'>
  ) => StudentEnrollment;
  updateEnrollmentStatus: (id: string, status: EnrollmentStatus) => void;
  addMoUProposal: (
    payload: Omit<MoUProposal, 'id' | 'referenceCode' | 'status' | 'createdAt'>
  ) => MoUProposal;
  updateMoUStatus: (id: string, status: MoUStatus) => void;
  issueCertificate: (payload: {
    studentName: string;
    college: string;
    programTitle: string;
    domain: ProgramDomain;
    category: ProgramCategory;
    duration: string;
    grade: string;
    projectTitle: string;
    enrollmentId?: string;
  }) => CertificateRecord;
  toggleCertificateStatus: (certificateId: string) => void;
  addProgram: (payload: {
    title: string;
    category: ProgramCategory;
    domain: ProgramDomain;
    mode: ProgramMode;
    duration: string;
    feeInr: number;
    nextBatch: string;
    seatsTotal: number;
    mentor: string;
    summary: string;
  }) => Program;
  toggleProgramActive: (programId: string) => void;
  resetDemoData: () => void;
}

const getDefaultState = (): PersistedState => ({
  leads: INITIAL_B2B_LEADS,
  enrollments: INITIAL_ENROLLMENTS,
  mouProposals: INITIAL_MOU_PROPOSALS,
  certificates: INITIAL_CERTIFICATES,
  programs: INITIAL_PROGRAMS,
  partners: UNIVERSITY_PARTNERS,
});

function loadInitialState(): PersistedState {
  if (typeof window === 'undefined') return getDefaultState();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultState();
    const parsed = JSON.parse(raw) as Partial<PersistedState>;
    return {
      leads: Array.isArray(parsed.leads) ? parsed.leads : INITIAL_B2B_LEADS,
      enrollments: Array.isArray(parsed.enrollments) ? parsed.enrollments : INITIAL_ENROLLMENTS,
      mouProposals: Array.isArray(parsed.mouProposals) ? parsed.mouProposals : INITIAL_MOU_PROPOSALS,
      certificates: Array.isArray(parsed.certificates) ? parsed.certificates : INITIAL_CERTIFICATES,
      programs: Array.isArray(parsed.programs) ? parsed.programs : INITIAL_PROGRAMS,
      partners: Array.isArray(parsed.partners) ? parsed.partners : UNIVERSITY_PARTNERS,
    };
  } catch {
    return getDefaultState();
  }
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

const DOMAIN_CODE: Record<ProgramDomain, string> = {
  SAP: 'SAP',
  ServiceNow: 'SNW',
  'Full-Stack Web': 'FSW',
  'AI & Data Science': 'AID',
  'Cloud & DevOps': 'CLD',
};

const AppDataContext = createContext<AppDataContextValue | null>(null);

export const AppDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<PersistedState>(loadInitialState);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage quota errors in restricted sandboxes
    }
  }, [state]);

  const addB2BLead: AppDataContextValue['addB2BLead'] = (payload) => {
    const seq = 2600 + state.leads.length + 1;
    const newLead: B2BLead = {
      ...payload,
      id: `lead-${Date.now()}`,
      referenceCode: `SVS-B2B-${seq}`,
      status: 'New',
      createdAt: todayIso(),
    };
    setState((prev) => ({
      ...prev,
      leads: [newLead, ...prev.leads],
    }));
    return newLead;
  };

  const updateLeadStatus = (id: string, status: LeadStatus) => {
    setState((prev) => ({
      ...prev,
      leads: prev.leads.map((lead) => (lead.id === id ? { ...lead, status } : lead)),
    }));
  };

  const addEnrollment: AppDataContextValue['addEnrollment'] = (payload) => {
    const seq = 8830 + state.enrollments.length + 1;
    const newEnrollment: StudentEnrollment = {
      ...payload,
      id: `enr-${Date.now()}`,
      registrationId: `SVS-REG-${seq}`,
      status: 'Pending',
      createdAt: todayIso(),
    };
    setState((prev) => ({
      ...prev,
      enrollments: [newEnrollment, ...prev.enrollments],
      programs: prev.programs.map((prog) =>
        prog.id === payload.programId
          ? { ...prog, seatsFilled: Math.min(prog.seatsTotal, prog.seatsFilled + 1) }
          : prog
      ),
    }));
    return newEnrollment;
  };

  const updateEnrollmentStatus = (id: string, status: EnrollmentStatus) => {
    setState((prev) => ({
      ...prev,
      enrollments: prev.enrollments.map((enr) => (enr.id === id ? { ...enr, status } : enr)),
    }));
  };

  const addMoUProposal: AppDataContextValue['addMoUProposal'] = (payload) => {
    const seq = 420 + state.mouProposals.length + 1;
    const newProposal: MoUProposal = {
      ...payload,
      id: `mou-${Date.now()}`,
      referenceCode: `SVS-MOU-${seq}`,
      status: 'Under Review',
      createdAt: todayIso(),
    };
    setState((prev) => ({
      ...prev,
      mouProposals: [newProposal, ...prev.mouProposals],
    }));
    return newProposal;
  };

  const updateMoUStatus = (id: string, status: MoUStatus) => {
    setState((prev) => ({
      ...prev,
      mouProposals: prev.mouProposals.map((item) => (item.id === id ? { ...item, status } : item)),
    }));
  };

  const issueCertificate: AppDataContextValue['issueCertificate'] = (payload) => {
    const prefix = DOMAIN_CODE[payload.domain] || 'EDU';
    const seq = 1210 + state.certificates.length + 1;
    const certId = `SVS-2026-${prefix}-${seq}`;
    const newCert: CertificateRecord = {
      certificateId: certId,
      studentName: payload.studentName,
      college: payload.college,
      programTitle: payload.programTitle,
      domain: payload.domain,
      category: payload.category,
      issueDate: todayIso(),
      duration: payload.duration,
      grade: payload.grade,
      projectTitle: payload.projectTitle,
      status: 'Valid',
      signatory: 'Managing Director, Shreevedha Solutions India Pvt. Ltd.',
    };
    setState((prev) => ({
      ...prev,
      certificates: [newCert, ...prev.certificates],
      enrollments: payload.enrollmentId
        ? prev.enrollments.map((enr) =>
            enr.id === payload.enrollmentId
              ? { ...enr, status: 'Completed', certificateId: certId }
              : enr
          )
        : prev.enrollments,
    }));
    return newCert;
  };

  const toggleCertificateStatus = (certificateId: string) => {
    setState((prev) => ({
      ...prev,
      certificates: prev.certificates.map((cert) =>
        cert.certificateId === certificateId
          ? { ...cert, status: cert.status === 'Valid' ? 'Revoked' : 'Valid' }
          : cert
      ),
    }));
  };

  const addProgram: AppDataContextValue['addProgram'] = (payload) => {
    const codePrefix = DOMAIN_CODE[payload.domain] || 'PRG';
    const newProgram: Program = {
      id: `prog-${Date.now()}`,
      code: `SV-${codePrefix}-${450 + state.programs.length}`,
      title: payload.title,
      category: payload.category,
      domain: payload.domain,
      mode: payload.mode,
      duration: payload.duration,
      feeInr: payload.feeInr,
      nextBatch: payload.nextBatch,
      seatsTotal: payload.seatsTotal,
      seatsFilled: 0,
      mentor: payload.mentor,
      mentorRole: 'Senior Practitioner, Shreevedha Solutions',
      summary: payload.summary,
      syllabus: [
        'Core Architecture & Industry Foundations',
        'Hands-On Guided Implementation Labs',
        'Live Enterprise Case Study & Capstone Assessment',
      ],
      outcomes: [
        'Verifiable Shreevedha Digital Certificate',
        'Portfolio-ready project deliverable',
        'Placement readiness & technical interview guidance',
      ],
      active: true,
    };
    setState((prev) => ({
      ...prev,
      programs: [newProgram, ...prev.programs],
    }));
    return newProgram;
  };

  const toggleProgramActive = (programId: string) => {
    setState((prev) => ({
      ...prev,
      programs: prev.programs.map((p) => (p.id === programId ? { ...p, active: !p.active } : p)),
    }));
  };

  const resetDemoData = () => {
    const fresh = getDefaultState();
    setState(fresh);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    } catch {
      // Ignore
    }
  };

  return (
    <AppDataContext.Provider
      value={{
        ...state,
        addB2BLead,
        updateLeadStatus,
        addEnrollment,
        updateEnrollmentStatus,
        addMoUProposal,
        updateMoUStatus,
        issueCertificate,
        toggleCertificateStatus,
        addProgram,
        toggleProgramActive,
        resetDemoData,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};

export function useAppData(): AppDataContextValue {
  const ctx = useContext(AppDataContext);
  if (!ctx) {
    throw new Error('useAppData must be used inside AppDataProvider');
  }
  return ctx;
}
