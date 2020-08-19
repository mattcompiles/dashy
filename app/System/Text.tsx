import React, { ReactNode } from 'react';
import clsx from 'clsx';

interface TextStyleProps {
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  color?: string;
  weight?: string;
  hoverUnderline?: boolean;
}
const textStyles = ({
  size = 'base',
  color = 'current',
  weight = 'normal',
  hoverUnderline = false,
}: TextStyleProps) =>
  clsx('text-sans', `text-${size}`, `text-${color}`, `font-${weight}`, {
    'hover:underline': hoverUnderline,
  });

interface TextProps extends TextStyleProps {
  children: ReactNode;
}
export function Text({ children, ...rest }: TextProps) {
  return <span className={textStyles(rest)}>{children}</span>;
}

interface LinkProps extends TextProps {
  href: string;
}
export function Link({ href, children, ...rest }: LinkProps) {
  return (
    <a href={href} className={textStyles(rest)}>
      {children}
    </a>
  );
}
