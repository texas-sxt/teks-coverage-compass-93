
import React from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Teacher } from "@/utils/mockData";

interface HeatmapHeaderProps {
  viewMode: "teachers" | "weeks" | "departments";
  teachers: Teacher[];
  hoveredCol: string | null;
  onMouseEnter: (id: string) => void;
  onMouseLeave: () => void;
}

const HeatmapHeader: React.FC<HeatmapHeaderProps> = ({
  viewMode,
  teachers,
  hoveredCol,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <TableHeader className="sticky top-0 bg-white z-10">
      <TableRow>
        <TableHead className="w-48">TEKS Standard</TableHead>
        {viewMode === "teachers" && teachers.map((teacher) => (
          <TableHead 
            key={teacher.id} 
            className={`min-w-32 text-center transition-colors duration-200 ${
              hoveredCol === teacher.id ? 'bg-muted/60' : ''
            }`}
            onMouseEnter={() => onMouseEnter(teacher.id)}
            onMouseLeave={onMouseLeave}
          >
            <div className="font-medium transition-transform hover:scale-105 cursor-default">
              {teacher.name}
              <div className="text-xs text-muted-foreground font-normal">
                {teacher.campus}
              </div>
            </div>
          </TableHead>
        ))}
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
  );
};

export default HeatmapHeader;
