
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import InfoTooltip from "./InfoTooltip";
import {
  TEKSStandard,
  Teacher,
  getCoverage,
  getTeacherById,
  calculateCoverageLevel,
  coverageColors,
  coverageTextColors,
} from "@/utils/mockData";

interface HeatmapGridProps {
  teksStandards: TEKSStandard[];
  teachers: Teacher[];
  viewMode: "teachers" | "weeks" | "departments";
}

const HeatmapGrid: React.FC<HeatmapGridProps> = ({
  teksStandards,
  teachers,
  viewMode,
}) => {
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

  return (
    <div className="rounded-md border">
      <ScrollArea className="h-[calc(100vh-300px)]">
        <div className="w-full overflow-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-white z-10">
              <TableRow>
                <TableHead className="w-48">TEKS Standard</TableHead>
                {viewMode === "teachers" && teachers.map((teacher) => (
                  <TableHead 
                    key={teacher.id} 
                    className={`min-w-32 text-center transition-colors duration-200 ${
                      hoveredCol === teacher.id ? 'bg-muted/60' : ''
                    }`}
                    onMouseEnter={() => setHoveredCol(teacher.id)}
                    onMouseLeave={() => setHoveredCol(null)}
                  >
                    <div className="font-medium transition-transform hover:scale-105 cursor-default">
                      {teacher.name}
                      <div className="text-xs text-muted-foreground font-normal">
                        {teacher.campus}
                      </div>
                    </div>
                  </TableHead>
                ))}
                {/* Placeholder for departments and weeks views */}
                {viewMode === "departments" && (
                  <>
                    <TableHead className="min-w-32 text-center">Math Dept</TableHead>
                    <TableHead className="min-w-32 text-center">Science Dept</TableHead>
                    <TableHead className="min-w-32 text-center">English Dept</TableHead>
                  </>
                )}
                {viewMode === "weeks" && (
                  <>
                    <TableHead className="min-w-32 text-center">Week 1</TableHead>
                    <TableHead className="min-w-32 text-center">Week 2</TableHead>
                    <TableHead className="min-w-32 text-center">Week 3</TableHead>
                    <TableHead className="min-w-32 text-center">Week 4</TableHead>
                  </>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(teksGroups).map(([category, teksInCategory]) => (
                <React.Fragment key={category}>
                  <TableRow className="bg-muted/50">
                    <TableCell colSpan={teachers.length + 1} className="font-medium">
                      <div className="flex items-center">
                        <div className="w-1 h-4 bg-primary mr-2 rounded-full"></div>
                        {category}
                      </div>
                    </TableCell>
                  </TableRow>
                  {teksInCategory.map((teks) => (
                    <TableRow 
                      key={teks.id}
                      className={`group transition-colors duration-200 ${
                        hoveredRow === teks.id ? 'bg-muted/30' : ''
                      }`}
                      onMouseEnter={() => setHoveredRow(teks.id)}
                      onMouseLeave={() => setHoveredRow(null)}
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
                        const bgColorClass = coverageColors[coverageLevel];
                        const textColorClass = coverageTextColors[coverageLevel];
                        const isSelected = selectedCell?.teksId === teks.id && selectedCell?.teacherId === teacher.id;

                        const isHighlighted = 
                          hoveredRow === teks.id || 
                          hoveredCol === teacher.id || 
                          isSelected;
                        
                        return (
                          <TableCell 
                            key={teacher.id} 
                            className={`
                              text-center ${bgColorClass} ${textColorClass}
                              cursor-pointer relative p-0 border-2
                              transition-all duration-200 ease-in-out
                              ${isSelected ? 'ring-2 ring-primary ring-offset-2 z-20' : ''}
                              ${(isHighlighted && !isSelected) ? 'opacity-90 scale-[1.02]' : ''}
                              ${(!isHighlighted && !isSelected) ? 'group-hover:opacity-75' : ''}
                            `}
                            style={{ borderColor: 'transparent' }}
                          >
                            <InfoTooltip
                              coverage={coverage}
                              teacher={teacher}
                              teks={teks}
                              coverageLevel={coverageLevel}
                            >
                              <div className="w-full h-full p-4 font-bold text-lg">
                                {coverage.count}
                              </div>
                            </InfoTooltip>
                          </TableCell>
                        );
                      })}
                      {/* Placeholder cells for departments and weeks views */}
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
                  ))}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
    </div>
  );
};

export default HeatmapGrid;
