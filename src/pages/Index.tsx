
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import MobileApp from "@/components/MobileApp";
import { Button } from "@/components/ui/button";
import BankIDLogin from "@/components/BankIDLogin";

const Index = () => {
  const [currentStep, setCurrentStep] = useState<"form" | "result" | "thanks">("form");
  const [loanAmount, setLoanAmount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if we should scroll to form section
    if (location.hash === '#form') {
      const formSection = document.getElementById('form-section');
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToForm = () => {
    const formSection = document.getElementById('form-section');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Desktop Header - only show on larger screens */}
      <header className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                BEVILJAD
              </Link>
            </div>
            
            <div className="flex items-center space-x-6">
              <nav className="flex space-x-8">
                <Link to="/" className="text-blue-400 font-medium">
                  Hem
                </Link>
                <button 
                  onClick={scrollToForm}
                  className="text-gray-300 hover:text-blue-400 font-medium transition-colors duration-200"
                >
                  Lån
                </button>
                <Link to="/om-oss" className="text-gray-300 hover:text-blue-400 font-medium transition-colors duration-200">
                  Om oss
                </Link>
                <button 
                  onClick={scrollToContact}
                  className="text-gray-300 hover:text-blue-400 font-medium transition-colors duration-200"
                >
                  Kontakt
                </button>
              </nav>
              
              <div className="flex items-center space-x-3">
                <BankIDLogin />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Add id to form section */}
      <div id="form-section">
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
