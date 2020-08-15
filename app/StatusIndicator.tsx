import React from 'react';

type Status = 'CRITICAL' | 'CAUTION' | 'SUCCESS' | 'UNKNOWN';

function statusToColor(status: Status) {
  if (status === 'SUCCESS') {
    return '#48bb78'; // bg-green-500
  }

  if (status === 'CRITICAL') {
    return '#e53e3e'; // bg-red-600
  }

  if (status === 'CAUTION') {
    return '#ecc94b'; // bg-yellow-500
  }

  return '#a0aec0'; // bg-gray-500
}

const gapSize = 1;

interface StatusIndicatorProps {
  checks: Array<Status>;
}
export function StatusIndicator({ checks }: StatusIndicatorProps) {
  const gap = checks.length > 1 ? gapSize : 0;
  const percent = 100 / checks.length - gap;

  const size = 36.8;

  return (
    <div>
      <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r="15.91549430918954"
          fill="#fff"
        ></circle>
        {checks.map((status, index) => (
          <circle
            cx={size / 2}
            cy={size / 2}
            r="15.91549430918954"
            fill="transparent"
            stroke={statusToColor(status)}
            stroke-width="5"
            stroke-dasharray={`${percent} ${100 - percent}`}
            stroke-dashoffset={(percent + gap) * index + 25 - gap / 2}
          />
        ))}
      </svg>
    </div>
  );
}
