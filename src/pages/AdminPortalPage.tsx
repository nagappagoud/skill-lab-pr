import React, { useMemo, useState } from 'react';
import {
  Award,
  BookOpen,
  Briefcase,
  Building2,
  CheckCircle2,
  Download,
  GraduationCap,
  LayoutDashboard,
  Plus,
  RotateCcw,
  Search,
  X,
} from 'lucide-react';
import { useAppData } from '../context/AppDataContext';
import {
  B2BLead,
  EnrollmentStatus,
  LeadStatus,
  MoUStatus,
  ProgramCategory,
  ProgramDomain,
  ProgramMode,
  RouteView,
  StudentEnrollment,
} from '../types';

interface AdminPortalPageProps {
  onNavigate: (view: RouteView) => void;
}

type AdminSection =
  | 'overview'
  | 'leads'
  | 'enrollments'
  | 'mous'
  | 'certificates'
  | 'programs';

const LEAD_STATUSES: LeadStatus[] = ['New', 'Discovery', 'Proposal Sent', 'Won', 'Archived'];
const ENROLLMENT_STATUSES: EnrollmentStatus[] = ['Pending', 'Confirmed', 'Completed'];
const MOU_STATUSES: MoUStatus[] = ['Under Review', 'Discussion Scheduled', 'MoU Active'];

