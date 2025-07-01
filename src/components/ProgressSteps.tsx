
import { CheckCircle } from "lucide-react";

interface ProgressStepsProps {
  currentStep: "form" | "result" | "thanks";
}

const ProgressSteps = ({ currentStep }: ProgressStepsProps) => {
  const steps = [
    { id: "form", label: "Fyll i uppgifter", completed: currentStep !== "form" },
    { id: "result", label: "Få besked", completed: currentStep === "thanks" },
    { id: "thanks", label: "Klar", completed: currentStep === "thanks" }
  ];

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
              step.completed 
                ? "bg-green-600 text-white" 
                : currentStep === step.id 
                  ? "bg-blue-600 text-white animate-pulse" 
                  : "bg-gray-300 text-gray-600"
            }`}>
              {step.completed ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <span className="text-sm font-bold">{index + 1}</span>
              )}
            </div>
            <span className={`ml-2 text-sm font-medium ${
              step.completed || currentStep === step.id ? "text-slate-900" : "text-gray-500"
            }`}>
              {step.label}
            </span>
            {index < steps.length - 1 && (
              <div className={`mx-4 h-0.5 w-8 transition-all duration-300 ${
                step.completed ? "bg-green-600" : "bg-gray-300"
              }`}></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressSteps;
