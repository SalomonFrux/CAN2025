
import { useState, useEffect } from "react";

interface ProgressIndicatorProps {
  steps: number;
  currentStep: number;
}

const ProgressIndicator = ({ steps, currentStep }: ProgressIndicatorProps) => {
  const [width, setWidth] = useState(0);
  
  useEffect(() => {
    // Calculate progress percentage
    const progress = (currentStep / (steps - 1)) * 100;
    setWidth(progress);
  }, [currentStep, steps]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div 
        className="h-1 bg-morocco-gold"
        style={{ width: `${width}%`, transition: "width 0.6s cubic-bezier(0.65, 0, 0.35, 1)" }}
      />
    </div>
  );
};

export default ProgressIndicator;