export const AdminPortalPage: React.FC<AdminPortalPageProps> = ({ onNavigate }) => {
  const {
    leads,
    enrollments,
    mouProposals,
    certificates,
    programs,
    updateLeadStatus,
    updateEnrollmentStatus,
    updateMoUStatus,
    issueCertificate,
    toggleCertificateStatus,
    addProgram,
    toggleProgramActive,
    resetDemoData,
  } = useAppData();

  const [section, setSection] = useState<AdminSection>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLead, setSelectedLead] = useState<B2BLead | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Issue Certificate Modal state
  const [showCertModal, setShowCertModal] = useState(false);
  const [certStudentName, setCertStudentName] = useState('');
  const [certCollege, setCertCollege] = useState('');
  const [certProgramTitle, setCertProgramTitle] = useState(
    'SAP S/4HANA ABAP & Fiori Real-Time Industry Internship'
  );
  const [certDomain, setCertDomain] = useState<ProgramDomain>('SAP');
  const [certCategory, setCertCategory] = useState<ProgramCategory>('Real-Time Internships');
  const [certDuration, setCertDuration] = useState('12 Weeks (360 Hours)');
  const [certGrade, setCertGrade] = useState('Distinction (A+)');
  const [certProject, setCertProject] = useState('');
  const [certLinkedEnrollmentId, setCertLinkedEnrollmentId] = useState<string | undefined>(
    undefined
  );

  // Add Program Modal state
  const [showProgramModal, setShowProgramModal] = useState(false);
  const [progTitle, setProgTitle] = useState('');
  const [progCategory, setProgCategory] = useState<ProgramCategory>('Workshops');
  const [progDomain, setProgDomain] = useState<ProgramDomain>('SAP');
  const [progMode, setProgMode] = useState<ProgramMode>('Online Live');
  const [progDuration, setProgDuration] = useState('4 Weeks');
  const [progFee, setProgFee] = useState('6500');
  const [progBatch, setProgBatch] = useState('Feb 10, 2027');
  const [progSeats, setProgSeats] = useState('50');
  const [progMentor, setProgMentor] = useState('Raghavendra Kulkarni');
  const [progSummary, setProgSummary] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    window.setTimeout(() => setToastMessage(null), 4500);
  };

  const openIssueCertForEnrollment = (enr: StudentEnrollment) => {
    setCertStudentName(enr.studentName);
    setCertCollege(enr.college);
    setCertProgramTitle(enr.programTitle);
    setCertDomain(enr.programDomain);
    setCertCategory(enr.programCategory);
    setCertDuration('12 Weeks');
    setCertGrade('Distinction (A+)');
    setCertProject(`Industry Capstone Implementation — ${enr.programDomain}`);
    setCertLinkedEnrollmentId(enr.id);
    setShowCertModal(true);
  };

  const openBlankCertModal = () => {
    setCertStudentName('');
    setCertCollege('');
    setCertProgramTitle('ServiceNow CSA + CAD Developer Track (ITSM & App Engine)');
    setCertDomain('ServiceNow');
    setCertCategory('Online Courses');
    setCertDuration('10 Weeks');
    setCertGrade('Distinction (A+)');
    setCertProject('');
    setCertLinkedEnrollmentId(undefined);
    setShowCertModal(true);
  };

  const handleIssueCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certStudentName.trim() || !certCollege.trim() || !certProgramTitle.trim()) return;
    const issued = issueCertificate({
      studentName: certStudentName.trim(),
      college: certCollege.trim(),
      programTitle: certProgramTitle.trim(),
      domain: certDomain,
      category: certCategory,
      duration: certDuration.trim() || '8 Weeks',
      grade: certGrade.trim() || 'Merit (A)',
      projectTitle:
        certProject.trim() || `Applied ${certDomain} Enterprise Capstone Project`,
      enrollmentId: certLinkedEnrollmentId,
    });
    setShowCertModal(false);
    showToast(`Issued verifiable certificate ${issued.certificateId} for ${issued.studentName}.`);
  };

  const handleAddProgram = (e: React.FormEvent) => {
    e.preventDefault();
    if (!progTitle.trim() || !progSummary.trim()) return;
    addProgram({
      title: progTitle.trim(),
      category: progCategory,
      domain: progDomain,
      mode: progMode,
      duration: progDuration.trim() || '6 Weeks',
      feeInr: Number(progFee) || 5000,
      nextBatch: progBatch.trim() || 'Feb 2027',
      seatsTotal: Number(progSeats) || 40,
      mentor: progMentor.trim() || 'Shreevedha Engineering Faculty',
      summary: progSummary.trim(),
    });
    setProgTitle('');
    setProgSummary('');
    setShowProgramModal(false);
    showToast('New Edu-Tech program published to the live catalog.');
  };

  const exportLeadsCsv = () => {
    const header = [
      'Reference',
      'Company',
      'Contact',
      'Email',
      'Phone',
      'Service',
      'Budget',
      'Status',
      'Date',
    ];
    const rows = leads.map((l) => [
      l.referenceCode,
      `"${l.companyName.replace(/"/g, '""')}"`,
      `"${l.contactPerson.replace(/"/g, '""')}"`,
      l.email,
      l.phone,
      `"${l.serviceCategory}"`,
      `"${l.budgetRange}"`,
      l.status,
      l.createdAt,
    ]);
    const csv = [header.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'shreevedha_b2b_leads.csv';
    link.click();
    URL.revokeObjectURL(url);
    showToast('Exported B2B Enterprise Leads to CSV.');
  };

  const filteredLeads = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return leads;
    return leads.filter(
      (l) =>
        l.companyName.toLowerCase().includes(q) ||
        l.contactPerson.toLowerCase().includes(q) ||
        l.serviceCategory.toLowerCase().includes(q) ||
        l.referenceCode.toLowerCase().includes(q)
    );
  }, [leads, searchTerm]);

  const filteredEnrollments = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return enrollments;
    return enrollments.filter(
      (e) =>
        e.studentName.toLowerCase().includes(q) ||
        e.college.toLowerCase().includes(q) ||
        e.programTitle.toLowerCase().includes(q) ||
        e.registrationId.toLowerCase().includes(q)
    );
  }, [enrollments, searchTerm]);

  const filteredCertificates = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return certificates;
    return certificates.filter(
      (c) =>
        c.certificateId.toLowerCase().includes(q) ||
        c.studentName.toLowerCase().includes(q) ||
        c.programTitle.toLowerCase().includes(q)
    );
  }, [certificates, searchTerm]);

  const NAV_ITEMS: { id: AdminSection; label: string; icon: React.ReactNode; count?: number }[] = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    {
      id: 'leads',
      label: 'B2B Enterprise Leads',
      icon: <Briefcase className="w-4 h-4" />,
      count: leads.length,
    },
    {
      id: 'enrollments',
      label: 'Student Enrollments',
      icon: <GraduationCap className="w-4 h-4" />,
      count: enrollments.length,
    },
    {
      id: 'mous',
      label: 'University MoUs',
      icon: <Building2 className="w-4 h-4" />,
      count: mouProposals.length,
    },
    {
      id: 'certificates',
      label: 'Certificate Registry',
      icon: <Award className="w-4 h-4" />,
      count: certificates.length,
    },
    {
      id: 'programs',
      label: 'Program Catalog',
      icon: <BookOpen className="w-4 h-4" />,
      count: programs.length,
    },
  ];

  return (
    <div className="bg-slate-50 min-h-[82vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Contextual Admin Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 mb-6">
          <div>
            <p className="text-xs font-medium text-slate-500">
              Admin Console / Operations Hub
            </p>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
              Shreevedha Operations &amp; Registry Portal
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={openBlankCertModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Issue Certificate
            </button>
            <button
              type="button"
              onClick={() => {
                resetDemoData();
                showToast('Restored initial Hyderabad seed dataset.');
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Demo Data
            </button>
          </div>
        </div>

        {toastMessage && (
          <div className="mb-6 px-4 py-3 rounded-lg bg-emerald-50 border border-emerald-200 text-sm text-emerald-900 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>{toastMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              aria-label="Dismiss notification"
              className="text-emerald-800 hover:text-emerald-950 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-3 bg-white border border-slate-200 rounded-xl p-3 space-y-1">
            {NAV_ITEMS.map((item) => {
              const active = section === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSection(item.id);
                    setSearchTerm('');
                  }}
                  className={`w-full flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    active
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <span className="flex items-center gap-2.5 truncate">
                    {item.icon}
                    <span className="truncate">{item.label}</span>
                  </span>
                  {item.count !== undefined && (
                    <span
                      className={`text-xs font-mono tabular-nums ${
                        active ? 'text-slate-300' : 'text-slate-500'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </aside>

          {/* Main Workspace Viewport */}
          <div className="lg:col-span-9 space-y-6">
            {/* OVERVIEW */}
            {section === 'overview' && (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white border border-slate-200 rounded-xl p-5">
                    <p className="text-xs font-medium text-slate-500">B2B Enterprise Leads</p>
                    <p className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums mt-2">
                      {leads.length}
                    </p>
                    <p className="text-xs text-slate-500 mt-1 tabular-nums">
                      {leads.filter((l) => l.status === 'New').length} new inquiries
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-xl p-5">
                    <p className="text-xs font-medium text-slate-500">Student Enrollments</p>
                    <p className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums mt-2">
                      {enrollments.length}
                    </p>
                    <p className="text-xs text-slate-500 mt-1 tabular-nums">
                      {enrollments.filter((e) => e.status === 'Confirmed').length} confirmed seats
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-xl p-5">
                    <p className="text-xs font-medium text-slate-500">University MoU Requests</p>
                    <p className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums mt-2">
                      {mouProposals.length}
                    </p>
                    <p className="text-xs text-slate-500 mt-1 tabular-nums">
                      Active academic pipeline
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-xl p-5">
                    <p className="text-xs font-medium text-slate-500">Verified Certificates</p>
                    <p className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums mt-2">
                      {certificates.filter((c) => c.status === 'Valid').length}
                    </p>
                    <p className="text-xs text-slate-500 mt-1 tabular-nums">
                      {certificates.length} total registry records
                    </p>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                  <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
                    <h2 className="text-sm font-bold text-slate-900">
                      Latest B2B Enterprise Quote Submissions
                    </h2>
                    <button
                      type="button"
                      onClick={() => setSection('leads')}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
                    >
                      Manage All Leads
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600">
                          <th className="py-3 px-5">Reference</th>
                          <th className="py-3 px-5">Company &amp; Contact</th>
                          <th className="py-3 px-5">Practice Area</th>
                          <th className="py-3 px-5">Budget</th>
                          <th className="py-3 px-5">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {leads.slice(0, 4).map((lead) => (
                          <tr key={lead.id} className="hover:bg-slate-50">
                            <td className="py-3 px-5 font-mono text-xs text-slate-700">
                              {lead.referenceCode}
                            </td>
                            <td className="py-3 px-5">
                              <div className="font-semibold text-slate-900">{lead.companyName}</div>
                              <div className="text-xs text-slate-500">{lead.contactPerson}</div>
                            </td>
                            <td className="py-3 px-5 text-xs text-slate-700">
                              {lead.serviceCategory}
                            </td>
                            <td className="py-3 px-5 font-mono text-xs text-slate-900 tabular-nums">
                              {lead.budgetRange}
                            </td>
                            <td className="py-3 px-5 text-xs font-semibold text-blue-700">
                              {lead.status}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                  <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
                    <h2 className="text-sm font-bold text-slate-900">
                      Recent Student Program Enrollments
                    </h2>
                    <button
                      type="button"
                      onClick={() => setSection('enrollments')}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
                    >
                      Manage Enrollments
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600">
                          <th className="py-3 px-5">Reg. ID</th>
                          <th className="py-3 px-5">Student &amp; College</th>
                          <th className="py-3 px-5">Program</th>
                          <th className="py-3 px-5">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {enrollments.slice(0, 4).map((enr) => (
                          <tr key={enr.id} className="hover:bg-slate-50">
                            <td className="py-3 px-5 font-mono text-xs text-slate-700">
                              {enr.registrationId}
                            </td>
                            <td className="py-3 px-5">
                              <div className="font-semibold text-slate-900">{enr.studentName}</div>
                              <div className="text-xs text-slate-500">{enr.college}</div>
                            </td>
                            <td className="py-3 px-5 text-xs text-slate-700 max-w-xs truncate">
                              {enr.programTitle}
                            </td>
                            <td className="py-3 px-5 text-xs font-semibold text-slate-800">
                              {enr.status}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {/* B2B ENTERPRISE LEADS */}
            {section === 'leads' && (
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Filter company, contact, or reference..."
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={exportLeadsCsv}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap self-start sm:self-auto cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download CSV
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600">
                        <th className="py-3 px-4">Ref / Date</th>
                        <th className="py-3 px-4">Client Organization</th>
                        <th className="py-3 px-4">Service &amp; Budget</th>
                        <th className="py-3 px-4">Pipeline Stage</th>
                        <th className="py-3 px-4 text-right">Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {filteredLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-slate-50">
                          <td className="py-3.5 px-4 font-mono text-xs text-slate-600 tabular-nums whitespace-nowrap">
                            <div className="font-semibold text-slate-900">{lead.referenceCode}</div>
                            <div>{lead.createdAt}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-slate-900">{lead.companyName}</div>
                            <div className="text-xs text-slate-500">
                              {lead.contactPerson} · {lead.email}
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-xs">
                            <div className="font-medium text-slate-800">{lead.serviceCategory}</div>
                            <div className="font-mono text-slate-500 tabular-nums mt-0.5">
                              {lead.budgetRange} · {lead.estimatedTimeline}
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <select
                              aria-label={`Update status for ${lead.companyName}`}
                              value={lead.status}
                              onChange={(e) => {
                                updateLeadStatus(lead.id, e.target.value as LeadStatus);
                                showToast(
                                  `Updated ${lead.referenceCode} status to ${e.target.value}.`
                                );
                              }}
                              className="px-2.5 py-1.5 text-xs font-medium border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                            >
                              {LEAD_STATUSES.map((st) => (
                                <option key={st} value={st}>
                                  {st}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => setSelectedLead(lead)}
                              className="text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer whitespace-nowrap"
                            >
                              View Brief
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* STUDENT ENROLLMENTS */}
            {section === 'enrollments' && (
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="p-5 border-b border-slate-200 flex items-center justify-between gap-4">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search student, college, or program..."
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600">
                        <th className="py-3 px-4">Registration</th>
                        <th className="py-3 px-4">Student &amp; Institution</th>
                        <th className="py-3 px-4">Program &amp; Mode</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Certificate Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {filteredEnrollments.map((enr) => (
                        <tr key={enr.id} className="hover:bg-slate-50">
                          <td className="py-3.5 px-4 font-mono text-xs text-slate-600 tabular-nums whitespace-nowrap">
                            <div className="font-semibold text-slate-900">{enr.registrationId}</div>
                            <div>{enr.createdAt}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-slate-900">{enr.studentName}</div>
                            <div className="text-xs text-slate-500">
                              {enr.college} · {enr.branchAndYear}
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-xs">
                            <div className="font-medium text-slate-800 max-w-xs">
                              {enr.programTitle}
                            </div>
                            <div className="text-slate-500 mt-0.5">{enr.preferredMode}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <select
                              aria-label={`Update enrollment status for ${enr.studentName}`}
                              value={enr.status}
                              onChange={(e) => {
                                updateEnrollmentStatus(enr.id, e.target.value as EnrollmentStatus);
                                showToast(
                                  `Updated ${enr.studentName}'s status to ${e.target.value}.`
                                );
                              }}
                              className="px-2.5 py-1.5 text-xs font-medium border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                            >
                              {ENROLLMENT_STATUSES.map((st) => (
                                <option key={st} value={st}>
                                  {st}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="py-3.5 px-4 text-right whitespace-nowrap">
                            {enr.certificateId ? (
                              <button
                                type="button"
                                onClick={() => onNavigate('verify')}
                                className="font-mono text-xs font-semibold text-emerald-700 hover:underline cursor-pointer"
                              >
                                {enr.certificateId}
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => openIssueCertForEnrollment(enr)}
                                className="px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors cursor-pointer"
                              >
                                Issue Certificate
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* UNIVERSITY MOUS */}
            {section === 'mous' && (
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="p-5 border-b border-slate-200">
                  <h2 className="text-sm font-bold text-slate-900">
                    Institutional MoU &amp; Campus Collaboration Requests
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600">
                        <th className="py-3 px-4">Ref / Date</th>
                        <th className="py-3 px-4">Institution &amp; Contact</th>
                        <th className="py-3 px-4">Proposed Tracks</th>
                        <th className="py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {mouProposals.map((mou) => (
                        <tr key={mou.id} className="hover:bg-slate-50">
                          <td className="py-3.5 px-4 font-mono text-xs text-slate-600 tabular-nums whitespace-nowrap">
                            <div className="font-semibold text-slate-900">{mou.referenceCode}</div>
                            <div>{mou.createdAt}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-slate-900">
                              {mou.institutionName}
                            </div>
                            <div className="text-xs text-slate-600">
                              {mou.contactName} ({mou.designation})
                            </div>
                            <div className="text-xs text-slate-500 mt-0.5">
                              {mou.city} · {mou.email}
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-xs text-slate-700 max-w-xs">
                            <div>{mou.tracks.join(' · ')}</div>
                            <div className="text-slate-500 mt-1">{mou.notes}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <select
                              aria-label={`Update MoU status for ${mou.institutionName}`}
                              value={mou.status}
                              onChange={(e) => {
                                updateMoUStatus(mou.id, e.target.value as MoUStatus);
                                showToast(`Updated ${mou.referenceCode} status to ${e.target.value}.`);
                              }}
                              className="px-2.5 py-1.5 text-xs font-medium border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                            >
                              {MOU_STATUSES.map((st) => (
                                <option key={st} value={st}>
                                  {st}
                                </option>
                              ))}
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* CERTIFICATE REGISTRY */}
            {section === 'certificates' && (
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Filter certificate ID or student..."
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => onNavigate('verify')}
                      className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                    >
                      Open Public Verifier
                    </button>
                    <button
                      type="button"
                      onClick={openBlankCertModal}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Issue New
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600">
                        <th className="py-3 px-4">Certificate ID</th>
                        <th className="py-3 px-4">Recipient &amp; College</th>
                        <th className="py-3 px-4">Program &amp; Grade</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {filteredCertificates.map((cert) => (
                        <tr key={cert.certificateId} className="hover:bg-slate-50">
                          <td className="py-3.5 px-4 font-mono text-xs font-semibold text-slate-900 whitespace-nowrap">
                            <div>{cert.certificateId}</div>
                            <div className="font-normal text-slate-500 tabular-nums">
                              {cert.issueDate}
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-slate-900">{cert.studentName}</div>
                            <div className="text-xs text-slate-500">{cert.college}</div>
                          </td>
                          <td className="py-3.5 px-4 text-xs">
                            <div className="font-medium text-slate-800 max-w-xs">
                              {cert.programTitle}
                            </div>
                            <div className="text-slate-500 mt-0.5">
                              {cert.domain} · {cert.grade}
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-xs font-semibold">
                            <span
                              className={
                                cert.status === 'Valid' ? 'text-emerald-700' : 'text-red-700'
                              }
                            >
                              {cert.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => {
                                toggleCertificateStatus(cert.certificateId);
                                showToast(
                                  `Updated ${cert.certificateId} status to ${
                                    cert.status === 'Valid' ? 'Revoked' : 'Valid'
                                  }.`
                                );
                              }}
                              className="text-xs font-semibold text-slate-700 hover:text-blue-600 cursor-pointer whitespace-nowrap"
                            >
                              {cert.status === 'Valid' ? 'Revoke' : 'Reinstate'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* PROGRAM CATALOG MANAGER */}
            {section === 'programs' && (
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="p-5 border-b border-slate-200 flex items-center justify-between gap-4">
                  <h2 className="text-sm font-bold text-slate-900">
                    Active Edu-Tech Courses, Internships &amp; Workshops
                  </h2>
                  <button
                    type="button"
                    onClick={() => setShowProgramModal(true)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Program
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600">
                        <th className="py-3 px-4">Code</th>
                        <th className="py-3 px-4">Program Title</th>
                        <th className="py-3 px-4">Category &amp; Mode</th>
                        <th className="py-3 px-4 text-right">Seats</th>
                        <th className="py-3 px-4 text-right">Catalog Visibility</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {programs.map((prog) => (
                        <tr key={prog.id} className="hover:bg-slate-50">
                          <td className="py-3.5 px-4 font-mono text-xs text-slate-600 whitespace-nowrap">
                            {prog.code}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-slate-900">{prog.title}</div>
                            <div className="text-xs text-slate-500 tabular-nums">
                              Next batch: {prog.nextBatch} · ₹{prog.feeInr.toLocaleString('en-IN')}
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-xs text-slate-700">
                            <div>
                              {prog.category} · {prog.domain}
                            </div>
                            <div className="text-slate-500 mt-0.5">{prog.mode}</div>
                          </td>
                          <td className="py-3.5 px-4 text-right font-mono text-xs text-slate-800 tabular-nums whitespace-nowrap">
                            {prog.seatsFilled} / {prog.seatsTotal}
                          </td>
                          <td className="py-3.5 px-4 text-right whitespace-nowrap">
                            <button
                              type="button"
                              onClick={() => {
                                toggleProgramActive(prog.id);
                                showToast(
                                  `${prog.code} is now ${prog.active ? 'hidden' : 'published'} on Edu-Tech.`
                                );
                              }}
                              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                                prog.active
                                  ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              }`}
                            >
                              {prog.active ? 'Published' : 'Hidden'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lead Brief Modal */}
      {selectedLead && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white border border-slate-200 rounded-xl w-full max-w-lg shadow-xl overflow-hidden">
            <div className="flex items-start justify-between gap-4 px-6 py-4 border-b border-slate-200 bg-slate-50">
              <div>
                <p className="text-xs font-mono text-blue-600">{selectedLead.referenceCode}</p>
                <h3 className="text-base font-bold text-slate-900">{selectedLead.companyName}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                aria-label="Close lead brief"
                className="p-1 text-slate-500 hover:text-slate-900 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-500 block">Contact Person</span>
                  <span className="font-semibold text-slate-900">{selectedLead.contactPerson}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Phone</span>
                  <span className="font-mono text-slate-900">{selectedLead.phone}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Email</span>
                  <span className="font-mono text-slate-900">{selectedLead.email}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Budget &amp; Timeline</span>
                  <span className="font-mono text-slate-900 tabular-nums">
                    {selectedLead.budgetRange} · {selectedLead.estimatedTimeline}
                  </span>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100">
                <span className="text-xs font-semibold text-slate-500 block mb-1.5">
                  Project Brief ({selectedLead.serviceCategory})
                </span>
                <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-200">
                  {selectedLead.projectBrief}
                </p>
              </div>
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedLead(null)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Issue New Certificate Modal */}
      {showCertModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white border border-slate-200 rounded-xl w-full max-w-lg shadow-xl overflow-hidden my-auto">
            <div className="flex items-start justify-between gap-4 px-6 py-4 border-b border-slate-200 bg-slate-50">
              <div>
                <p className="text-xs font-medium text-blue-600">Digital Credential Registry</p>
                <h3 className="text-base font-bold text-slate-900">Issue Verifiable Certificate</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowCertModal(false)}
                aria-label="Close issue certificate modal"
                className="p-1 text-slate-500 hover:text-slate-900 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleIssueCertificate} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Student Name *
                  </label>
                  <input
                    required
                    type="text"
                    value={certStudentName}
                    onChange={(e) => setCertStudentName(e.target.value)}
                    placeholder="Full student name"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    College / University *
                  </label>
                  <input
                    required
                    type="text"
                    value={certCollege}
                    onChange={(e) => setCertCollege(e.target.value)}
                    placeholder="Institution name"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Program Title *
                </label>
                <input
                  required
                  type="text"
                  value={certProgramTitle}
                  onChange={(e) => setCertProgramTitle(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Domain</label>
                  <select
                    value={certDomain}
                    onChange={(e) => setCertDomain(e.target.value as ProgramDomain)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="SAP">SAP</option>
                    <option value="ServiceNow">ServiceNow</option>
                    <option value="Full-Stack Web">Full-Stack Web</option>
                    <option value="AI & Data Science">AI &amp; Data Science</option>
                    <option value="Cloud & DevOps">Cloud &amp; DevOps</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Category</label>
                  <select
                    value={certCategory}
                    onChange={(e) => setCertCategory(e.target.value as ProgramCategory)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="Real-Time Internships">Real-Time Internships</option>
                    <option value="Online Courses">Online Courses</option>
                    <option value="Workshops">Workshops</option>
                    <option value="Hackathons">Hackathons</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Duration</label>
                  <input
                    type="text"
                    value={certDuration}
                    onChange={(e) => setCertDuration(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Grade</label>
                  <input
                    type="text"
                    value={certGrade}
                    onChange={(e) => setCertGrade(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Capstone Project Title
                </label>
                <input
                  type="text"
                  value={certProject}
                  onChange={(e) => setCertProject(e.target.value)}
                  placeholder="e.g., S/4HANA Inventory Fiori App"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCertModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg cursor-pointer"
                >
                  Generate &amp; Register ID
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Program Modal */}
      {showProgramModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white border border-slate-200 rounded-xl w-full max-w-lg shadow-xl overflow-hidden my-auto">
            <div className="flex items-start justify-between gap-4 px-6 py-4 border-b border-slate-200 bg-slate-50">
              <div>
                <p className="text-xs font-medium text-blue-600">Edu-Tech Catalog</p>
                <h3 className="text-base font-bold text-slate-900">Publish New Program</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowProgramModal(false)}
                aria-label="Close add program modal"
                className="p-1 text-slate-500 hover:text-slate-900 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProgram} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Program Title *
                </label>
                <input
                  required
                  type="text"
                  value={progTitle}
                  onChange={(e) => setProgTitle(e.target.value)}
                  placeholder="e.g., SAP FICO Functional Consulting Weekend Batch"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Category</label>
                  <select
                    value={progCategory}
                    onChange={(e) => setProgCategory(e.target.value as ProgramCategory)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="Online Courses">Online Courses</option>
                    <option value="Real-Time Internships">Real-Time Internships</option>
                    <option value="Workshops">Workshops</option>
                    <option value="Hackathons">Hackathons</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Domain</label>
                  <select
                    value={progDomain}
                    onChange={(e) => setProgDomain(e.target.value as ProgramDomain)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="SAP">SAP</option>
                    <option value="ServiceNow">ServiceNow</option>
                    <option value="Full-Stack Web">Full-Stack Web</option>
                    <option value="AI & Data Science">AI &amp; Data Science</option>
                    <option value="Cloud & DevOps">Cloud &amp; DevOps</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Mode</label>
                  <select
                    value={progMode}
                    onChange={(e) => setProgMode(e.target.value as ProgramMode)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="Online Live">Online Live</option>
                    <option value="Hybrid (Hyderabad)">Hybrid (Hyderabad)</option>
                    <option value="On-Campus">On-Campus</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Duration</label>
                  <input
                    type="text"
                    value={progDuration}
                    onChange={(e) => setProgDuration(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Fee (INR)</label>
                  <input
                    type="number"
                    min={0}
                    value={progFee}
                    onChange={(e) => setProgFee(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg tabular-nums"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Seats</label>
                  <input
                    type="number"
                    min={5}
                    value={progSeats}
                    onChange={(e) => setProgSeats(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg tabular-nums"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Next Batch Date
                  </label>
                  <input
                    type="text"
                    value={progBatch}
                    onChange={(e) => setProgBatch(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Lead Mentor
                  </label>
                  <input
                    type="text"
                    value={progMentor}
                    onChange={(e) => setProgMentor(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Summary *</label>
                <textarea
                  required
                  rows={3}
                  value={progSummary}
                  onChange={(e) => setProgSummary(e.target.value)}
                  placeholder="Describe hands-on labs, deliverables, and target audience..."
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowProgramModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg cursor-pointer"
                >
                  Publish to Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
