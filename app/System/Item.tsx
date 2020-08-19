import React, { ReactNode } from 'react';
import { Icon } from 'bumbag';

interface ItemProps {
  type: string;
  children: ReactNode;
}
export function Item({ type, children }: ItemProps) {
  return (
    <div>
      <div className="flex pb-2 px-1 justify-between text-gray-500 hover:text-black transition duration-300 ease-in-out">
        <span className="text-sm">{type}</span>
        <Icon top="4px" fontSize="200" icon="solid-cog" />
      </div>
      <div className="rounded-md shadow bg-white p-4">{children}</div>
    </div>
  );
}
