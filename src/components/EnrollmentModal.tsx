import React, { useEffect, useState } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';
import { Program, ProgramMode, StudentEnrollment } from '../types';

interface EnrollmentModalProps {
  program: Program | null;
  onClose: () => void;
  onViewAdmin?: () => void;
}

const MODES: ProgramMode[] = ['Online Live', 'Hybrid (Hyderabad)', 'On-Campus'];

export const EnrollmentModal: React.FC<EnrollmentModalProps> = ({
  program,
  onClose,
  onViewAdmin,
}) => {
  const { addEnrollment } = useAppData();

  const [studentName, setStudentName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [college, setCollege] = useState('');
  const [branchAndYear, setBranchAndYear] = useState('B.Tech CSE · 4th Year');
  const [preferredMode, setPreferredMode] = useState<ProgramMode>('Online Live');
  const [error, setError] = useState('');
  const [createdEnrollment, setCreatedEnrollment] = useState<StudentEnrollment | null>(null);

  useEffect(() => {
    if (program) {
      setPreferredMode(program.mode);
      setError('');
      setCreatedEnrollment(null);
    }
  }, [program]);

  if (!program) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !college.trim()) {
      setError('Please enter your full name and college or university name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    if (phone.trim().length < 8) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    setError('');
    const result = addEnrollment({
      studentName: studentName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      college: college.trim(),
      branchAndYear: branchAndYear.trim(),
      programId: program.id,
      programTitle: program.title,
      programDomain: program.domain,
      programCategory: program.category,
      preferredMode,
    });
    setCreatedEnrollment(result);
  };

  const resetAndClose = () => {
    setStudentName('');
    setEmail('');
    setPhone('');
    setCollege('');
    setCreatedEnrollment(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enroll-modal-title"
    >
      <div className="bg-white border border-slate-200 rounded-xl w-full max-w-lg shadow-xl overflow-hidden my-auto">
        <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-slate-200 bg-slate-50">
          <div>
            <p className="text-xs font-medium text-blue-600 mb-1">
              {program.category} · {program.domain}
            </p>
            <h2 id="enroll-modal-title" className="text-lg font-bold text-slate-900 leading-snug">
              {createdEnrollment ? 'Enrollment Confirmed' : program.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={resetAndClose}
            aria-label="Close enrollment modal"
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200/70 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {!createdEnrollment ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600 pb-3 border-b border-slate-100 tabular-nums">
                <span>Batch: {program.nextBatch}</span>
                <span aria-hidden="true">·</span>
                <span>Duration: {program.duration}</span>
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-slate-900">
                  Fee: ₹{program.feeInr.toLocaleString('en-IN')}
                </span>
              </div>

              {error && (
                <div className="px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Student Full Name *
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="As printed on academic certificates"
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@college.edu.in"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Mobile / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98480 00000"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  College / University Name *
                </label>
                <input
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  placeholder="e.g., VNR VJIET / CBIT / JNTU Hyderabad"
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Branch &amp; Year
                  </label>
                  <input
                    type="text"
                    value={branchAndYear}
                    onChange={(e) => setBranchAndYear(e.target.value)}
                    placeholder="B.Tech CSE · 3rd Year"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Preferred Mode
                  </label>
                  <select
                    value={preferredMode}
                    onChange={(e) => setPreferredMode(e.target.value as ProgramMode)}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    {MODES.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer"
                >
                  Reserve Seat
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-5">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-emerald-50 border border-emerald-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-emerald-900">
                    Seat Reserved for {createdEnrollment.studentName}
                  </p>
                  <p className="text-sm text-emerald-800 mt-1">
                    Our Hyderabad academic coordinator will send onboarding credentials and batch
                    orientation details to {createdEnrollment.email}.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm border border-slate-200 rounded-lg p-4 bg-slate-50">
                <div>
                  <span className="block text-xs text-slate-500">Registration ID</span>
                  <span className="font-mono font-semibold text-slate-900">
                    {createdEnrollment.registrationId}
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-slate-500">Delivery Mode</span>
                  <span className="font-medium text-slate-900">
                    {createdEnrollment.preferredMode}
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="block text-xs text-slate-500">Program</span>
                  <span className="font-medium text-slate-900">
                    {createdEnrollment.programTitle}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                {onViewAdmin && (
                  <button
                    type="button"
                    onClick={() => {
                      resetAndClose();
                      onViewAdmin();
                    }}
                    className="px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                  >
                    View in Admin Portal
                  </button>
                )}
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="px-5 py-2 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
