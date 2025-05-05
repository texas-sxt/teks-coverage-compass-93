
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { getGradeLevels, getSubjects, getCategories } from "@/utils/mockData";

interface FilterPanelProps {
  gradeLevel: string;
  subject: string;
  category: string;
  viewMode: "teachers" | "weeks" | "departments";
  onGradeLevelChange: (value: string) => void;
  onSubjectChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onViewModeChange: (value: "teachers" | "weeks" | "departments") => void;
  onExport: (format: "pdf" | "png" | "csv") => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  gradeLevel,
  subject,
  category,
  viewMode,
  onGradeLevelChange,
  onSubjectChange,
  onCategoryChange,
  onViewModeChange,
  onExport,
}) => {
  const gradeLevels = getGradeLevels();
  const subjects = getSubjects();
  const categories = getCategories();

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Filters</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="grade-level">Grade Level</Label>
            <Select value={gradeLevel} onValueChange={onGradeLevelChange}>
              <SelectTrigger id="grade-level">
                <SelectValue placeholder="Select grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Grades</SelectItem>
                {gradeLevels.map((grade) => (
                  <SelectItem key={grade} value={grade}>
                    Grade {grade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Select value={subject} onValueChange={onSubjectChange}>
              <SelectTrigger id="subject">
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Subjects</SelectItem>
                {subjects.map((subj) => (
                  <SelectItem key={subj} value={subj}>
                    {subj}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={onCategoryChange}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="view-mode">View By</Label>
            <Select 
              value={viewMode} 
              onValueChange={(value) => onViewModeChange(value as "teachers" | "weeks" | "departments")}
            >
              <SelectTrigger id="view-mode">
                <SelectValue placeholder="Select view" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="teachers">Teachers</SelectItem>
                <SelectItem value="departments">Departments</SelectItem>
                <SelectItem value="weeks">Weeks</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">Export</h3>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onExport("pdf")}
          >
            PDF
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onExport("png")}
          >
            PNG
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onExport("csv")}
          >
            CSV
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
