
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";

interface CategoryRowProps {
  category: string;
  colSpan: number;
}

const CategoryRow: React.FC<CategoryRowProps> = ({ category, colSpan }) => {
  return (
    <TableRow className="bg-muted/50">
      <TableCell colSpan={colSpan} className="font-medium">
        <div className="flex items-center">
          <div className="w-1 h-4 bg-primary mr-2 rounded-full"></div>
          {category}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default CategoryRow;
