
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import HeatmapCell from "./HeatmapCell";
import { 
  TEKSStandard, 
  Teacher, 
  getCoverage, 
  calculateCoverageLevel 
} from "@/utils/mockData";

interface TEKSRowProps {
  teks: TEKSStandard;
  teachers: Teacher[];
  viewMode: "teachers" | "weeks" | "departments";
  isHovered: boolean;
  hoveredCol: string | null;
  selectedCell: { teksId: string; teacherId: string } | null;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onCellClick: (teksId: string, teacherId: string) => void;
  onOpenChange: (open: boolean, teksId: string, teacherId: string) => void;
}

const TEKSRow: React.FC<TEKSRowProps> = ({
  teks,
  teachers,
  viewMode,
  isHovered,
  hoveredCol,
  selectedCell,
  onMouseEnter,
  onMouseLeave,
  onCellClick,
  onOpenChange,
}) => {
  return (
    <TableRow 
      className={`group transition-colors duration-200 ${
        isHovered ? 'bg-muted/30' : ''
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <TableCell className="font-mono">
        <div className="flex items-center">
          <div className="font-bold mr-1">{teks.id}:</div> 
          <div className="text-sm">{teks.description}</div>
        </div>
      </TableCell>
      {viewMode === "teachers" && teachers.map((teacher) => {
        const coverage = getCoverage(teks.id, teacher.id);
        if (!coverage) return <TableCell key={teacher.id}></TableCell>;
        
        const coverageLevel = calculateCoverageLevel(coverage.count);
        const isSelected = selectedCell?.teksId === teks.id && selectedCell?.teacherId === teacher.id;
        const isHighlighted = isHovered || hoveredCol === teacher.id || isSelected;
        
        return (
          <HeatmapCell
            key={teacher.id}
            teks={teks}
            teacher={teacher}
            coverage={coverage}
            coverageLevel={coverageLevel}
            isSelected={isSelected}
            isHighlighted={isHighlighted}
            onClick={() => onCellClick(teks.id, teacher.id)}
            onOpenChange={(open) => onOpenChange(open, teks.id, teacher.id)}
          />
        );
      })}
      {viewMode === "departments" && (
        <>
          <TableCell className="text-center bg-teks-adequate">5</TableCell>
          <TableCell className="text-center bg-teks-rarely">2</TableCell>
          <TableCell className="text-center bg-teks-never text-white">0</TableCell>
        </>
      )}
      {viewMode === "weeks" && (
        <>
          <TableCell className="text-center bg-teks-rarely">1</TableCell>
          <TableCell className="text-center bg-teks-adequate">3</TableCell>
          <TableCell className="text-center bg-teks-never text-white">0</TableCell>
          <TableCell className="text-center bg-teks-over">7</TableCell>
        </>
      )}
    </TableRow>
  );
};

export default TEKSRow;
