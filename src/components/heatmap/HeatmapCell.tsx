
import React from "react";
import InfoTooltip from "../InfoTooltip";
import { TableCell } from "@/components/ui/table";
import {
  TEKSStandard,
  Teacher,
  TEKSCoverage,
  CoverageLevel,
  coverageColors,
  coverageTextColors,
} from "@/utils/mockData";

interface HeatmapCellProps {
  teks: TEKSStandard;
  teacher: Teacher;
  coverage: TEKSCoverage;
  coverageLevel: CoverageLevel;
  isSelected: boolean;
  isHighlighted: boolean;
  onClick: () => void;
  onOpenChange: (open: boolean) => void;
}

const HeatmapCell: React.FC<HeatmapCellProps> = ({
  teks,
  teacher,
  coverage,
  coverageLevel,
  isSelected,
  isHighlighted,
  onClick,
  onOpenChange,
}) => {
  const bgColorClass = coverageColors[coverageLevel];
  const textColorClass = coverageTextColors[coverageLevel];

  // Handle cell click
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    onClick(); // Call the parent's click handler
  };

  return (
    <TableCell 
      className={`
        text-center ${bgColorClass} ${textColorClass}
        cursor-pointer relative p-0 border-2
        transition-all duration-200 ease-in-out
        ${isSelected ? 'ring-2 ring-primary ring-offset-2 z-20' : ''}
        ${(isHighlighted && !isSelected) ? 'opacity-90 scale-[1.02]' : ''}
        ${(!isHighlighted && !isSelected) ? 'group-hover:opacity-75' : ''}
      `}
      style={{ borderColor: 'transparent' }}
      onClick={handleClick}
    >
      <InfoTooltip
        coverage={coverage}
        teacher={teacher}
        teks={teks}
        coverageLevel={coverageLevel}
        isOpen={isSelected}
        onOpenChange={onOpenChange}
      >
        <div className="w-full h-full p-4 font-bold text-lg">
          {coverage.count}
        </div>
      </InfoTooltip>
    </TableCell>
  );
};

export default HeatmapCell;
