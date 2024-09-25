// SkeletonLoader.js
import React from 'react';

const SkeletonLoader = () => {
  return (
    <div className="animate-pulse">
      <div className="h-6 bg-gray-300 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-5/6 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-4/5 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
    </div>
  );
};

export default SkeletonLoader;
