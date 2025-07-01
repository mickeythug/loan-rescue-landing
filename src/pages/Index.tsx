
import { useState } from "react";
import { Link } from "react-router-dom";
import MobileApp from "@/components/MobileApp";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [currentStep, setCurrentStep] = useState<"form" | "result" | "thanks">("form");
  const [loanAmount, setLoanAmount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRejected, setIsRejected] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              BEVILJAD
            </Link>
            <div className="flex space-x-6">
              <Link to="/" className="text-blue-600 font-medium">
                Hem
              </Link>
              <Link to="/om-oss" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Om oss
              </Link>
              <Link to="/om-oss#contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Kontakt
              </Link>
              <a href="#loan-form" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Lån
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Add ID to the main content area where the form is */}
      <div id="loan-form">
        <MobileApp
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          loanAmount={loanAmount}
          setLoanAmount={setLoanAmount}
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
          isRejected={isRejected}
          setIsRejected={setIsRejected}
        />
      </div>
    </div>
  );
};

export default Index;
