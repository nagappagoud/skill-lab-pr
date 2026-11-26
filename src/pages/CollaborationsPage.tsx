import React, { useMemo, useState } from 'react';
import { Check, CheckCircle2 } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';
import { MoUProposal, PartnershipType } from '../types';

interface CollaborationsPageProps {
  onViewAdmin?: () => void;
}

const PARTNERSHIP_FILTERS: ('All' | PartnershipType)[] = [
  'All',
  'MoU Signed',
  'Centre of Excellence',
  'Hackathon Host',
  'Placement Drive',
];

const COLLABORATION_MODELS = [
  {
    index: '01.',
    title: 'University MoUs & Credit-Aligned Labs',
    summary:
      'Multi-year institutional Memoranda of Understanding integrating SAP, ServiceNow, and Full-Stack engineering electives directly into semester schedules.',
    outcomes: [
      'NAAC / NBA industry-academia collaboration compliance documentation',
      'Dedicated Hyderabad engineering mentors assigned per academic year',
      'Real-time minor & major project guidance for final-year batches',
    ],
  },
  {
    index: '02.',
    title: 'On-Campus Workshops & Faculty Development (FDP)',
    summary:
      'Intensive 2-to-5 day hands-on technical bootcamps for students alongside modern cloud, ERP, and AI curriculum upskilling for department faculty.',
    outcomes: [
      '100% lab-driven sessions with live cloud sandboxes & PDI instances',
      'Structured attendance & practical assessment reports for HODs',
      'Verifiable digital certificates issued via Shreevedha Registry',
    ],
  },
  {
    index: '03.',
    title: '24-Hour Campus Hackathons & Innovation Sprints',
    summary:
      'Co-branded inter-college hackathons built around genuine B2B software, healthcare, and industrial IoT problem statements from Shreevedha clients.',
    outcomes: [
      'Industry CTO jury panel & live architecture mentorship overnight',
      'Cash awards, cloud credits & direct internship interviews for top teams',
      'End-to-end event rubric, registration portal & certificate validation',
    ],
  },
  {
    index: '04.',
    title: 'Placement Readiness & Pre-Hiring Bootcamps',
    summary:
      'Targeted final-year placement sprints combining DSA coding drills, enterprise case studies, resume audits, and mock technical interviews.',
    outcomes: [
      'Simulated technical panels led by HITEC City software architects',
      'Individual skill-gap scorecards shared with the Training & Placement Cell',
      'Direct referral pipelines to Hyderabad IT & product engineering firms',
    ],
  },
];

const TRACK_OPTIONS = [
  'University MoU',
  'SAP / ServiceNow Centre of Excellence',
  'Hands-On Technical Workshops',
  'Real-Time Student Internships',
  '24-Hour Campus Hackathon',
  'Faculty Development Program (FDP)',
  'Placement Readiness Training',
];

