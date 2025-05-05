
import React from "react";
import { Button } from "@/components/ui/button";
import { CoverageLevel, coverageColors } from "@/utils/mockData";

interface DashboardHeaderProps {
  title: string;
  description: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, description }) => {
  return (
    <div className="space-y-2">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <div>
          <Button>Generate New Report</Button>
        </div>
      </div>
      
      <div className="flex items-center space-x-4 mt-4 text-sm">
        <h3 className="font-medium">Legend:</h3>
        <div className="flex items-center space-x-2">
          <div className={`w-4 h-4 rounded ${coverageColors[CoverageLevel.NEVER]}`}></div>
          <span>Never Taught</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-4 h-4 rounded ${coverageColors[CoverageLevel.RARELY]}`}></div>
          <span>Rarely Covered</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-4 h-4 rounded ${coverageColors[CoverageLevel.ADEQUATE]}`}></div>
          <span>Adequately Covered</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-4 h-4 rounded ${coverageColors[CoverageLevel.OVER]}`}></div>
          <span>Over-Taught</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
