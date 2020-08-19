import React, { ReactNode } from 'react';
import clsx from 'clsx';

interface BadgeProps {
  tone: 'positive' | 'critical';
  nudge?: number;
  children: ReactNode;
}
export function Badge({ tone, children, nudge = 0 }: BadgeProps) {
  return (
    <div
      style={{ top: nudge }}
      className={clsx('relative px-1 rounded font-bold text-white text-sm', {
        'bg-green-400': tone === 'positive',
        'bg-red-400': tone === 'critical',
      })}
    >
      {children}
    </div>
  );
}
