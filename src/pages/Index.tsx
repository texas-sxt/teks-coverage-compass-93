
import React, { useState } from "react";
import { toast } from "sonner";
import DashboardHeader from "@/components/DashboardHeader";
import FilterPanel from "@/components/FilterPanel";
import HeatmapGrid from "@/components/HeatmapGrid";
import {
  mockTeachers,
  filterTEKSStandards,
} from "@/utils/mockData";

const Index = () => {
  const [gradeLevel, setGradeLevel] = useState("all-grades");
  const [subject, setSubject] = useState("all-subjects");
  const [category, setCategory] = useState("all-categories");
  const [viewMode, setViewMode] = useState<"teachers" | "weeks" | "departments">("teachers");

  // Filter TEKS standards based on selected filters
  const filteredTEKSStandards = filterTEKSStandards(
    gradeLevel === "all-grades" ? "" : gradeLevel,
    subject === "all-subjects" ? "" : subject,
    category === "all-categories" ? "" : category
  );

  // Handle export functionality
  const handleExport = (format: "pdf" | "png" | "csv") => {
    toast.success(`Exporting as ${format.toUpperCase()}...`);
    // In a real app, this would trigger the export functionality
    setTimeout(() => {
      toast.success(`${format.toUpperCase()} export complete!`);
    }, 1500);
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      <DashboardHeader
        title="TEKS Coverage Heatmap"
        description="Visualize TEKS standards coverage across teachers and time periods"
      />

      <FilterPanel
        gradeLevel={gradeLevel}
        subject={subject}
        category={category}
        viewMode={viewMode}
        onGradeLevelChange={setGradeLevel}
        onSubjectChange={setSubject}
        onCategoryChange={setCategory}
        onViewModeChange={setViewMode}
        onExport={handleExport}
      />

      {filteredTEKSStandards.length > 0 ? (
        <HeatmapGrid
          teksStandards={filteredTEKSStandards}
          teachers={mockTeachers}
          viewMode={viewMode}
        />
      ) : (
        <div className="text-center py-16">
          <h3 className="text-xl font-medium text-gray-600">No TEKS standards match the selected filters</h3>
          <p className="text-gray-500 mt-2">Try adjusting your filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default Index;
