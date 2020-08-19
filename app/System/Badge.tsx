import React, { ReactNode } from 'react';
import clsx from 'clsx';

interface BadgeProps {
  tone: 'positive' | 'critical';
  children: ReactNode;
}
export function Badge({ tone, children }: BadgeProps) {
  return (
    <div
      className={clsx('px-1 text-white rounded', {
        'bg-green-400': tone === 'positive',
        'bg-red-400': tone === 'critical',
      })}
    >
      {children}
    </div>
  );
}
