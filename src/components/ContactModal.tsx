import React, { useState } from 'react';
import { CheckCircle2, Mail, MapPin, Phone, X } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';
import { EnterpriseServiceCategory } from '../types';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type InquiryTab = 'enterprise' | 'academic';

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const { addB2BLead, addMoUProposal } = useAppData();

  const [tab, setTab] = useState<InquiryTab>('enterprise');
  const [organization, setOrganization] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [topic, setTopic] = useState<EnterpriseServiceCategory | 'General Corporate Inquiry'>(
    'General Corporate Inquiry'
  );
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [refCode, setRefCode] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!organization.trim() || !name.trim()) {
      setError('Please enter your name and organization or institution.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!message.trim()) {
      setError('Please include a short message detailing how we can help.');
      return;
    }
    setError('');

    if (tab === 'enterprise') {
      const lead = addB2BLead({
        companyName: organization.trim(),
        contactPerson: name.trim(),
        email: email.trim(),
        phone: phone.trim() || '+91 40 0000 0000',
        serviceCategory: topic,
        estimatedTimeline: 'To be discussed',
        currency: 'INR',
        budgetRange: 'Custom Estimate',
        projectBrief: message.trim(),
        source: 'Contact Drawer',
      });
      setRefCode(lead.referenceCode);
    } else {
      const mou = addMoUProposal({
        institutionName: organization.trim(),
        contactName: name.trim(),
        designation: 'Academic / Placement Coordinator',
        email: email.trim(),
        phone: phone.trim() || '+91 40 0000 0000',
        city: 'Hyderabad / Telangana',
        studentStrength: 'To be confirmed',
        tracks: ['University MoU', 'Workshops & Internships'],
        notes: message.trim(),
      });
      setRefCode(mou.referenceCode);
    }
  };

  const resetAndClose = () => {
    setOrganization('');
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setError('');
    setRefCode('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <div className="bg-white border border-slate-200 rounded-xl w-full max-w-2xl shadow-xl overflow-hidden my-auto">
        <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-slate-200 bg-slate-50">
          <div>
            <p className="text-xs font-medium text-blue-600 mb-1">
              Shreevedha Solutions · Hyderabad Headquarters
            </p>
            <h2 id="contact-modal-title" className="text-lg font-bold text-slate-900">
              Get in Touch With Our Team
            </h2>
          </div>
          <button
            type="button"
            onClick={resetAndClose}
            aria-label="Close contact dialog"
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200/70 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5">
          {/* Left info column */}
          <div className="md:col-span-2 bg-slate-900 text-slate-200 p-6 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white">Direct Office Channels</h3>
              <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>
                    Level 6, Quadrant Towers, Madhapur, HITEC City, Hyderabad, Telangana 500081
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="font-mono">+91 40 4852 9100</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="font-mono">contact@shreevedhasolutions.in</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 text-xs text-slate-400">
              <p className="font-medium text-slate-200 mb-1">Office Hours (IST)</p>
              <p>Monday – Saturday · 9:30 AM to 6:30 PM</p>
            </div>
          </div>

          {/* Right form column */}
          <div className="md:col-span-3 p-6">
            {refCode ? (
              <div className="space-y-4 py-4">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-emerald-50 border border-emerald-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-emerald-900">Message Received</p>
                    <p className="text-sm text-emerald-800 mt-1">
                      Reference <span className="font-mono font-semibold">{refCode}</span> has been
                      routed to our Hyderabad desk and logged in the Admin Portal.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="w-full py-2.5 px-4 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setTab('enterprise')}
                    className={`py-2 px-3 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                      tab === 'enterprise'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Enterprise IT Inquiry
                  </button>
                  <button
                    type="button"
                    onClick={() => setTab('academic')}
                    className={`py-2 px-3 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                      tab === 'academic'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    College / Edu-Tech
                  </button>
                </div>

                {error && (
                  <div className="px-3.5 py-2.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    {tab === 'enterprise' ? 'Company Name *' : 'University / College Name *'}
                  </label>
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder={
                      tab === 'enterprise'
                        ? 'e.g., Cyberabad FinServe'
                        : 'e.g., Osmania University Engineering Cell'
                    }
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98480 00000"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Work / Institutional Email *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@organization.in"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                {tab === 'enterprise' && (
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Primary Practice Area
                    </label>
                    <select
                      value={topic}
                      onChange={(e) =>
                        setTopic(
                          e.target.value as
                            | EnterpriseServiceCategory
                            | 'General Corporate Inquiry'
                        )
                      }
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="General Corporate Inquiry">General Corporate Inquiry</option>
                      <option value="Custom Web & Mobile App Development">
                        Custom Web &amp; Mobile App Development
                      </option>
                      <option value="SAP Enterprise Solutions">SAP Enterprise Solutions</option>
                      <option value="ServiceNow Solutions">ServiceNow Solutions</option>
                      <option value="Industrial & R&D Automation">
                        Industrial &amp; R&amp;D Automation
                      </option>
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share a brief overview of your project timeline, workshop schedule, or inquiry..."
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
