
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TEKSCoverage, CoverageLevel, Teacher, TEKSStandard } from "@/utils/mockData";

interface InfoTooltipProps {
  coverage: TEKSCoverage;
  teacher: Teacher;
  teks: TEKSStandard;
  coverageLevel: CoverageLevel;
  children: React.ReactNode;
}

const InfoTooltip: React.FC<InfoTooltipProps> = ({
  coverage,
  teacher,
  teks,
  coverageLevel,
  children,
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className="w-80 p-4" side="right">
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">{teks.id}: {teks.description}</h4>
            <div className="text-xs space-y-1">
              <p><span className="font-medium">Teacher:</span> {teacher.name} ({teacher.campus})</p>
              <p><span className="font-medium">Times Taught:</span> {coverage.count}</p>
              <p><span className="font-medium">Last Taught:</span> {coverage.lastTaught}</p>
              <p><span className="font-medium">Coverage Status:</span> {coverageLevel.charAt(0).toUpperCase() + coverageLevel.slice(1)}</p>
              
              {coverage.lessons.length > 0 && (
                <div>
                  <p className="font-medium">Lessons:</p>
                  <ul className="pl-4 list-disc">
                    {coverage.lessons.slice(0, 3).map((lesson, index) => (
                      <li key={index}>Lesson {lesson}</li>
                    ))}
                    {coverage.lessons.length > 3 && (
                      <li>+{coverage.lessons.length - 3} more</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default InfoTooltip;
