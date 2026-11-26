import React from 'react';
import { RouteView } from '../types';

interface FooterProps {
  onNavigate: (view: RouteView) => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenContact }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-2 space-y-4">
            <div className="text-lg font-bold tracking-tight text-white">
              Shreevedha Solutions India Private Limited
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              Enterprise software engineering, SAP &amp; ServiceNow delivery, and industry-aligned
              university skill collaborations headquartered in Hyderabad, Telangana.
            </p>
            <div className="text-sm text-slate-400 space-y-1 pt-2">
              <p className="text-slate-200 font-medium">Hyderabad Corporate Headquarters</p>
              <p>Level 6, Quadrant Towers, Madhapur, HITEC City</p>
              <p>Hyderabad, Telangana — 500081, India</p>
              <p className="pt-1 font-mono text-xs text-slate-400">
                contact@shreevedhasolutions.in · +91 40 4852 9100
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Divisions &amp; Portals</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('enterprise')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Enterprise Software Solutions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('edutech')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Edu-Tech Courses &amp; Internships
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('collaborations')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  University &amp; College MoUs
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('verify')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Verify Digital Certificate
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('admin')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Internal Admin Portal
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Connect With Us</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Need a custom project estimate, SAP/ServiceNow consultation, or an institutional MoU
              proposal for your college?
            </p>
            <button
              type="button"
              onClick={onOpenContact}
              className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              Schedule a Discussion
            </button>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} Shreevedha Solutions India Private Limited. All rights
            reserved.
          </p>
          <p className="font-mono">Registered in Hyderabad, Telangana · ISO-Aligned Delivery</p>
        </div>
      </div>
    </footer>
  );
};
