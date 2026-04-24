import React from 'react';

export default function TodaysTasks() {
  return (
    <section className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(2,36,72,0.03)]">
      <div className="px-6 py-5 border-b border-slate-50">
        <h4 className="text-sm font-bold text-primary tracking-tight">Today's Tasks</h4>
      </div>
      <div className="p-2">
        {/* Task Row 1 */}
        <div className="flex items-center gap-4 p-4 hover:bg-surface-container-low rounded-lg transition-colors">
          <input className="w-4 h-4 rounded text-secondary border-slate-300 focus:ring-secondary/20" type="checkbox" />
          <div className="flex-1">
            <p className="text-sm font-medium text-primary">Review Financial Projection V3</p>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-[10px] font-bold text-error uppercase tracking-wider">High Priority</span>
              <span className="text-[10px] text-on-surface-variant font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px]">schedule</span> 10:00 AM
              </span>
            </div>
          </div>
          <img className="w-6 h-6 rounded-full border border-slate-100 shadow-sm" data-alt="avatar with letter A on a light background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsXNvkcjY822e0tfEyExk6lOYHQeiQxxqqH6DDeIOWsWzxE-KkyK1BoWurM5HRnnKnB203iiHYmv-1Ep3xnf1K4iZOgFKdGCeyq9KCClchjFExlHvOK-w6YInpSfjOxyeR6yAu29ybND3mYoBjLfpymq1j8x_k6gzLMqLln8MA0-sPj6nBFHYo6_iEdRfIaxZk5XFo-kP-XcTB0lI0cW6-oviFOgU6GiqzALX8K3auP-XGBQGk1f7utMFsFLBxP_6GD2YZbFqhftM" />
        </div>

        {/* Task Row 2 */}
        <div className="flex items-center gap-4 p-4 hover:bg-surface-container-low rounded-lg transition-colors">
          <input className="w-4 h-4 rounded text-secondary border-slate-300 focus:ring-secondary/20" type="checkbox" />
          <div className="flex-1">
            <p className="text-sm font-medium text-primary">Team Sync - Q4 Strategy</p>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">Medium</span>
              <span className="text-[10px] text-on-surface-variant font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px]">schedule</span> 11:30 AM
              </span>
            </div>
          </div>
          <img className="w-6 h-6 rounded-full border border-slate-100 shadow-sm" data-alt="avatar with letter T on a blue background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJ8G3GGLRqJlKcsz8V-Sm3zpwvUjiQ2YrtGuS5Sk12HXaZv3pIKIzfDfckBEbxFDBuETK2_VO4fkksKVpeWL14WaBW2hmYfpIMZdBEooCnKkTuOY6xWukXFhFVmgHaaHorrwGJpM0C-ufBG3EQnCZMvtNhidtMWrBTXpmouBJUl9p4az9VuvjdPyKdu8uXsZMXYt-HaCLlq8G4i4mR8E7svPUOSap9fhNuKOBkxRy4zO7i69-OiKN5GX3Hocfb2zeImWTnfWm3M-Y" />
        </div>

        {/* Task Row 3 */}
        <div className="flex items-center gap-4 p-4 hover:bg-surface-container-low rounded-lg transition-colors opacity-60">
          <input defaultChecked className="w-4 h-4 rounded text-secondary border-slate-300 focus:ring-secondary/20" type="checkbox" />
          <div className="flex-1">
            <p className="text-sm font-medium text-primary line-through">Send Follow-up Email to Investors</p>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Low</span>
              <span className="text-[10px] text-on-surface-variant font-medium">Done at 08:45 AM</span>
            </div>
          </div>
          <img className="w-6 h-6 rounded-full border border-slate-100 shadow-sm" data-alt="avatar with letter A on a light background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_zW-3JALs5SPYAMh8JbXMoEh6CCEWndPDqU4jIPH-Ce_7E-iFrJy0ihNZboe3nYHn-Go8MwBdQTEuBz9VRAF33bR0-LYEyL4kpTWdL6jgnHDRoKcxDQavMbc1U5Q3LJEwyP7ahd5WvHybobDk3dchtzgjCRyEFqr9OgrDndwJkqlEt7VWcT-ZZsWncJlvxYkFjTFD49gY0dK4TTJPd6wa7cvCUVOQ8hzj9flNljyQxCT2EiOcbncvmJRXcdcYFvnRO3bPzhOH3WU" />
        </div>
      </div>
    </section>
  );
}
