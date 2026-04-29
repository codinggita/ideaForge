import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Loader2, TrendingUp, CheckCircle2, AlertTriangle, Users } from 'lucide-react';
import DashboardLayout from '../components/dashboard/DashboardLayout';

// Mini donut chart component
function DonutChart({ data, colors, size = 160 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const total = data.reduce((sum, d) => sum + d.value, 0);
    if (total === 0) return;

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2 - 10;
    const innerRadius = radius * 0.6;
    let startAngle = -Math.PI / 2;

    ctx.clearRect(0, 0, size, size);

    data.forEach((segment, i) => {
      const sliceAngle = (segment.value / total) * 2 * Math.PI;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
      ctx.arc(centerX, centerY, innerRadius, startAngle + sliceAngle, startAngle, true);
      ctx.closePath();
      ctx.fillStyle = colors[i];
      ctx.fill();
      startAngle += sliceAngle;
    });

    // Center text
    ctx.fillStyle = '#243041';
    ctx.font = 'bold 24px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(total, centerX, centerY - 8);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px Inter, sans-serif';
    ctx.fillText('Total', centerX, centerY + 12);
  }, [data, colors, size]);

  return <canvas ref={canvasRef} width={size} height={size} />;
}

// Mini bar chart component
function BarChart({ data, width = 400, height = 180 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, width, height);

    if (data.length === 0) return;

    const maxVal = Math.max(...data.map((d) => d.count), 1);
    const barWidth = Math.min(40, (width - 40) / data.length - 10);
    const chartHeight = height - 40;

    data.forEach((d, i) => {
      const barHeight = (d.count / maxVal) * chartHeight;
      const x = 20 + i * (barWidth + 10);
      const y = chartHeight - barHeight;

      // Bar with rounded top
      const gradient = ctx.createLinearGradient(x, y, x, chartHeight);
      gradient.addColorStop(0, '#0B61A1');
      gradient.addColorStop(1, '#1E3A5F');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.roundRect(x, y, barWidth, barHeight, [4, 4, 0, 0]);
      ctx.fill();

      // Day label
      const dayLabel = new Date(d._id).toLocaleDateString([], { weekday: 'short' });
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(dayLabel, x + barWidth / 2, height - 5);

      // Count on top
      if (d.count > 0) {
        ctx.fillStyle = '#243041';
        ctx.font = 'bold 11px Inter, sans-serif';
        ctx.fillText(d.count, x + barWidth / 2, y - 6);
      }
    });
  }, [data, width, height]);

  return <canvas ref={canvasRef} width={width} height={height} />;
}

export default function ReportsPage() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const { data } = await axios.get('/api/reports');
        setReport(data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100">{error}</div>
      </DashboardLayout>
    );
  }

  const { projects, tasks, weeklyCompleted, teams } = report;

  const statCards = [
    {
      label: 'Completion Rate',
      value: `${tasks.completionRate}%`,
      icon: TrendingUp,
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      label: 'Tasks Completed',
      value: tasks.completed,
      icon: CheckCircle2,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'Overdue Tasks',
      value: tasks.overdue,
      icon: AlertTriangle,
      color: tasks.overdue > 0 ? 'text-red-600' : 'text-slate-500',
      bg: tasks.overdue > 0 ? 'bg-red-50' : 'bg-slate-50',
    },
    {
      label: 'Teams',
      value: teams.length,
      icon: Users,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
  ];

  const donutData = [
    { label: 'Planning', value: projects.planning },
    { label: 'Active', value: projects.active },
    { label: 'Completed', value: projects.completed },
  ];
  const donutColors = ['#94a3b8', '#0B61A1', '#22c55e'];

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-primary tracking-tight">Reports & Analytics</h1>
          <p className="text-sm text-slate-500 mt-1">Visualize your productivity and team performance</p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card) => (
            <div key={card.label} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center`}>
                  <card.icon className={`w-5 h-5 ${card.color}`} />
                </div>
              </div>
              <p className="text-2xl font-bold text-primary">{card.value}</p>
              <p className="text-xs text-slate-500 font-medium mt-1">{card.label}</p>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Project Status Donut */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="text-sm font-bold text-primary mb-6">Project Status Breakdown</h3>
            <div className="flex items-center justify-center gap-8">
              <DonutChart data={donutData} colors={donutColors} />
              <div className="space-y-3">
                {donutData.map((d, i) => (
                  <div key={d.label} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: donutColors[i] }} />
                    <span className="text-sm text-slate-600">{d.label}</span>
                    <span className="text-sm font-bold text-primary ml-auto">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Weekly Completed Bar Chart */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="text-sm font-bold text-primary mb-6">Tasks Completed This Week</h3>
            {weeklyCompleted.length > 0 ? (
              <div className="flex justify-center">
                <BarChart data={weeklyCompleted} />
              </div>
            ) : (
              <div className="flex items-center justify-center h-[180px] text-slate-400 text-sm">
                No tasks completed this week yet.
              </div>
            )}
          </div>
        </div>

        {/* Teams Summary */}
        {teams.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="text-sm font-bold text-primary mb-4">Team Overview</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {teams.map((team) => (
                <div key={team.name} className="flex items-center justify-between p-4 rounded-xl bg-[#f8fafc] border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#1E3A5F] to-[#0B61A1] flex items-center justify-center text-white">
                      <Users className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-semibold text-primary">{team.name}</span>
                  </div>
                  <span className="text-xs font-medium text-slate-500 bg-white px-2 py-1 rounded-md border border-slate-200">
                    {team.members} members
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
