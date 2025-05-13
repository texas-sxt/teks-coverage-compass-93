import { useState, useEffect } from "react";
import { TEKSStandard } from "@/utils/mockData";
import { toast } from "@/hooks/use-toast";

export function useHeatmapState(teksStandards: TEKSStandard[]) {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [hoveredCol, setHoveredCol] = useState<string | null>(null);
  const [selectedCell, setSelectedCell] = useState<{ teksId: string; teacherId: string } | null>(null);

  // Group TEKS standards by category
  const teksGroups = teksStandards.reduce<Record<string, TEKSStandard[]>>((acc, teks) => {
    if (!acc[teks.category]) {
      acc[teks.category] = [];
    }
    acc[teks.category].push(teks);
    return acc;
  }, {});

  // Add effect to clear selected cell on scroll
  useEffect(() => {
    const handleScroll = () => {
      setSelectedCell(null);
    };
    
    window.addEventListener('scroll', handleScroll, true);
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, []);

  // Handle tooltip open state change - this is called from the Popover onOpenChange
  const handleOpenChange = (open: boolean, teksId: string, teacherId: string) => {
    if (open) {
      // If opening a tooltip, set this cell as selected
      setSelectedCell({ teksId, teacherId });
    } else {
      // If closing, clear selection
      setSelectedCell(null);
    }
  };

  // Handle cell click
  const handleCellClick = (teksId: string, teacherId: string) => {
    // If clicking the same cell that's already selected, deselect it
    if (selectedCell?.teksId === teksId && selectedCell?.teacherId === teacherId) {
      setSelectedCell(null); // This deselects the cell
    } else {
      // Otherwise select this cell (automatically deselecting any previously selected cell)
      setSelectedCell({ teksId, teacherId });
    }
  };

  return {
    hoveredRow,
    hoveredCol,
    selectedCell,
    teksGroups,
    setHoveredRow,
    setHoveredCol,
    handleOpenChange,
    handleCellClick
  };
}
