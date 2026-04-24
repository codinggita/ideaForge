import React from 'react';

export default function UpcomingMeetings() {
  return (
    <section className="bg-surface-container-lowest rounded-xl p-6 shadow-[0_4px_20px_rgba(2,36,72,0.03)] border border-white">
      <h4 className="text-sm font-bold text-primary tracking-tight mb-6">Upcoming Meetings</h4>
      <div className="space-y-6">
        {/* Timeline 1 */}
        <div className="flex gap-4 group">
          <div className="flex flex-col items-center">
            <div className="w-2.5 h-2.5 rounded-full bg-secondary border-[2.5px] border-blue-100 ring-4 ring-blue-50/50"></div>
            <div className="w-[2px] flex-1 bg-slate-100 my-1"></div>
          </div>
          <div className="flex-1 pb-4">
            <div className="flex justify-between items-start">
              <p className="text-xs font-bold text-primary">Client Demo: Fintech Corp</p>
              <span className="text-[10px] font-bold text-on-surface-variant">11:30 AM</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex -space-x-1.5">
                <img className="w-5 h-5 rounded-full border border-white" data-alt="round profile avatar icon" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBY9-sGo7j4ZhXR93gOV2I8yddH1qTRZTTAO-dbwhznOqVaqwJGalaWhg18OECG1Je1uDPx5w7TIGCD-jC8NfU4aasA-0UCTFcqKrY4QWKHztIllLVZ4R4Z_I8E4a-ziTT0ZYwX4fymkwHZ9-spvld-9S0GTst_CuRFY5qTlAoKMI-2xagn_TaKjJHdsT-FuHLtoS_xe1JYasXRnkmemW2bJV5jnNb0ghO91xMJoOxO_UR0bwWFDlZzb6VaB-cufyrMSaja-FpnOrg" />
                <img className="w-5 h-5 rounded-full border border-white" data-alt="round profile avatar icon" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwQnwnRcKJZ6Djh0kizF70956n-p6wmDsQHeqA5Y1yPebwVNY5TGLiiuaXpYM9DX9AhY0dmGa3I__KpLrp0OaSzJ4IHpNv_iqj2L8BQubZArfruFWCvrZ4_QOXfezarPWwxw2n3VLWOyDJTMOY3maGEF9W0vgWE8zSAvtqyxvzuqkVBHAn9esVS4svrWGP31AP42AF14KJsSpVchhb9sTzooLgOCpx2Xv7OHASxjcNnkpfexl5FK1nFARiN4GMaOF5vDpxePDhXoA" />
              </div>
              <span className="text-[10px] text-slate-400 font-medium">via Google Meet</span>
            </div>
          </div>
        </div>

        {/* Timeline 2 */}
        <div className="flex gap-4 group">
          <div className="flex flex-col items-center">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
            <div className="w-[2px] flex-1 bg-slate-100 my-1"></div>
          </div>
          <div className="flex-1 pb-4">
            <div className="flex justify-between items-start">
              <p className="text-xs font-bold text-primary">Quarterly Risk Assessment</p>
              <span className="text-[10px] font-bold text-on-surface-variant">02:00 PM</span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium mt-1">Room 4B • Financial Wing</p>
          </div>
        </div>

        {/* Timeline 3 */}
        <div className="flex gap-4 group">
          <div className="flex flex-col items-center">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <p className="text-xs font-bold text-primary">Internal Workshop: Valuation AI</p>
              <span className="text-[10px] font-bold text-on-surface-variant">04:30 PM</span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium mt-1">Design Studio</p>
          </div>
        </div>
      </div>
    </section>
  );
}
