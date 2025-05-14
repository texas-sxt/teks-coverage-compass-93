
import { CoverageLevel, TEKSCoverage } from "./mockData";

// Helper to get coverage color based on level
export const getCoverageColor = (level: CoverageLevel): string => {
  switch (level) {
    case "never": return "#ea384c";
    case "rarely": return "#FEF7CD";
    case "adequate": return "#F2FCE2";
    case "over": return "#D3E4FD";
    default: return "#F2FCE2";
  }
};

// Helper to generate sample chart data based on coverage count
export const generateChartData = (count: number) => [
  { month: "Jan", count: Math.floor(Math.random() * 3) },
  { month: "Feb", count: Math.floor(Math.random() * 3) },
  { month: "Mar", count: Math.floor(Math.random() * 4) },
  { month: "Apr", count: Math.floor(Math.random() * 5) },
  { month: "May", count },
];

// Helper to parse and normalize lesson numbers
export const parseLessons = (lessons: (string | number)[]): number[] => {
  if (lessons.length === 0) {
    return [1, 2, 3].map(() => Math.floor(Math.random() * 20) + 1);
  }
  
  return lessons.map(lesson => {
    const num = typeof lesson === 'string' 
      ? parseInt(lesson.replace(/\D/g, ''), 10) 
      : lesson;
    return isNaN(num) ? Math.floor(Math.random() * 20) + 1 : num;
  });
};
