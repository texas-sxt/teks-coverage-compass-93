
// Mock data for TEKS standards
export interface TEKSStandard {
  id: string;
  description: string;
  subject: string;
  gradeLevel: string;
  category: string;
}

// Mock data for teachers
export interface Teacher {
  id: string;
  name: string;
  department: string;
  campus: string;
}

// Mock data for TEKS coverage
export interface TEKSCoverage {
  teksId: string;
  teacherId: string;
  count: number;
  lastTaught: string; // ISO date string
  lessons: string[]; // IDs of lessons that covered this TEKS
}

// Enum for coverage levels
export enum CoverageLevel {
  NEVER = 'never',
  RARELY = 'rarely',
  ADEQUATE = 'adequate',
  OVER = 'over'
}

// Function to calculate coverage level
export const calculateCoverageLevel = (count: number): CoverageLevel => {
  if (count === 0) return CoverageLevel.NEVER;
  if (count < 3) return CoverageLevel.RARELY;
  if (count < 7) return CoverageLevel.ADEQUATE;
  return CoverageLevel.OVER;
};

// Color mappings for each coverage level
export const coverageColors = {
  [CoverageLevel.NEVER]: 'bg-teks-never',
  [CoverageLevel.RARELY]: 'bg-teks-rarely',
  [CoverageLevel.ADEQUATE]: 'bg-teks-adequate',
  [CoverageLevel.OVER]: 'bg-teks-over',
};

// Text color mappings for each coverage level (for readability)
export const coverageTextColors = {
  [CoverageLevel.NEVER]: 'text-white',
  [CoverageLevel.RARELY]: 'text-gray-800',
  [CoverageLevel.ADEQUATE]: 'text-gray-800',
  [CoverageLevel.OVER]: 'text-gray-800',
};

// Sample TEKS standards
export const mockTEKSStandards: TEKSStandard[] = [
  { id: "3.1A", description: "Apply mathematics to problems arising in everyday life", subject: "Math", gradeLevel: "3", category: "Numbers" },
  { id: "3.1B", description: "Use problem-solving models", subject: "Math", gradeLevel: "3", category: "Numbers" },
  { id: "3.2A", description: "Compose and decompose numbers", subject: "Math", gradeLevel: "3", category: "Numbers" },
  { id: "3.3A", description: "Represent fractions with denominators", subject: "Math", gradeLevel: "3", category: "Fractions" },
  { id: "3.3B", description: "Determine the fraction that corresponds to a specific point", subject: "Math", gradeLevel: "3", category: "Fractions" },
  { id: "3.4A", description: "Solve with automaticity multiplication facts", subject: "Math", gradeLevel: "3", category: "Operations" },
  { id: "3.4B", description: "Determine products using properties of operations", subject: "Math", gradeLevel: "3", category: "Operations" },
  { id: "3.5A", description: "Represent one- and two-step problems", subject: "Math", gradeLevel: "3", category: "Problems" },
  { id: "3.6A", description: "Classify two-dimensional figures", subject: "Math", gradeLevel: "3", category: "Geometry" },
  { id: "3.6B", description: "Determine the area of rectangles", subject: "Math", gradeLevel: "3", category: "Geometry" },
  { id: "4.1A", description: "Apply mathematics to solve problems", subject: "Math", gradeLevel: "4", category: "Numbers" },
  { id: "4.1B", description: "Use mathematical relationships to make predictions", subject: "Math", gradeLevel: "4", category: "Numbers" },
  { id: "4.2A", description: "Interpret the value of each digit in decimals", subject: "Math", gradeLevel: "4", category: "Numbers" },
  { id: "4.3A", description: "Represent a fraction on a number line", subject: "Math", gradeLevel: "4", category: "Fractions" },
  { id: "4.3B", description: "Decompose a fraction as a sum of fractions", subject: "Math", gradeLevel: "4", category: "Fractions" },
];

// Sample teachers
export const mockTeachers: Teacher[] = [
  { id: "T1", name: "Alice Johnson", department: "Math", campus: "Lincoln Elementary" },
  { id: "T2", name: "Bob Smith", department: "Math", campus: "Lincoln Elementary" },
  { id: "T3", name: "Carol Davis", department: "Math", campus: "Washington Middle" },
  { id: "T4", name: "Dave Wilson", department: "Math", campus: "Washington Middle" },
  { id: "T5", name: "Eve Brown", department: "Math", campus: "Jefferson High" },
];

// Generate random mock coverage data
export const generateMockCoverage = (): TEKSCoverage[] => {
  const coverage: TEKSCoverage[] = [];
  
  mockTEKSStandards.forEach(teks => {
    mockTeachers.forEach(teacher => {
      // Generate a random count between 0 and 10
      const count = Math.floor(Math.random() * 11);
      
      // Generate a random date within the last 30 days
      const lastTaught = new Date();
      lastTaught.setDate(lastTaught.getDate() - Math.floor(Math.random() * 30));
      
      // Generate fake lesson IDs
      const lessons = [];
      for (let i = 0; i < count; i++) {
        lessons.push(`L${Math.floor(Math.random() * 1000)}`);
      }
      
      coverage.push({
        teksId: teks.id,
        teacherId: teacher.id,
        count,
        lastTaught: lastTaught.toISOString().split('T')[0],
        lessons,
      });
    });
  });
  
  return coverage;
};

export const mockCoverageData = generateMockCoverage();

// Function to get a teacher by ID
export const getTeacherById = (id: string): Teacher | undefined => {
  return mockTeachers.find(teacher => teacher.id === id);
};

// Function to get a TEKS standard by ID
export const getTEKSById = (id: string): TEKSStandard | undefined => {
  return mockTEKSStandards.find(teks => teks.id === id);
};

// Function to get coverage for a specific TEKS and teacher
export const getCoverage = (teksId: string, teacherId: string): TEKSCoverage | undefined => {
  return mockCoverageData.find(
    coverage => coverage.teksId === teksId && coverage.teacherId === teacherId
  );
};

// Function to get all available grade levels
export const getGradeLevels = (): string[] => {
  return Array.from(new Set(mockTEKSStandards.map(teks => teks.gradeLevel)));
};

// Function to get all available subjects
export const getSubjects = (): string[] => {
  return Array.from(new Set(mockTEKSStandards.map(teks => teks.subject)));
};

// Function to get all available categories
export const getCategories = (): string[] => {
  return Array.from(new Set(mockTEKSStandards.map(teks => teks.category)));
};

// Function to filter TEKS standards by grade level, subject, and category
export const filterTEKSStandards = (
  gradeLevel?: string,
  subject?: string,
  category?: string
): TEKSStandard[] => {
  return mockTEKSStandards.filter(teks => {
    if (gradeLevel && teks.gradeLevel !== gradeLevel) return false;
    if (subject && teks.subject !== subject) return false;
    if (category && teks.category !== category) return false;
    return true;
  });
};
