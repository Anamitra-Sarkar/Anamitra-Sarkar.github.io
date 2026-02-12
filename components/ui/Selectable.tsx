import React from 'react';
import { useSelection } from '../providers/SelectionProvider';

interface SelectableProps {
  children: React.ReactNode;
}

export const Selectable: React.FC<SelectableProps> = ({ children }) => {
  const { startSelecting } = useSelection();

  return (
    <div onMouseDown={startSelecting}>
      {children}
    </div>
  );
};
