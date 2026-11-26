import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, X } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';
import { B2BLead, EnterpriseServiceCategory } from '../types';

interface ProjectQuoteModalProps {
  isOpen: boolean;
  initialCategory?: EnterpriseServiceCategory;
  onClose: () => void;
  onViewAdmin?: () => void;
}

const SERVICE_CATEGORIES: EnterpriseServiceCategory[] = [
  'Custom Web & Mobile App Development',
  'SAP Enterprise Solutions',
  'ServiceNow Solutions',
  'Industrial & R&D Automation',
];

const TIMELINES = [
  'Immediate (Under 1 Month)',
  '1 – 3 Months',
  '3 – 6 Months',
  '6+ Months / Retainer',
];

const BUDGETS_INR = ['₹5L – ₹10L', '₹10L – ₹25L', '₹25L – ₹50L', '₹50L+'];
const BUDGETS_USD = ['$10K – $25K', '$25K – $60K', '$60K – $120K', '$120K+'];

export const ProjectQuoteModal: React.FC<ProjectQuoteModalProps> = ({
  isOpen,
  initialCategory,
  onClose,
  onViewAdmin,
}) => {
  const { addB2BLead } = useAppData();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceCategory, setServiceCategory] = useState<EnterpriseServiceCategory>(
    initialCategory || 'Custom Web & Mobile App Development'
  );
  const [estimatedTimeline, setEstimatedTimeline] = useState(TIMELINES[1]);
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [budgetRange, setBudgetRange] = useState(BUDGETS_INR[1]);
  const [projectBrief, setProjectBrief] = useState('');
  const [error, setError] = useState('');
  const [submittedLead, setSubmittedLead] = useState<B2BLead | null>(null);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setError('');
      setSubmittedLead(null);
      if (initialCategory) {
        setServiceCategory(initialCategory);
      }
    }
  }, [isOpen, initialCategory]);

  if (!isOpen) return null;

  const handleCurrencyChange = (nextCurrency: 'INR' | 'USD') => {
    setCurrency(nextCurrency);
    setBudgetRange(nextCurrency === 'INR' ? BUDGETS_INR[1] : BUDGETS_USD[1]);
  };

  const validateStep1 = () => {
    if (!companyName.trim() || !contactPerson.trim()) {
      setError('Please enter both Company Name and Contact Person.');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please provide a valid business email address.');
      return false;
    }
    if (phone.trim().length < 8) {
      setError('Please provide a valid phone number.');
      return false;
    }
    setError('');
    return true;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (projectBrief.trim().length < 15) {
      setError('Please provide a concise project brief (at least 15 characters).');
      return;
    }
    setError('');
    const created = addB2BLead({
      companyName: companyName.trim(),
      contactPerson: contactPerson.trim(),
      email: email.trim(),
      phone: phone.trim(),
      serviceCategory,
      estimatedTimeline,
      currency,
      budgetRange,
      projectBrief: projectBrief.trim(),
      source: 'Enterprise Quote Modal',
    });
    setSubmittedLead(created);
    setStep(3);
  };

  const resetAndClose = () => {
    setCompanyName('');
    setContactPerson('');
    setEmail('');
    setPhone('');
    setProjectBrief('');
    setSubmittedLead(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
    >
      <div className="bg-white border border-slate-200 rounded-xl w-full max-w-xl shadow-xl overflow-hidden my-auto">
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-slate-200 bg-slate-50">
          <div>
            <p className="text-xs font-medium text-blue-600 mb-1">
              Enterprise Solutions · Step {step} of 3
            </p>
            <h2 id="quote-modal-title" className="text-lg font-bold text-slate-900">
              {step === 3 ? 'Project Quote Request Received' : 'Request an Enterprise Project Quote'}
            </h2>
          </div>
          <button
            type="button"
            onClick={resetAndClose}
            aria-label="Close modal"
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200/70 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Bar */}
        <div className="grid grid-cols-3 h-1 bg-slate-100">
          <div className="bg-blue-600 transition-all" />
          <div className={step >= 2 ? 'bg-blue-600 transition-all' : 'bg-transparent'} />
          <div className={step === 3 ? 'bg-blue-600 transition-all' : 'bg-transparent'} />
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
              {error}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g., Deccan Lifesciences Pvt. Ltd."
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Contact Person *
                  </label>
                  <input
                    type="text"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    placeholder="e.g., Ramesh Naidu"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98480 00000"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Service Category
                </label>
                <select
                  value={serviceCategory}
                  onChange={(e) =>
                    setServiceCategory(e.target.value as EnterpriseServiceCategory)
                  }
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                >
                  {SERVICE_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
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
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer"
                >
                  Next: Scope &amp; Budget
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Estimated Timeline
                  </label>
                  <select
                    value={estimatedTimeline}
                    onChange={(e) => setEstimatedTimeline(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    {TIMELINES.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-sm font-medium text-slate-700">Budget Range</label>
                    <div className="inline-flex items-center p-0.5 bg-slate-100 rounded-md text-xs">
                      <button
                        type="button"
                        onClick={() => handleCurrencyChange('INR')}
                        className={`px-2 py-0.5 rounded font-medium cursor-pointer ${
                          currency === 'INR'
                            ? 'bg-white text-slate-900 shadow-xs'
                            : 'text-slate-600'
                        }`}
                      >
                        INR
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCurrencyChange('USD')}
                        className={`px-2 py-0.5 rounded font-medium cursor-pointer ${
                          currency === 'USD'
                            ? 'bg-white text-slate-900 shadow-xs'
                            : 'text-slate-600'
                        }`}
                      >
                        USD
                      </button>
                    </div>
                  </div>
                  <select
                    value={budgetRange}
                    onChange={(e) => setBudgetRange(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 tabular-nums"
                  >
                    {(currency === 'INR' ? BUDGETS_INR : BUDGETS_USD).map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Project Brief &amp; Technical Requirements *
                </label>
                <textarea
                  rows={4}
                  value={projectBrief}
                  onChange={(e) => setProjectBrief(e.target.value)}
                  placeholder="Describe your target system, integrations (e.g., SAP ECC/S4HANA, ServiceNow modules, mobile platforms, or IoT devices), and key milestones..."
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setError('');
                    setStep(1);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer"
                >
                  Submit Quote Request
                </button>
              </div>
            </form>
          )}

          {step === 3 && submittedLead && (
            <div className="space-y-5">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-emerald-50 border border-emerald-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-emerald-900">
                    Inquiry Logged in Enterprise Pipeline
                  </p>
                  <p className="text-sm text-emerald-800 mt-1">
                    Our Hyderabad solutions engineering team will review your requirements and reach
                    out within 1 business day.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm border border-slate-200 rounded-lg p-4 bg-slate-50">
                <div>
                  <span className="block text-xs text-slate-500">Reference ID</span>
                  <span className="font-mono font-semibold text-slate-900">
                    {submittedLead.referenceCode}
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-slate-500">Budget Estimate</span>
                  <span className="font-mono font-semibold text-slate-900 tabular-nums">
                    {submittedLead.budgetRange}
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="block text-xs text-slate-500">Service Track</span>
                  <span className="font-medium text-slate-900">
                    {submittedLead.serviceCategory}
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
                    Inspect in Admin Portal
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
