import React, { useState } from 'react';
import {
  ArrowRight,
  Building2,
  GraduationCap,
  Quote,
} from 'lucide-react';
import {
  ASSET_IMAGES,
  CASE_STUDIES,
  ENTERPRISE_CLIENTS,
  IMPACT_METRICS,
  PLACEMENT_STORIES,
} from '../data/seedData';
import { useAppData } from '../context/AppDataContext';
import { EnterpriseServiceCategory, Program, RouteView } from '../types';
import { SafeImage } from '../components/SafeImage';

interface HomePageProps {
  onNavigate: (view: RouteView) => void;
  onOpenQuote: (category?: EnterpriseServiceCategory) => void;
  onEnrollProgram: (program: Program) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenQuote,
  onEnrollProgram,
}) => {
  const { programs, partners } = useAppData();
  const [explorerTab, setExplorerTab] = useState<'enterprise' | 'edutech'>('enterprise');

  const upcomingPrograms = programs.filter((p) => p.active).slice(0, 4);

  return (
    <div>
      {/* Hero Section: Dual-Pathway Corporate & Edu-Tech Anchor */}
      <section className="bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-14 lg:pt-16 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div className="space-y-6">
                <p className="text-sm font-medium text-blue-400">
                  Shreevedha Solutions India Private Limited · Headquartered in Hyderabad
                </p>

                <h1 className="text-[clamp(2.25rem,4vw,3.5rem)] font-extrabold tracking-tight leading-[1.08] text-white text-balance">
                  Enterprise Software Engineering and Industry Tech-Education Under One Roof
                </h1>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                  From custom SAP S/4HANA, ServiceNow workflows, and industrial IoT systems for
                  global enterprises to real-time internships, MoU campus labs, and placement
                  tracks across Telangana&apos;s engineering universities.
                </p>
              </div>

              {/* Dual-Pathway Interactive Split Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
                <button
                  type="button"
                  onClick={() => onNavigate('enterprise')}
                  className="group text-left p-5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-blue-500 transition-all duration-150 flex flex-col justify-between gap-4 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Building2 className="w-5 h-5 text-blue-400" aria-hidden="true" />
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <p className="text-xs font-medium text-blue-300 mb-1">For Businesses</p>
                    <h2 className="text-base font-bold text-white leading-snug">
                      Custom Software, SAP &amp; ServiceNow
                    </h2>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      Web &amp; mobile engineering, ERP support, ITSM automation, and industrial
                      R&amp;D delivery.
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-blue-400 group-hover:text-blue-300">
                    Explore Enterprise IT
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('edutech')}
                  className="group text-left p-5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 transition-all duration-150 flex flex-col justify-between gap-4 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <GraduationCap className="w-5 h-5 text-blue-600" aria-hidden="true" />
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <p className="text-xs font-medium text-blue-600 mb-1">
                      For Colleges &amp; Students
                    </p>
                    <h2 className="text-base font-bold text-slate-900 leading-snug">
                      Internships, Courses &amp; Hackathons
                    </h2>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      Live practitioner cohorts, university MoU labs, campus bootcamps, and
                      placement readiness.
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-blue-600 group-hover:text-blue-700">
                    Open Edu-Tech Hub
                  </span>
                </button>
              </div>
            </div>

            {/* Right Architectural Visual Anchor */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="relative rounded-xl overflow-hidden border border-slate-700/80 flex-1 min-h-[280px]">
                <SafeImage
                  src={ASSET_IMAGES.heroHq}
                  alt="Shreevedha Solutions software engineering headquarters in HITEC City, Hyderabad"
                  fallbackTitle="Shreevedha Solutions — HITEC City, Hyderabad"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/45 to-transparent p-5">
                  <p className="text-xs text-slate-300">
                    Madhapur Delivery Center · HITEC City, Hyderabad
                  </p>
                  <p className="text-sm font-semibold text-white mt-0.5">
                    Enterprise Delivery Pods &amp; Applied Academic Practice Labs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full-Width Impact Metrics Strip */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
            {IMPACT_METRICS.map((metric) => (
              <div key={metric.label} className="py-7 px-4 sm:px-6 first:pl-0 last:pr-0">
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono tabular-nums tracking-tight">
                  {metric.value}
                </div>
                <div className="text-sm font-semibold text-slate-900 mt-1.5">{metric.label}</div>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{metric.context}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Division Explorer */}
      <section className="py-16 lg:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-blue-600 mb-2">Interactive Division Explorer</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight text-balance">
                Delivered Enterprise Systems and Active Campus Cohorts
              </h2>
            </div>

            {/* Interactive Segmented Tab Control */}
            <div
              role="tablist"
              aria-label="Division showcase"
              className="inline-flex items-center p-1 bg-slate-200/80 rounded-lg self-start md:self-auto"
            >
              <button
                type="button"
                role="tab"
                aria-selected={explorerTab === 'enterprise'}
                onClick={() => setExplorerTab('enterprise')}
                className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  explorerTab === 'enterprise'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Enterprise Case Studies
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={explorerTab === 'edutech'}
                onClick={() => setExplorerTab('edutech')}
                className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  explorerTab === 'edutech'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Upcoming Workshops &amp; Internships
              </button>
            </div>
          </div>

          {explorerTab === 'enterprise' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {CASE_STUDIES.map((study) => (
                <article
                  key={study.id}
                  className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7 flex flex-col justify-between gap-6"
                >
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
                      <span className="font-semibold text-blue-700">{study.serviceCategory}</span>
                      <span aria-hidden="true">·</span>
                      <span>{study.sector}</span>
                      <span aria-hidden="true">·</span>
                      <span>{study.location}</span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 leading-snug">{study.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{study.challenge}</p>

                    <div className="pt-3 border-t border-slate-100">
                      <div className="text-base font-bold text-slate-900 font-mono tabular-nums">
                        {study.outcomeMetric}
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {study.outcomeDetail}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
                    <p className="text-xs text-slate-500 font-mono">{study.stack.join(' / ')}</p>
                    <button
                      type="button"
                      onClick={() => onOpenQuote(study.serviceCategory)}
                      className="text-sm font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
                    >
                      Request Similar Solution
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingPrograms.map((program) => {
                const seatsLeft = Math.max(0, program.seatsTotal - program.seatsFilled);
                return (
                  <article
                    key={program.id}
                    className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between gap-5"
                  >
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
                        <span className="font-semibold text-blue-700">{program.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{program.domain}</span>
                        <span aria-hidden="true">·</span>
                        <span>{program.mode}</span>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 leading-snug">
                        {program.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{program.summary}</p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                      <div className="text-xs text-slate-600 space-y-0.5 tabular-nums">
                        <div className="font-semibold text-slate-900">
                          Starts {program.nextBatch} · {program.duration}
                        </div>
                        <div>
                          Fee ₹{program.feeInr.toLocaleString('en-IN')} · {seatsLeft} seats
                          remaining
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onEnrollProgram(program)}
                        className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                      >
                        Enroll Now
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={() => onNavigate(explorerTab === 'enterprise' ? 'enterprise' : 'edutech')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer"
            >
              {explorerTab === 'enterprise'
                ? 'View All Enterprise Software Capabilities'
                : 'Browse Full Filterable Program Catalog'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Partner Universities & Enterprise Clients Strip */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
              <div>
                <p className="text-sm font-semibold text-blue-600 mb-1">Academic Network</p>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Partner Universities &amp; Engineering Colleges
                </h2>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('collaborations')}
                className="text-sm font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
              >
                Explore Institutional MoUs
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-slate-200">
              {partners.slice(0, 8).map((partner) => (
                <div
                  key={partner.id}
                  className="p-5 border-r border-b border-slate-200 bg-white hover:bg-slate-50 transition-colors"
                >
                  <p className="text-sm font-bold text-slate-900 leading-snug">{partner.name}</p>
                  <p className="text-xs text-slate-500 mt-1.5">
                    {partner.city} · {partner.partnershipType}
                  </p>
                  <p className="text-xs font-mono text-slate-600 mt-2 tabular-nums">
                    {partner.studentsTrained.toLocaleString('en-IN')} students trained
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <p className="text-sm font-semibold text-slate-500 mb-4">
              Selected Enterprise Clients &amp; R&amp;D Engagements
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ENTERPRISE_CLIENTS.map((client) => (
                <div
                  key={client.name}
                  className="px-5 py-4 rounded-lg border border-slate-200 bg-slate-50/70 flex flex-col justify-center"
                >
                  <span className="text-sm font-bold text-slate-900">{client.name}</span>
                  <span className="text-xs text-slate-500 mt-0.5">{client.sector}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Student Placement Success Stories */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-blue-600 mb-2">Verified Career Outcomes</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight text-balance">
                Student Placement Success Stories Across Hyderabad&apos;s IT Corridor
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('verify')}
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            >
              Verify Student Credentials
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {PLACEMENT_STORIES.map((story) => (
              <figure
                key={story.id}
                className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between gap-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-semibold text-slate-900">{story.placedCompany}</span>
                    <span className="font-mono font-semibold text-blue-700 tabular-nums">
                      {story.packageRange}
                    </span>
                  </div>
                  <Quote className="w-5 h-5 text-slate-300" aria-hidden="true" />
                  <blockquote className="text-sm text-slate-700 leading-relaxed">
                    &ldquo;{story.quote}&rdquo;
                  </blockquote>
                </div>

                <figcaption className="pt-4 border-t border-slate-100">
                  <div className="text-sm font-bold text-slate-900">{story.studentName}</div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    {story.role} · {story.location}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    {story.college} · {story.programCompleted}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
