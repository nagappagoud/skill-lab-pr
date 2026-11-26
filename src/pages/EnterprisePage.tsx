import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { ASSET_IMAGES, CASE_STUDIES, ENTERPRISE_SERVICES } from '../data/seedData';
import { EnterpriseServiceCategory } from '../types';
import { SafeImage } from '../components/SafeImage';

interface EnterprisePageProps {
  onOpenQuote: (category?: EnterpriseServiceCategory) => void;
}

export const EnterprisePage: React.FC<EnterprisePageProps> = ({ onOpenQuote }) => {
  return (
    <div>
      {/* Enterprise Hero Header */}
      <section className="bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            <div className="lg:col-span-7 flex flex-col justify-between gap-8">
              <div className="space-y-5">
                <p className="text-sm font-medium text-blue-400">
                  Enterprise Software Engineering · HITEC City Delivery Center
                </p>
                <h1 className="text-[clamp(2rem,3.6vw,3.25rem)] font-extrabold tracking-tight leading-[1.1] text-white text-balance">
                  Client-Oriented Software, SAP S/4HANA, ServiceNow &amp; Industrial R&amp;D
                </h1>
                <p className="text-base text-slate-300 leading-relaxed max-w-2xl">
                  Shreevedha Solutions partners with mid-market enterprises, pharma manufacturers,
                  financial institutions, and SaaS founders to build reliable digital platforms and
                  automate mission-critical ERP and IT operations.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onOpenQuote()}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                >
                  Request Project Quote
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="#enterprise-capabilities"
                  className="px-4 py-3 text-sm font-semibold text-slate-200 hover:text-white transition-colors whitespace-nowrap"
                >
                  Review Practice Areas
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-xl overflow-hidden border border-slate-700 h-full min-h-[260px]">
                <SafeImage
                  src={ASSET_IMAGES.enterpriseEngineering}
                  alt="Shreevedha enterprise software engineers reviewing system architecture"
                  fallbackTitle="Enterprise Architecture Practice — Hyderabad"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Service Capabilities Catalog */}
      <section id="enterprise-capabilities" className="py-16 lg:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-sm font-semibold text-blue-600 mb-2">Core Engineering Practices</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight text-balance">
              Four Dedicated Delivery Practices Built for Measurable ROI
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {ENTERPRISE_SERVICES.map((service) => (
              <article
                key={service.id}
                className="bg-white border border-slate-200 rounded-xl p-7 flex flex-col justify-between gap-6"
              >
                <div className="space-y-4">
                  <div className="flex items-baseline justify-between gap-4 border-b border-slate-100 pb-4">
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                      <span className="font-mono text-blue-600 mr-2">{service.index}</span>
                      {service.headline}
                    </h3>
                    <span className="text-xs font-mono text-slate-500 whitespace-nowrap shrink-0 tabular-nums">
                      {service.typicalTimeline}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">{service.summary}</p>

                  {/* Clean unboxed tech stack metadata */}
                  <div className="pt-1">
                    <p className="text-xs font-semibold text-slate-500 mb-1.5">
                      Primary Technology Stack
                    </p>
                    <p className="text-xs font-mono text-slate-800 leading-relaxed">
                      {service.techStack.join(' · ')}
                    </p>
                  </div>

                  <div className="pt-2">
                    <p className="text-xs font-semibold text-slate-500 mb-2">Key Deliverables</p>
                    <ul className="space-y-2">
                      {service.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                          <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-xs text-slate-500">{service.engagementModel}</p>
                    <p className="text-xs font-semibold text-slate-900 mt-0.5">
                      {service.highlightMetric}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onOpenQuote(service.category)}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-slate-900 hover:bg-blue-600 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Request Project Quote
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Industrial R&D Spotlight & Delivery Governance */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            <div className="lg:col-span-5">
              <div className="rounded-xl overflow-hidden border border-slate-200 h-full min-h-[260px]">
                <SafeImage
                  src={ASSET_IMAGES.industrialIotRd}
                  alt="Shreevedha Industrial IoT and R&D automation hardware lab"
                  fallbackTitle="Industrial IoT & Automation R&D Lab"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <p className="text-sm font-semibold text-blue-600">
                  Industrial R&amp;D &amp; Execution Governance
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight text-balance">
                  Predictable Sprint Delivery Backed by Hyderabad&apos;s Deep Engineering Talent
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Whether modernizing legacy SAP modules, automating ServiceNow CMDB discovery, or
                  prototyping edge IoT hardware for industrial estates in Telangana, every project
                  follows fixed architectural milestones, bi-weekly demos, and documented IP
                  ownership.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-slate-200">
                <div>
                  <div className="text-lg font-bold text-slate-900 font-mono">01. Discovery</div>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    Architecture blueprint, integration audit, and milestone cost estimate within 5
                    business days.
                  </p>
                </div>
                <div>
                  <div className="text-lg font-bold text-slate-900 font-mono">02. Execution</div>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    Dedicated pod of senior engineers with fortnightly staging builds and automated
                    QA checks.
                  </p>
                </div>
                <div>
                  <div className="text-lg font-bold text-slate-900 font-mono">03. SLA Support</div>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    Zero-downtime deployment, production monitoring, and structured L2/L3 handover.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quantified Enterprise Proof */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-sm font-semibold text-blue-600 mb-1">Client Impact</p>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Recent Enterprise Deployments
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onOpenQuote()}
              className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors whitespace-nowrap self-start sm:self-auto cursor-pointer"
            >
              Start a Scope Estimate
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CASE_STUDIES.map((cs) => (
              <div
                key={cs.id}
                className="bg-white border border-slate-200 rounded-xl p-6 space-y-3"
              >
                <div className="flex items-center justify-between gap-4 text-xs text-slate-500">
                  <span className="font-semibold text-slate-900">{cs.client}</span>
                  <span>{cs.location}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900">{cs.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{cs.outcomeDetail}</p>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-4">
                  <span className="text-sm font-bold text-blue-700 font-mono tabular-nums">
                    {cs.outcomeMetric}
                  </span>
                  <span className="text-xs font-mono text-slate-500">{cs.stack.slice(0, 3).join(' · ')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