export const CollaborationsPage: React.FC<CollaborationsPageProps> = ({ onViewAdmin }) => {
  const { partners, addMoUProposal } = useAppData();

  const [partnerFilter, setPartnerFilter] = useState<'All' | PartnershipType>('All');

  // MoU Proposal Form state
  const [institutionName, setInstitutionName] = useState('');
  const [contactName, setContactName] = useState('');
  const [designation, setDesignation] = useState('Training & Placement Officer (TPO)');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Hyderabad, Telangana');
  const [studentStrength, setStudentStrength] = useState('500 – 1,000 Students');
  const [selectedTracks, setSelectedTracks] = useState<string[]>([
    'University MoU',
    'Real-Time Student Internships',
  ]);
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState('');
  const [submittedMoU, setSubmittedMoU] = useState<MoUProposal | null>(null);

  const filteredPartners = useMemo(() => {
    if (partnerFilter === 'All') return partners;
    return partners.filter((p) => p.partnershipType === partnerFilter);
  }, [partners, partnerFilter]);

  const toggleTrack = (track: string) => {
    setSelectedTracks((prev) =>
      prev.includes(track) ? prev.filter((item) => item !== track) : [...prev, track]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!institutionName.trim() || !contactName.trim()) {
      setFormError('Please enter both Institution Name and Contact Person.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setFormError('Please provide a valid institutional email address.');
      return;
    }
    if (phone.trim().length < 8) {
      setFormError('Please provide a valid contact phone number.');
      return;
    }
    if (selectedTracks.length === 0) {
      setFormError('Please select at least one collaboration track.');
      return;
    }

    setFormError('');
    const created = addMoUProposal({
      institutionName: institutionName.trim(),
      contactName: contactName.trim(),
      designation: designation.trim(),
      email: email.trim(),
      phone: phone.trim(),
      city: city.trim(),
      studentStrength,
      tracks: selectedTracks,
      notes: notes.trim() || 'Requested standard MoU deck and academic calendar discussion.',
    });
    setSubmittedMoU(created);
    setInstitutionName('');
    setContactName('');
    setEmail('');
    setPhone('');
    setNotes('');
  };

  return (
    <div>
      {/* Header */}
      <section className="bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <div className="max-w-3xl space-y-5">
            <p className="text-sm font-medium text-blue-400">
              University &amp; College Collaborations · 40+ Institutional MoUs
            </p>
            <h1 className="text-[clamp(2rem,3.6vw,3.15rem)] font-extrabold tracking-tight leading-[1.1] text-white text-balance">
              Bridging Engineering Campuses and Enterprise Software Delivery
            </h1>
            <p className="text-base text-slate-300 leading-relaxed">
              We partner with autonomous engineering colleges, universities, and degree institutions
              across Telangana, Andhra Pradesh, and South India to establish Centres of Excellence,
              run practical workshops, host hackathons, and deliver measurable placement outcomes.
            </p>
            <div className="pt-2">
              <a
                href="#mou-proposal-form"
                className="inline-flex items-center px-5 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors whitespace-nowrap"
              >
                Propose an Institutional MoU
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Collaboration Models */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-sm font-semibold text-blue-600 mb-1">Collaboration Frameworks</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Structured Academic Partnership Tracks
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {COLLABORATION_MODELS.map((model) => (
              <article
                key={model.index}
                className="bg-white border border-slate-200 rounded-xl p-7 space-y-4"
              >
                <h3 className="text-lg font-bold text-slate-900">
                  <span className="font-mono text-blue-600 mr-2">{model.index}</span>
                  {model.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">{model.summary}</p>
                <ul className="space-y-2 pt-3 border-t border-slate-100">
                  {model.outcomes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Filterable Partner Directory */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div>
              <p className="text-sm font-semibold text-blue-600 mb-1">Partner Network</p>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Active Partner Colleges &amp; Universities
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {PARTNERSHIP_FILTERS.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setPartnerFilter(filter)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    partnerFilter === filter
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600">
                  <th className="py-3.5 px-5">Institution</th>
                  <th className="py-3.5 px-5">Location &amp; Affiliation</th>
                  <th className="py-3.5 px-5">Partnership Track</th>
                  <th className="py-3.5 px-5">Focus Areas</th>
                  <th className="py-3.5 px-5 text-right">Students Upskilled</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm">
                {filteredPartners.map((partner) => (
                  <tr key={partner.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-5">
                      <div className="font-semibold text-slate-900">{partner.name}</div>
                      <div className="text-xs text-slate-500 mt-0.5 font-mono tabular-nums">
                        Partner since {partner.sinceYear}
                      </div>
                    </td>
                    <td className="py-4 px-5 text-xs text-slate-600">
                      <div className="font-medium text-slate-800">{partner.city}</div>
                      <div className="mt-0.5">{partner.affiliation}</div>
                    </td>
                    <td className="py-4 px-5 text-xs font-semibold text-blue-700 whitespace-nowrap">
                      {partner.partnershipType}
                    </td>
                    <td className="py-4 px-5 text-xs text-slate-600">
                      {partner.focusAreas.join(' · ')}
                    </td>
                    <td className="py-4 px-5 text-right font-mono font-semibold text-slate-900 tabular-nums">
                      {partner.studentsTrained.toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Institutional MoU Proposal Form */}
      <section id="mou-proposal-form" className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 lg:p-10">
            <div className="mb-8">
              <p className="text-sm font-semibold text-blue-600 mb-1">
                For Principals, Deans, HODs &amp; Placement Officers
              </p>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Initiate an Institutional MoU or Campus Workshop Proposal
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                Submit your academic calendar preferences and batch strength. Our Academic Relations
                team in Hyderabad will prepare a tailored MoU draft and schedule an on-campus visit.
              </p>
            </div>

            {submittedMoU && (
              <div className="mb-6 p-5 rounded-lg bg-emerald-50 border border-emerald-200 space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-emerald-900">
                      MoU Proposal Registered — Reference{' '}
                      <span className="font-mono">{submittedMoU.referenceCode}</span>
                    </p>
                    <p className="text-sm text-emerald-800 mt-1">
                      Your request for <strong>{submittedMoU.institutionName}</strong> is now live
                      in the Shreevedha Academic Relations Admin queue.
                    </p>
                  </div>
                </div>
                {onViewAdmin && (
                  <div className="pl-8">
                    <button
                      type="button"
                      onClick={onViewAdmin}
                      className="text-xs font-semibold text-emerald-900 underline underline-offset-4 hover:text-emerald-700 cursor-pointer"
                    >
                      Inspect this submission in the Admin Portal
                    </button>
                  </div>
                )}
              </div>
            )}

            {formError && (
              <div className="mb-6 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    University / College Name *
                  </label>
                  <input
                    type="text"
                    value={institutionName}
                    onChange={(e) => setInstitutionName(e.target.value)}
                    placeholder="e.g., Vardhaman College of Engineering"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    City / District *
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Hyderabad, Telangana"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Authorized Contact Name *
                  </label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Dr. / Prof. Full Name"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Designation
                  </label>
                  <input
                    type="text"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    placeholder="Principal / Dean / HOD / TPO"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Institutional Email *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tpo@college.ac.in"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Direct Phone *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98480 00000"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Target Batch Strength
                  </label>
                  <select
                    value={studentStrength}
                    onChange={(e) => setStudentStrength(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="Under 250 Students">Under 250 Students</option>
                    <option value="250 – 500 Students">250 – 500 Students</option>
                    <option value="500 – 1,000 Students">500 – 1,000 Students</option>
                    <option value="1,000+ Students">1,000+ Students</option>
                  </select>
                </div>
              </div>

              <div>
                <span className="block text-sm font-medium text-slate-700 mb-2">
                  Select Collaboration Tracks *
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {TRACK_OPTIONS.map((track) => {
                    const checked = selectedTracks.includes(track);
                    return (
                      <label
                        key={track}
                        className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg border text-sm cursor-pointer transition-colors ${
                          checked
                            ? 'bg-blue-50 border-blue-300 text-slate-900 font-medium'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleTrack(track)}
                          className="accent-blue-600 w-4 h-4 rounded"
                        />
                        <span>{track}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Preferred Semester Dates or Specific Requirements
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Mention target departments (CSE, IT, ECE, MBA/MCA), tentative workshop dates, or NAAC documentation needs..."
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer"
                >
                  Submit Institutional Proposal
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
