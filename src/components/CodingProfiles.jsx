import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import fallbackCalendar from '../data/calendar.json';
import fallbackContest from '../data/contest.json';
import fallbackBadges from '../data/badges.json';
gsap.registerPlugin(ScrollTrigger);

const fetchWithFallback = async (url, fallback, timeout = 6000) => {
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    if (!response.ok) throw new Error('Network error');
    return await response.json();
  } catch (err) {
    console.warn(`Fetch using fallback for ${url}`);
    return fallback;
  }
};

// ── Calendar → heatmap grid (only past ~40 active weeks to avoid empty gaps) ──
function calendarToGrid(cal) {
  const dateMap = {};
  for (const [ts, count] of Object.entries(cal || {})) {
    const d = new Date(parseInt(ts) * 1000);
    const key = d.toISOString().slice(0, 10);
    dateMap[key] = (dateMap[key] || 0) + count;
  }
  const maxVal = Math.max(...Object.values(dateMap), 1);
  const today = new Date(); today.setHours(0, 0, 0, 0);

  // Find the first date that has activity to avoid giant empty gap
  const allDates = Object.keys(dateMap).sort();
  const firstActive = allDates.length > 0 ? new Date(allDates[0]) : new Date(today);
  firstActive.setDate(firstActive.getDate() - 7); // one week buffer before first activity

  // Align to Sunday
  const start = new Date(firstActive);
  while (start.getDay() !== 0) start.setDate(start.getDate() - 1);

  const weeks = []; let week = []; let cur = new Date(start);
  while (cur <= today) {
    const key = cur.toISOString().slice(0, 10);
    const count = dateMap[key] || 0;
    const r = count / maxVal;
    const level = count === 0 ? 0 : r < 0.25 ? 1 : r < 0.5 ? 2 : r < 0.75 ? 3 : 4;
    week.push({ level, date: key, count });
    if (week.length === 7) { weeks.push(week); week = []; }
    cur.setDate(cur.getDate() + 1);
  }
  if (week.length) {
    while (week.length < 7) week.push({ level: 0, date: '', count: 0 });
    weeks.push(week);
  }
  return weeks;
}

// ── Full-Width Heatmap (CSS Grid 1fr — fills container width) ─────────────────
function HeatGrid({ weeks, totalSub, maxStreak, currentStreak }) {
  const colors = ['#1e1e1e', 'rgba(29,205,159,0.2)', 'rgba(29,205,159,0.45)', 'rgba(29,205,159,0.75)', '#1DCD9F'];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const monthPos = [];
  let lastM = -1;
  weeks.forEach((w, wi) => {
    if (w[0]?.date) {
      const m = new Date(w[0].date).getMonth();
      if (m !== lastM) { monthPos.push({ wi, label: months[m] }); lastM = m; }
    }
  });

  const dayLabels = ['S','M','T','W','T','F','S'];

  return (
    <div className="w-full">
      {/* Streak info */}
      <div className="flex flex-wrap gap-6 text-sm text-gray-400 mb-4">
        <span>Submissions <strong className="text-white text-base">{totalSub}</strong></span>
        <span>Max.Streak <strong className="text-white text-base">{maxStreak}</strong></span>
        <span>Current.Streak <strong className="text-white text-base">{currentStreak}</strong></span>
      </div>

      {/* Month labels row — spans same as grid */}
      <div style={{ display: 'grid', gridTemplateColumns: `24px repeat(${weeks.length}, 1fr)`, gap: '3px', marginBottom: 4 }}>
        <div />{/* spacer for day-label column */}
        {weeks.map((_, wi) => {
          const ml = monthPos.find(m => m.wi === wi);
          return (
            <div key={wi} style={{ textAlign: 'center' }}>
              {ml && <span style={{ fontSize: 9, color: '#6b7280', whiteSpace: 'nowrap' }}>{ml.label}</span>}
            </div>
          );
        })}
      </div>

      {/* 7 rows (days) each using CSS grid columns */}
      {dayLabels.map((dayLabel, di) => (
        <div key={di} style={{ display: 'grid', gridTemplateColumns: `24px repeat(${weeks.length}, 1fr)`, gap: '3px', marginBottom: 3 }}>
          {/* Day label */}
          <div style={{ fontSize: 9, color: '#4b5563', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 4 }}>
            {di % 2 === 1 ? dayLabel : ''}
          </div>
          {/* Cells across all weeks */}
          {weeks.map((week, wi) => {
            const cell = week[di] || { level: 0, date: '', count: 0 };
            return (
              <div
                key={wi}
                title={cell.date ? `${cell.date}: ${cell.count} submission${cell.count !== 1 ? 's' : ''}` : ''}
                style={{
                  borderRadius: 3,
                  backgroundColor: colors[cell.level || 0],
                  cursor: 'pointer',
                  aspectRatio: '1',
                  transition: 'transform 0.1s, opacity 0.1s',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.4)'; e.currentTarget.style.zIndex = '10'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.zIndex = '1'; }}
              />
            );
          })}
        </div>
      ))}

      {/* Legend */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'flex-end', marginTop: 8, fontSize: 10, color: '#6b7280' }}>
        <span>Less</span>
        {colors.map((c, i) => <div key={i} style={{ width: 12, height: 12, backgroundColor: c, borderRadius: 2 }} />)}
        <span>More</span>
      </div>
    </div>
  );
}

