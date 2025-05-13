
import React from "react";
import { Table, TableBody } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TEKSStandard, Teacher } from "@/utils/mockData";
import { useHeatmapState } from "@/hooks/useHeatmapState";
import HeatmapHeader from "./heatmap/HeatmapHeader";
import CategoryRow from "./heatmap/CategoryRow";
import TEKSRow from "./heatmap/TEKSRow";

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
  const {
    hoveredRow,
    hoveredCol,
    selectedCell,
    teksGroups,
    setHoveredRow,
    setHoveredCol,
    handleOpenChange,
    handleCellClick
  } = useHeatmapState(teksStandards);

  return (
    <div className="rounded-md border">
      <ScrollArea className="h-[calc(100vh-300px)]">
        <div className="w-full overflow-auto">
          <Table>
            <HeatmapHeader
              viewMode={viewMode}
              teachers={teachers}
              hoveredCol={hoveredCol}
              onMouseEnter={(id) => setHoveredCol(id)}
              onMouseLeave={() => setHoveredCol(null)}
            />
            <TableBody>
              {Object.entries(teksGroups).map(([category, teksInCategory]) => (
                <React.Fragment key={category}>
                  <CategoryRow 
                    category={category} 
                    colSpan={viewMode === "teachers" ? teachers.length + 1 : (
                      viewMode === "departments" ? 4 : 5
                    )} 
                  />
                  {teksInCategory.map((teks) => (
                    <TEKSRow
                      key={teks.id}
                      teks={teks}
                      teachers={teachers}
                      viewMode={viewMode}
                      isHovered={hoveredRow === teks.id}
                      hoveredCol={hoveredCol}
                      selectedCell={selectedCell}
                      onMouseEnter={() => setHoveredRow(teks.id)}
                      onMouseLeave={() => setHoveredRow(null)}
                      onCellClick={handleCellClick}
                      onOpenChange={handleOpenChange}
                    />
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
