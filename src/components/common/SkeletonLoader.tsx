import React from 'react';

export const SkeletonLoader: React.FC<{ className?: string }> = ({ className = 'h-24 w-full' }) => {
  return (
    <div
      className={`animate-pulse bg-slate-800/60 backdrop-blur-md rounded-3xl border border-white/5 ${className}`}
    />
  );
};

export const WeatherSkeletonPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      <SkeletonLoader className="h-44 w-full rounded-3xl" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SkeletonLoader className="h-96 md:col-span-2 rounded-3xl" />
        <SkeletonLoader className="h-96 rounded-3xl" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SkeletonLoader className="h-80 rounded-3xl" />
        <SkeletonLoader className="h-80 rounded-3xl" />
      </div>
    </div>
  );
};