// ── Area/Line Chart ────────────────────────────────────────────────────────────
function LineChart({ data, color }) {
  if (!data || data.length < 2) {
    return <div className="flex items-center justify-center h-full text-gray-700 text-sm animate-pulse">Loading chart…</div>;
  }
  const W = 400, H = 140;
  const min = Math.min(...data) - 40, max = Math.max(...data) + 40;
  const pts = data.map((v, i) => [
    ((i / (data.length - 1)) * (W - 24) + 12).toFixed(1),
    (H - ((v - min) / (max - min)) * (H - 24) - 12).toFixed(1),
  ]);
  const ptStr = pts.map(p => p.join(',')).join(' ');
  const [lx, ly] = pts[pts.length - 1];
  const lastVal = data[data.length - 1];
  const gid = `g${color.replace('#', '')}`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="w-full h-full">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path
        d={`M${pts[0].join(',')} ${pts.slice(1).map(p => `L${p.join(',')}`).join(' ')} L${lx},${H} L${pts[0][0]},${H} Z`}
        fill={`url(#${gid})`}
      />
      <polyline points={ptStr} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={lx} cy={ly} r="4.5" fill={color} />
      <rect x={parseFloat(lx) - 24} y={parseFloat(ly) - 20} width="48" height="17" rx="4" fill="#0d0d0d" />
      <text x={lx} y={parseFloat(ly) - 7} textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">{lastVal}</text>
    </svg>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function CodingProfiles() {
  const [activePlat, setActivePlat] = useState('CodeChef');
  const [lcStats, setLcStats]       = useState(null);
  const [lcContest, setLcContest]   = useState(null);
  const [heatmap, setHeatmap]       = useState([]);
  const [badges, setBadges]         = useState([]);
  const sectionRef = useRef(null);

  const STATS = {
    totalQuestions:  256,
    totalActiveDays: 134,
    totalContests:   12,
    contests: { LeetCode: 3, CodeChef: 9 },
    maxStreak: 27,
    currentStreak: 3,
    awards: [
      { icon: '🔥', name: 'Hot Streak',   color: '#FF6B35' },
      { icon: '🏆', name: 'Trophy',        color: '#FFD700' },
      { icon: '🗓️', name: '50 Days 2025', color: '#4ECDC4' },
      { icon: '⭐', name: '7-Day Jul',     color: '#FFD700' },
    ],
    ccHistory: [1200, 1260, 1310, 1370, 1415, 1448, 1468, 1490, 1503],
    ccRating:  1503,
    ccLatest:  { date: '25 Mar 2026', contest: 'Starters 231 (Rated)', rank: 1602 },
  };

  useEffect(() => {
    Promise.all([
      fetchWithFallback('https://alfa-leetcode-api.onrender.com/Kushagra395/calendar', fallbackCalendar),
      fetchWithFallback('https://alfa-leetcode-api.onrender.com/userContestRankingInfo/Kushagra395', fallbackContest),
    ]).then(([r1, r2]) => {
      if (r1 && r1.submissionCalendar) {
        let cal = {};
        try { 
          cal = typeof r1.submissionCalendar === 'string' ? JSON.parse(r1.submissionCalendar) : r1.submissionCalendar;
        } catch (e) {}
        setLcStats({ ...r1, submissionCalendar: cal });
        setHeatmap(calendarToGrid(cal));
      }
      if (r2 && r2.userContestRanking) setLcContest(r2);
    });

    // Fetch real LeetCode badges via alfa-leetcode-api (unblocks CORS and IP limits when run in browser)
    fetchWithFallback('https://alfa-leetcode-api.onrender.com/Kushagra395/badges', fallbackBadges)
      .then(data => {
        if (data && data.badges && data.badges.length > 0) {
          setBadges(data.badges);
        }
      });
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.cp-card',
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.07, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', once: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const lcRating  = lcContest?.userContestRanking ? Math.round(lcContest.userContestRanking.rating) : 1546;
  const lcHistory = lcContest?.userContestRankingHistory?.filter(h => h.attended).map(h => Math.round(h.rating)) || [1410, 1518, 1546];
  const totalSub  = lcStats ? Object.values(lcStats.submissionCalendar || {}).reduce((a, b) => a + b, 0) : 277;
  const ratingColor = activePlat === 'LeetCode' ? '#FFA116' : '#d4a96a';
  const C = 'bg-[#111] border border-gray-800/60 rounded-2xl';

  return (
    <section id="coding-profiles" ref={sectionRef} className="relative z-10 text-white py-20 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-5">

        {/* Heading */}
        <div className="cp-card text-center mb-2">
          <h2 className="text-4xl sm:text-5xl font-black mb-2">
            Coding <span className="text-[#1DCD9F]">Profiles</span>
          </h2>
          <p className="text-gray-400 text-base">Live activity · Ratings · Stats from Codolio · LeetCode · CodeChef</p>
        </div>

        {/* ══ ROW 1: Full-Width Heatmap (no empty leading gap) ══════════════════ */}
        <div className={`cp-card ${C} p-6`}>
          {heatmap.length > 0
            ? <HeatGrid weeks={heatmap} totalSub={totalSub} maxStreak={STATS.maxStreak} currentStreak={STATS.currentStreak} />
            : <div className="h-28 animate-pulse bg-gray-800 rounded-xl" />
          }
        </div>

        {/* ══ ROW 2: 3 Cards — Total Contests | Total Questions | Total Active Days ══ */}
        <div className="grid grid-cols-3 gap-5">

          {/* Card 1: Total Contests (with LC/CC toggle) */}
          <div className={`cp-card ${C} p-6 flex flex-col`}>
            <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold">Total Contests</p>
            <p className="text-6xl font-black mt-2 mb-4">{STATS.totalContests}</p>
            <div className="flex flex-col gap-2 mt-auto">
              {Object.entries(STATS.contests).map(([plat, cnt]) => {
                const isActive = activePlat === plat;
                return (
                  <button
                    key={plat}
                    onClick={() => setActivePlat(plat)}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${isActive ? 'ring-1 ring-[#1DCD9F] bg-[#1DCD9F]/10 text-[#1DCD9F]' : 'bg-[#1a1a1a] text-gray-400 hover:text-white hover:bg-[#222]'}`}
                  >
                    <span className="flex items-center gap-2">{plat === 'LeetCode' ? '🟡' : '⭐'} {plat}</span>
                    <span className="font-black text-xl" style={{ color: isActive ? '#1DCD9F' : '#555' }}>{cnt}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Card 2: Total Questions */}
          <div className={`cp-card ${C} p-6 flex flex-col justify-center`}>
            <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold">Total Questions</p>
            <p className="text-7xl font-black mt-3">{STATS.totalQuestions}</p>
          </div>

          {/* Card 3: Total Active Days */}
          <div className={`cp-card ${C} p-6 flex flex-col justify-center`}>
            <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold">Total Active Days</p>
            <p className="text-7xl font-black mt-3">{STATS.totalActiveDays}</p>
          </div>
        </div>

        {/* ══ ROW 3: Rating Graph (2/3) + Awards (1/3) ══════════════════════════ */}
        <div className="grid grid-cols-3 gap-5">

          {/* Rating Graph — 2/3 */}
          <div className={`cp-card col-span-2 ${C} p-6`}>
            <div className="flex items-start justify-between mb-1">
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold">
                  {activePlat} Contest Rating
                </p>
                <p className="text-5xl font-black mt-1" style={{ color: ratingColor }}>
                  {activePlat === 'LeetCode' ? lcRating : STATS.ccRating}
                </p>
                {activePlat === 'LeetCode' && lcContest?.userContestRanking && (
                  <p className="text-gray-500 text-xs mt-1">
                    Global #{lcContest.userContestRanking.globalRanking.toLocaleString()} ·
                    Top {lcContest.userContestRanking.topPercentage}% ·
                    Attended {lcContest.userContestRanking.attendedContestsCount}
                  </p>
                )}
                {activePlat === 'CodeChef' && (
                  <p className="text-gray-500 text-xs mt-1">
                    {STATS.ccLatest.date} · {STATS.ccLatest.contest} · Rank #{STATS.ccLatest.rank}
                  </p>
                )}
              </div>
              {activePlat === 'CodeChef' && <span className="text-2xl">⭐⭐</span>}
            </div>
            <div style={{ height: 170 }} className="mt-3">
              <LineChart
                data={activePlat === 'LeetCode' ? lcHistory : STATS.ccHistory}
                color={ratingColor}
              />
            </div>
            <div className="flex justify-between text-[10px] text-gray-600 mt-1 px-2">
              <span>{activePlat === 'LeetCode' ? '2025' : '2024'}</span>
              <span>2026</span>
            </div>
          </div>

          {/* Awards — 1/3 */}
          <div className={`cp-card ${C} p-6 flex flex-col`}>
            <div className="flex items-baseline gap-3 mb-5">
              <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold">Awards</p>
              <span className="text-2xl font-black">{badges.length > 0 ? badges.length : 4}</span>
            </div>

            {/* Real LeetCode badge images from API or verified fallback URLs */}
            <div className="flex flex-wrap gap-4 justify-center flex-1 items-center">
              {(badges.length > 0 ? badges.slice(0, 4) : [
                { id: 1, icon: 'https://leetcode.com/static/images/badges/dcc-2025-3.png', displayName: 'Mar LeetCoding Challenge' },
                { id: 2, icon: 'https://leetcode.com/static/images/badges/dcc-2025-2.png', displayName: 'Feb LeetCoding Challenge' },
                { id: 3, icon: 'https://leetcode.com/static/images/badges/dcc-2025-1.png', displayName: 'Jan LeetCoding Challenge' },
                { id: 4, icon: 'https://leetcode.com/static/images/badges/dcc-2024-12.png', displayName: 'Dec LeetCoding Challenge' }
              ]).map((badge, i) => {
                const iconUrl = badge.icon?.startsWith('http')
                  ? badge.icon
                  : `https://leetcode.com${badge.icon}`;
                return (
                  <div key={badge.id || i} className="flex flex-col items-center gap-2 group w-[60px]" title={badge.displayName}>
                    <img
                      src={iconUrl}
                      alt={badge.displayName}
                      className="w-14 h-14 object-contain group-hover:scale-110 transition-transform drop-shadow-xl"
                      onError={e => { e.target.style.display = 'none'; }}
                    />
                    <span className="text-[9px] text-gray-500 text-center leading-tight truncate w-full">{badge.displayName.replace(' LeetCoding Challenge', '')}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
