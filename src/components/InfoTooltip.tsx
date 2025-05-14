
import React from "react";
import { TEKSCoverage, CoverageLevel, Teacher, TEKSStandard } from "@/utils/mockData";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import TooltipContent from "./heatmap/TooltipContent";

interface InfoTooltipProps {
  coverage: TEKSCoverage;
  teacher: Teacher;
  teks: TEKSStandard;
  coverageLevel: CoverageLevel;
  children: React.ReactNode;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const InfoTooltip: React.FC<InfoTooltipProps> = ({
  coverage,
  teacher,
  teks,
  coverageLevel,
  children,
  isOpen,
  onOpenChange,
}) => {
  // Handle tooltip interaction
  const handleInteraction = () => {
    onOpenChange(false);
  };

  return (
    <Popover 
      open={isOpen} 
      onOpenChange={onOpenChange}
    >
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent 
        className="w-96 p-0 overflow-hidden animate-in zoom-in-95 duration-100 z-[250]" 
        side="right"
        onInteractOutside={handleInteraction}
        onEscapeKeyDown={handleInteraction}
        // Ensure popup disappears properly and stops event propagation
        onPointerDownOutside={(e) => {
          e.preventDefault();
          handleInteraction();
        }}
      >
        <TooltipContent
          coverage={coverage}
          teacher={teacher}
          teks={teks}
          coverageLevel={coverageLevel}
        />
      </PopoverContent>
    </Popover>
  );
};

export default InfoTooltip;
