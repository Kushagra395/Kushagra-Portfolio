import React from 'react';

// data should be an array of weeks, where each week is an array of 7 integers (levels 0-4)
// e.g. [ [0,1,0,3,4,0,0], [1,0,0,0,2,0,0], ... ]
export default function ActivityMap({ platform, data }) {
  // If no data provided or empty, render a placeholder skeleton or message
  if (!data || data.length === 0) {
    return (
      <div className="w-full flex items-center justify-center p-12 text-gray-500 font-medium">
        Loading real {platform} activity...
      </div>
    );
  }

  // Level colors mapped identically to the original beautiful #1DCD9F palette
  const getColor = (level) => {
    switch (level) {
      case 1: return 'rgba(29, 205, 159, 0.3)';
      case 2: return 'rgba(29, 205, 159, 0.5)';
      case 3: return 'rgba(29, 205, 159, 0.8)';
      case 4: return 'rgba(29, 205, 159, 1)';
      default: return '#1e1e1e'; // empty cell
    }
  };

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <div className="w-full overflow-x-auto custom-scrollbar pb-6 pt-2 select-none">
      <div className="min-w-max">
        {/* Months header */}
        <div className="flex justify-between text-xs text-gray-500 mb-3 px-6 font-semibold uppercase tracking-widest">
          {months.map((month, idx) => (
            <span key={`${month}-${idx}`}>{month}</span>
          ))}
        </div>
        
        {/* Heatmap Grid */}
        <div className="flex gap-1.5 px-6">
          {data.map((week, wIndex) => (
            <div key={wIndex} className="flex flex-col gap-1.5">
              {week.map((level, dIndex) => (
                <div
                  key={`${wIndex}-${dIndex}`}
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-sm hover:ring-1 hover:ring-white transition-all cursor-pointer"
                  style={{ backgroundColor: getColor(level) }}
                  title={`${platform} Activity Level: ${level}`}
                />
              ))}
            </div>
          ))}
        </div>
        
        {/* Legend */}
        <div className="flex justify-end items-center gap-2 text-xs text-gray-500 mt-5 pr-6 uppercase tracking-wider font-semibold">
          <span>Less</span>
          <div className="flex gap-1.5">
            <div className="w-3.5 h-3.5 rounded-sm shadow-sm" style={{ backgroundColor: '#1e1e1e' }}></div>
            <div className="w-3.5 h-3.5 rounded-sm shadow-sm" style={{ backgroundColor: getColor(1) }}></div>
            <div className="w-3.5 h-3.5 rounded-sm shadow-sm" style={{ backgroundColor: getColor(2) }}></div>
            <div className="w-3.5 h-3.5 rounded-sm shadow-sm" style={{ backgroundColor: getColor(3) }}></div>
            <div className="w-3.5 h-3.5 rounded-sm shadow-sm" style={{ backgroundColor: getColor(4) }}></div>
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
