import React, { createContext, useContext, useState, useCallback } from 'react';

interface SelectionContextData {
  isSelecting: boolean;
  selectionRect: DOMRect | null;
  startSelecting: (e: React.MouseEvent) => void;
  stopSelecting: () => void;
  updateSelection: (e: React.MouseEvent) => void;
}

const SelectionContext = createContext<SelectionContextData | null>(null);

export const useSelection = () => {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error('useSelection must be used within a SelectionProvider');
  }
  return context;
};

export const SelectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionRect, setSelectionRect] = useState<DOMRect | null>(null);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const startSelecting = useCallback((e: React.MouseEvent) => {
    setIsSelecting(true);
    const newStartPos = { x: e.clientX, y: e.clientY };
    setStartPos(newStartPos);
    setSelectionRect(new DOMRect(newStartPos.x, newStartPos.y, 0, 0));
  }, []);

  const stopSelecting = useCallback(() => {
    setIsSelecting(false);
  }, []);

  const updateSelection = useCallback((e: React.MouseEvent) => {
    if (!isSelecting) return;

    const currentX = e.clientX;
    const currentY = e.clientY;

    const newRect = new DOMRect(
      Math.min(startPos.x, currentX),
      Math.min(startPos.y, currentY),
      Math.abs(currentX - startPos.x),
      Math.abs(currentY - startPos.y)
    );
    setSelectionRect(newRect);
  }, [isSelecting, startPos]);

  return (
    <SelectionContext.Provider value={{ isSelecting, selectionRect, startSelecting, stopSelecting, updateSelection }}>
      {children}
    </SelectionContext.Provider>
  );
};
