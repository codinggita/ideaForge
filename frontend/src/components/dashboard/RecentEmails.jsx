import React from 'react';
import { Link } from 'react-router-dom';

export default function RecentEmails() {
  return (
    <section className="bg-surface-container-lowest rounded-xl p-6 shadow-[0_4px_20px_rgba(2,36,72,0.03)] border border-white">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-sm font-bold text-primary tracking-tight">Recent Emails</h4>
        <Link to="#" className="text-[10px] font-bold text-secondary uppercase tracking-widest flex items-center gap-1">
          Open Gmail <span className="material-symbols-outlined text-[14px]">open_in_new</span>
        </Link>
      </div>
      <div className="space-y-5">
        {/* Email Row 1 */}
        <div className="flex items-start gap-3">
          <img className="w-8 h-8 rounded-full shadow-sm" data-alt="circular profile icon for Morgan Chase" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkFfm_bfcq_yn5YyrCK8HszGFA4l0o09O4NANmcEq1lJZBXVrCPX9hcGDK6j78ea8HaCJLTQdYKNFGrRj0GTgArbCLJQf--lHJfWJ55NVzOqGzbGerppVO3PV6dNTz3aZ0wthXhxTCbuUZ2TVl7cQGMxcU8uVRqU1UmId9fxc9yUWruglT4en3d4-2A4pGpWWkN4lMG7Qk1RKbo8cyTOmzdjwEJsgnB7BQc8XfEenb66qxSrQi-M9_aTsCyRB57UvXf1IEZ7bPWW4" />
          <div className="flex-1">
            <div className="flex justify-between items-baseline">
              <p className="text-xs font-bold text-primary">Morgan Chase</p>
              <span className="text-[10px] text-on-surface-variant">08:42 AM</span>
            </div>
            <p className="text-[11px] font-semibold text-primary truncate mt-0.5">Investment Deck Feedback</p>
            <p className="text-[10px] text-slate-400 truncate mt-0.5">Hi Arjun, I've reviewed the latest projections and have some thoughts...</p>
          </div>
        </div>

        {/* Email Row 2 */}
        <div className="flex items-start gap-3">
          <img className="w-8 h-8 rounded-full shadow-sm" data-alt="circular profile icon for Sarah Lee" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPNUAW858IWqyDNhFG_mRtDkuKqvBbSrzNseOuh1Ov8OLGk-mgI8vlCQcT3EwxIAiK7QPMhTh_DYaynSYVg6xGXanubQX8UUHbtQVB8TVjKl0JJkhRyxaTPoifpZVHHX-U7uNa5UMHS80OqMpB7vknOJCoJgW3JwQmQKB9TY4-i2puRlDIB8dPYHZHhrtNAsHTp4E0o_fZTTyABNrES-mu4PO4eAYYqF_7jO5QIHST-vmzHqFZsedX_XI_zHnI_iwEzqrZQD2eUJU" />
          <div className="flex-1">
            <div className="flex justify-between items-baseline">
              <p className="text-xs font-bold text-primary">Sarah Lee</p>
              <span className="text-[10px] text-on-surface-variant">Yesterday</span>
            </div>
            <p className="text-[11px] font-semibold text-primary truncate mt-0.5">Onboarding Documents</p>
            <p className="text-[10px] text-slate-400 truncate mt-0.5">Please sign the attached NDA for the Project Skyfall evaluation.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
