
import { useState, useEffect } from "react";
import { TEKSStandard } from "@/utils/mockData";

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

  // Clear selected cell on scroll
  useEffect(() => {
    const handleScroll = () => setSelectedCell(null);
    window.addEventListener('scroll', handleScroll, true);
    return () => window.removeEventListener('scroll', handleScroll, true);
  }, []);

  // Handle tooltip open state change
  const handleOpenChange = (open: boolean, teksId: string, teacherId: string) => {
    setSelectedCell(open ? { teksId, teacherId } : null);
  };

  // Handle cell click
  const handleCellClick = (teksId: string, teacherId: string) => {
    // Toggle selection: if same cell, deselect; otherwise select new cell
    setSelectedCell(
      selectedCell?.teksId === teksId && selectedCell?.teacherId === teacherId 
        ? null 
        : { teksId, teacherId }
    );
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
