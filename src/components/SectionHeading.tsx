
import { ReactNode } from "react";

interface SectionHeadingProps {
  number: number;
  title: string;
  icon: ReactNode;
}

const SectionHeading = ({ number, title, icon }: SectionHeadingProps) => {
  return (
    <div className="flex items-center mb-6">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-morocco-red text-white mr-4 shadow-subtle">
        {number}
      </div>
      <div>
        <div className="section-chip">{title}</div>
        <h3 className="text-xl font-medium flex items-center">
          {icon}
          <span className="ml-2">{title}</span>
        </h3>
      </div>
    </div>
  );
};

export default SectionHeading;
