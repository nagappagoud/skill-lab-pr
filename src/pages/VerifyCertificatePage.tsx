import React, { useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Printer,
  Search,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react';
import { useAppData } from '../context/AppDataContext';
import { CertificateRecord } from '../types';

export const VerifyCertificatePage: React.FC = () => {
  const { certificates } = useAppData();

  const [query, setQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [matchedCert, setMatchedCert] = useState<CertificateRecord | null>(null);

  const runSearch = (rawInput: string) => {
    const clean = rawInput.trim().toLowerCase();
    setHasSearched(true);
    if (!clean) {
      setMatchedCert(null);
      return;
    }

    const found =
      certificates.find((c) => c.certificateId.toLowerCase() === clean) ||
      certificates.find((c) => c.studentName.toLowerCase().includes(clean)) ||
      null;

    setMatchedCert(found);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runSearch(query);
  };

  const handleSampleLookup = (certId: string) => {
    setQuery(certId);
    runSearch(certId);
  };

  return (
    <div className="bg-slate-50 min-h-[75vh]">
      {/* Top Verification Banner */}
      <section className="bg-slate-900 text-white border-b border-slate-800 no-print">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <p className="text-sm font-medium text-blue-400 mb-2">
            Official Digital Credential Registry · Hyderabad HQ
          </p>
          <h1 className="text-[clamp(1.85rem,3.4vw,2.85rem)] font-extrabold tracking-tight text-white text-balance">
            Verify Shreevedha Internship, Course &amp; Workshop Certificates
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-3 max-w-2xl leading-relaxed">
            Employers, HR recruiters, and university placement cells can instantly validate any
            credential issued by Shreevedha Solutions India Private Limited using its unique
            Certificate ID or recipient name.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter Certificate ID (e.g., SVS-2026-SAP-1042) or Student Name"
                aria-label="Certificate ID or Student Name"
                className="w-full pl-10 pr-4 py-3 text-sm bg-white text-slate-900 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Verify Credential
            </button>
          </form>

          {/* Quick-Test Registry IDs */}
          <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <span>Try an issued ID:</span>
            {certificates.slice(0, 5).map((cert) => (
              <button
                key={cert.certificateId}
                type="button"
                onClick={() => handleSampleLookup(cert.certificateId)}
                className="font-mono text-slate-200 hover:text-white underline underline-offset-4 decoration-slate-600 hover:decoration-blue-400 px-1.5 py-0.5 cursor-pointer"
              >
                {cert.certificateId}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Verification Output Area */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!hasSearched ? (
          <div className="bg-white border border-slate-200 rounded-xl p-8 sm:p-10 text-center space-y-3">
            <ShieldCheck className="w-9 h-9 text-blue-600 mx-auto" />
            <h2 className="text-lg font-bold text-slate-900">Ready to Validate Credentials</h2>
            <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
              Enter a certificate code above or select one of the registry samples to inspect the
              verified academic record, capstone project title, and issue status. Any certificate
              newly issued in the Admin Portal is verifiable here immediately.
            </p>
          </div>
        ) : !matchedCert ? (
          <div className="bg-white border border-red-200 rounded-xl p-8 flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <h2 className="text-base font-bold text-slate-900">
                No Matching Certificate Found
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                We could not find an official credential matching{' '}
                <span className="font-mono font-semibold text-slate-900">&ldquo;{query}&rdquo;</span>
                . Please check the hyphenated Certificate ID (format:{' '}
                <span className="font-mono">SVS-YYYY-DOM-XXXX</span>) or contact{' '}
                <span className="font-mono">verify@shreevedhasolutions.in</span>.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Explicit Verification Status Banner (icon + text, never hue-only) */}
            <div
              className={`rounded-xl border px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print ${
                matchedCert.status === 'Valid'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : 'bg-red-50 border-red-200 text-red-950'
              }`}
            >
              <div className="flex items-start sm:items-center gap-3">
                {matchedCert.status === 'Valid' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                ) : (
                  <ShieldAlert className="w-5 h-5 text-red-700 shrink-0" />
                )}
                <div className="text-sm">
                  <span className="font-bold">
                    Status: {matchedCert.status === 'Valid' ? 'Authentic & Verified' : 'Revoked'}
                  </span>
                  <span className="mx-2 text-slate-400">·</span>
                  <span>
                    Record ID <span className="font-mono font-semibold">{matchedCert.certificateId}</span>
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-800 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors self-start sm:self-auto cursor-pointer whitespace-nowrap"
              >
                <Printer className="w-3.5 h-3.5" />
                Print Verification Summary
              </button>
            </div>

            {/* Official Printable Credential Card */}
            <article className="bg-white border border-slate-300 rounded-xl p-8 sm:p-10 print-only-card">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-200">
                <div>
                  <p className="text-xs font-semibold text-blue-700">
                    Shreevedha Solutions India Private Limited
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    HITEC City, Madhapur, Hyderabad, Telangana 500081
                  </p>
                </div>
                <div className="sm:text-right">
                  <p className="text-xs text-slate-500">Certificate ID</p>
                  <p className="text-sm font-mono font-bold text-slate-900">
                    {matchedCert.certificateId}
                  </p>
                </div>
              </div>

              <div className="py-8 space-y-6">
                <div>
                  <p className="text-xs text-slate-500 mb-1">Awarded To</p>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {matchedCert.studentName}
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">{matchedCert.college}</p>
                </div>

                <div>
                  <p className="text-xs text-slate-500 mb-1">
                    For Successfully Completing ({matchedCert.category} · {matchedCert.domain})
                  </p>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    {matchedCert.programTitle}
                  </h3>
                </div>

                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                  <p className="text-xs font-semibold text-slate-500 mb-1">
                    Evaluated Capstone / Practical Deliverable
                  </p>
                  <p className="text-sm font-medium text-slate-900">{matchedCert.projectTitle}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 text-sm">
                  <div>
                    <span className="block text-xs text-slate-500">Issue Date</span>
                    <span className="font-mono font-semibold text-slate-900 tabular-nums">
                      {matchedCert.issueDate}
                    </span>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-500">Duration</span>
                    <span className="font-semibold text-slate-900 tabular-nums">
                      {matchedCert.duration}
                    </span>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-500">Performance Grade</span>
                    <span className="font-semibold text-slate-900">{matchedCert.grade}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-xs text-slate-500">
                <div>
                  <p className="font-semibold text-slate-900">{matchedCert.signatory}</p>
                  <p className="mt-0.5">Digitally Verified Registry Record · Status: {matchedCert.status}</p>
                </div>
                <p className="font-mono">Hyderabad, India</p>
              </div>
            </article>
          </div>
        )}
      </section>
    </div>
  );
};
