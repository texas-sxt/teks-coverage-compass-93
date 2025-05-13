
import React, { useState, useEffect, useMemo } from "react";
import { BarChart, ResponsiveContainer, Bar, XAxis } from "recharts";
import { TEKSCoverage, CoverageLevel, Teacher, TEKSStandard } from "@/utils/mockData";
import { ChartContainer } from "@/components/ui/chart";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface InfoTooltipProps {
  coverage: TEKSCoverage;
  teacher: Teacher;
  teks: TEKSStandard;
  coverageLevel: CoverageLevel;
  children: React.ReactNode;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

// Coverage color mapping helper
const getCoverageColor = (level: CoverageLevel): string => {
  switch (level) {
    case "never": return "#ea384c";
    case "rarely": return "#FEF7CD";
    case "adequate": return "#F2FCE2";
    case "over": return "#D3E4FD";
    default: return "#F2FCE2";
  }
};

// Component to display metadata grid
const MetadataGrid: React.FC<{ teacher: Teacher; coverage: TEKSCoverage }> = ({ teacher, coverage }) => (
  <div className="grid grid-cols-2 gap-2 text-xs">
    <div>
      <p className="text-muted-foreground">Teacher</p>
      <p className="font-medium">{teacher.name}</p>
    </div>
    <div>
      <p className="text-muted-foreground">Campus</p>
      <p className="font-medium">{teacher.campus}</p>
    </div>
    <div>
      <p className="text-muted-foreground">Times Taught</p>
      <p className="font-medium">{coverage.count}</p>
    </div>
    <div>
      <p className="text-muted-foreground">Last Taught</p>
      <p className="font-medium">{coverage.lastTaught}</p>
    </div>
  </div>
);

// Component to display lesson tags
const LessonTags: React.FC<{ lessons: number[] }> = ({ lessons }) => (
  <div>
    <p className="text-xs font-medium mb-1">Lessons</p>
    <div className="flex flex-wrap gap-1">
      {lessons.slice(0, 5).map((lesson, index) => (
        <span 
          key={index} 
          className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80"
        >
          Lesson {lesson}
        </span>
      ))}
      {lessons.length > 5 && (
        <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-transparent bg-secondary text-secondary-foreground">
          +{lessons.length - 5} more
        </span>
      )}
    </div>
  </div>
);

// Coverage trend chart component
const CoverageTrendChart: React.FC<{ coverageLevel: CoverageLevel; count: number }> = ({ coverageLevel, count }) => {
  // Generate sample chart data
  const chartData = useMemo(() => [
    { month: "Jan", count: Math.floor(Math.random() * 3) },
    { month: "Feb", count: Math.floor(Math.random() * 3) },
    { month: "Mar", count: Math.floor(Math.random() * 4) },
    { month: "Apr", count: Math.floor(Math.random() * 5) },
    { month: "May", count },
  ], [count]);

  const color = getCoverageColor(coverageLevel);

  return (
    <div className="pt-1">
      <p className="text-xs font-medium mb-1">Coverage Trend</p>
      <ChartContainer 
        className="h-24 w-full"
        config={{
          count: {
            label: "Count",
            color
          }
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis 
              dataKey="month"
              tickLine={false}
              axisLine={false}
              fontSize={10}
            />
            <Bar 
              dataKey="count"
              fill={color}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

const InfoTooltip: React.FC<InfoTooltipProps> = ({
  coverage,
  teacher,
  teks,
  coverageLevel,
  children,
  isOpen,
  onOpenChange,
}) => {
  // Make sure lessons are converted to numbers
  const numericLessons = useMemo(() => 
    coverage.lessons.map(lesson => typeof lesson === 'string' ? parseInt(lesson, 10) : lesson), 
    [coverage.lessons]
  );

  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent 
        className="w-96 p-0 overflow-hidden animate-in zoom-in-95 duration-100 z-[250]" 
        side="right"
        onEscapeKeyDown={(e) => {
          onOpenChange(false);
          e.preventDefault();
        }}
        onInteractOutside={(e) => {
          onOpenChange(false);
          e.preventDefault();
        }}
      >
        <div className="flex flex-col">
          {/* Header with TEKS info */}
          <div 
            className="p-4 border-b" 
            style={{ backgroundColor: getCoverageColor(coverageLevel), opacity: 0.3 }}
          >
            <h4 className="font-semibold text-sm">{teks.id}: {teks.description}</h4>
          </div>
          
          <div className="p-4 space-y-3">
            {/* Teacher and coverage metadata */}
            <MetadataGrid teacher={teacher} coverage={coverage} />
            
            {/* Coverage trend chart */}
            <CoverageTrendChart coverageLevel={coverageLevel} count={coverage.count} />

            {/* Lesson tags */}
            {numericLessons.length > 0 && <LessonTags lessons={numericLessons} />}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default InfoTooltip;
