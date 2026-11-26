import React, { useMemo, useState } from 'react';
import { BookOpen, Check, Search, X } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';
import { ASSET_IMAGES } from '../data/seedData';
import { Program, ProgramCategory, ProgramDomain, ProgramMode } from '../types';
import { SafeImage } from '../components/SafeImage';

interface EduTechPageProps {
  onEnrollProgram: (program: Program) => void;
}

const CATEGORIES: ('All' | ProgramCategory)[] = [
  'All',
  'Online Courses',
  'Real-Time Internships',
  'Workshops',
  'Hackathons',
];

const DOMAINS: ('All Domains' | ProgramDomain)[] = [
  'All Domains',
  'SAP',
  'ServiceNow',
  'Full-Stack Web',
  'AI & Data Science',
  'Cloud & DevOps',
];

const MODES: ('All Modes' | ProgramMode)[] = [
  'All Modes',
  'Online Live',
  'Hybrid (Hyderabad)',
  'On-Campus',
];

export const EduTechPage: React.FC<EduTechPageProps> = ({ onEnrollProgram }) => {
  const { programs } = useAppData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | ProgramCategory>('All');
  const [selectedDomain, setSelectedDomain] = useState<'All Domains' | ProgramDomain>('All Domains');
  const [selectedMode, setSelectedMode] = useState<'All Modes' | ProgramMode>('All Modes');
  const [syllabusProgram, setSyllabusProgram] = useState<Program | null>(null);

  const filteredPrograms = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return programs.filter((prog) => {
      if (!prog.active) return false;
      if (selectedCategory !== 'All' && prog.category !== selectedCategory) return false;
      if (selectedDomain !== 'All Domains' && prog.domain !== selectedDomain) return false;
      if (selectedMode !== 'All Modes' && prog.mode !== selectedMode) return false;
      if (!q) return true;
      return (
        prog.title.toLowerCase().includes(q) ||
        prog.summary.toLowerCase().includes(q) ||
        prog.domain.toLowerCase().includes(q) ||
        prog.mentor.toLowerCase().includes(q) ||
        prog.code.toLowerCase().includes(q)
      );
    });
  }, [programs, searchQuery, selectedCategory, selectedDomain, selectedMode]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedDomain('All Domains');
    setSelectedMode('All Modes');
  };

  return (
    <div>
      {/* Edu-Tech Header */}
      <section className="bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-18">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            <div className="lg:col-span-7 flex flex-col justify-center space-y-5">
              <p className="text-sm font-medium text-blue-400">
                Shreevedha Edu-Tech Hub · Practitioner-Led Upskilling
              </p>
              <h1 className="text-[clamp(2rem,3.6vw,3.15rem)] font-extrabold tracking-tight leading-[1.1] text-white text-balance">
                Real-Time Internships, Enterprise Courses, Workshops &amp; Hackathons
              </h1>
              <p className="text-base text-slate-300 leading-relaxed max-w-2xl">
                Every curriculum is taught directly by working SAP architects, ServiceNow
                consultants, and full-stack engineers from our Hyderabad delivery teams—complete
                with verifiable certificates and structured placement preparation.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-xl overflow-hidden border border-slate-700 h-full min-h-[240px]">
                <SafeImage
                  src={ASSET_IMAGES.edutechCampusLab}
                  alt="Engineering students collaborating in a Shreevedha coding workshop and hackathon"
                  fallbackTitle="Shreevedha Campus Innovation Lab"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Bar & Program Catalog */}
      <section className="py-12 lg:py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Interactive Filter Controls */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 space-y-5 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-xl">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search SAP, ServiceNow, React, IoT, mentor, or batch code..."
                  aria-label="Search programs"
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                />
              </div>

              <div className="flex items-center justify-between md:justify-end gap-4 text-sm">
                <span className="text-slate-600 tabular-nums">
                  Showing <strong className="text-slate-900">{filteredPrograms.length}</strong>{' '}
                  programs
                </span>
                {(searchQuery ||
                  selectedCategory !== 'All' ||
                  selectedDomain !== 'All Domains' ||
                  selectedMode !== 'All Modes') && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer whitespace-nowrap"
                  >
                    Reset Filters
                  </button>
                )}
              </div>
            </div>

            {/* Category Segmented Filter */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <span className="text-xs font-semibold text-slate-500 w-20 shrink-0">Category</span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                        selectedCategory === cat
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Domain Filter */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <span className="text-xs font-semibold text-slate-500 w-20 shrink-0">Domain</span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {DOMAINS.map((dom) => (
                    <button
                      key={dom}
                      type="button"
                      onClick={() => setSelectedDomain(dom)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                        selectedDomain === dom
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {dom}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mode Filter */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <span className="text-xs font-semibold text-slate-500 w-20 shrink-0">Mode</span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {MODES.map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setSelectedMode(mode)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                        selectedMode === mode
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Program Cards Grid */}
          {filteredPrograms.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-xl p-12 text-center space-y-3">
              <p className="text-base font-semibold text-slate-900">
                No matching programs found for your current filters
              </p>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Try clearing one of the domain or delivery mode filters to browse all open Hyderabad
                and live online batches.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer"
              >
                Show All Programs
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredPrograms.map((prog) => {
                const seatsLeft = Math.max(0, prog.seatsTotal - prog.seatsFilled);
                const fillPercent = Math.min(
                  100,
                  Math.round((prog.seatsFilled / prog.seatsTotal) * 100)
                );

                return (
                  <article
                    key={prog.id}
                    className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between gap-6"
                  >
                    <div className="space-y-3">
                      {/* Unboxed clean text metadata */}
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <span className="font-semibold text-blue-700">{prog.category}</span>
                          <span aria-hidden="true">·</span>
                          <span>{prog.domain}</span>
                          <span aria-hidden="true">·</span>
                          <span>{prog.mode}</span>
                        </div>
                        <span className="font-mono text-slate-400">{prog.code}</span>
                      </div>

                      <h2 className="text-lg font-bold text-slate-900 leading-snug">
                        {prog.title}
                      </h2>

                      <p className="text-sm text-slate-600 leading-relaxed">{prog.summary}</p>

                      <div className="text-xs text-slate-600 pt-1">
                        Lead Mentor:{' '}
                        <span className="font-semibold text-slate-900">{prog.mentor}</span> —{' '}
                        {prog.mentorRole}
                      </div>

                      {/* Seat fill indicator */}
                      <div className="pt-2 space-y-1.5">
                        <div className="flex items-center justify-between text-xs tabular-nums">
                          <span className="text-slate-600">
                            Next Batch: <strong className="text-slate-900">{prog.nextBatch}</strong>{' '}
                            · {prog.duration}
                          </span>
                          <span
                            className={
                              seatsLeft <= 10
                                ? 'font-semibold text-amber-700'
                                : 'font-medium text-slate-600'
                            }
                          >
                            {seatsLeft} / {prog.seatsTotal} seats left
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-600 rounded-full transition-all"
                            style={{ width: `${fillPercent}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <span className="block text-xs text-slate-500">Program Fee</span>
                        <span className="text-lg font-bold text-slate-900 font-mono tabular-nums">
                          ₹{prog.feeInr.toLocaleString('en-IN')}
                        </span>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => setSyllabusProgram(prog)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          View Syllabus
                        </button>
                        <button
                          type="button"
                          disabled={seatsLeft === 0}
                          onClick={() => onEnrollProgram(prog)}
                          className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                        >
                          {seatsLeft === 0 ? 'Batch Full' : 'Enroll Now'}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Syllabus Detail Modal */}
      {syllabusProgram && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="syllabus-modal-title"
        >
          <div className="bg-white border border-slate-200 rounded-xl w-full max-w-xl shadow-xl overflow-hidden my-auto">
            <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-slate-200 bg-slate-50">
              <div>
                <p className="text-xs font-medium text-blue-600 mb-1">
                  {syllabusProgram.code} · {syllabusProgram.category} · {syllabusProgram.mode}
                </p>
                <h3 id="syllabus-modal-title" className="text-lg font-bold text-slate-900">
                  {syllabusProgram.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSyllabusProgram(null)}
                aria-label="Close syllabus"
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200/70 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-xs font-semibold text-slate-500 mb-3">
                  Structured Curriculum Modules
                </h4>
                <ol className="space-y-2.5">
                  {syllabusProgram.syllabus.map((mod, idx) => (
                    <li key={mod} className="flex items-start gap-3 text-sm text-slate-800">
                      <span className="font-mono text-xs font-semibold text-blue-600 mt-0.5 tabular-nums">
                        0{idx + 1}.
                      </span>
                      <span>{mod}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-semibold text-slate-500 mb-3">
                  Certification &amp; Placement Outcomes
                </h4>
                <ul className="space-y-2">
                  {syllabusProgram.outcomes.map((outcome) => (
                    <li key={outcome} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                <div className="text-sm tabular-nums">
                  <span className="text-slate-500">Fee: </span>
                  <strong className="font-mono text-slate-900">
                    ₹{syllabusProgram.feeInr.toLocaleString('en-IN')}
                  </strong>
                  <span className="text-slate-400 mx-2">·</span>
                  <span className="text-slate-600">{syllabusProgram.duration}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const selected = syllabusProgram;
                    setSyllabusProgram(null);
                    onEnrollProgram(selected);
                  }}
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer"
                >
                  Enroll in Next Batch
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
