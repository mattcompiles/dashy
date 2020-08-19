import React, { ReactNode } from 'react';
import clsx from 'clsx';

interface DividerProps {
  size?: number;
  color?: string;
  space?: number;
}
export function Divider({ size, space, color }: DividerProps) {
  return (
    <div
      className={clsx(
        color ? `border-t-${color}` : '',
        `border-t${size ? `-${size}` : ''}`,
        space ? `pb-${space}` : '',
        space ? `mt-${space}` : '',
      )}
    />
  );
}
