
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CreditCard, Loader2, CheckCircle } from "lucide-react";

const BankIDLogin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleBankIDLogin = async () => {
    setIsLoading(true);
    
    // Simulate BankID authentication process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsLoading(false);
    setIsAuthenticated(true);
    
    // Close dialog after successful authentication
    setTimeout(() => {
      setIsOpen(false);
      setIsAuthenticated(false);
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-white hover:bg-gray-50 border-gray-300 text-gray-700 font-medium px-4 py-2 rounded-lg shadow-sm"
        >
          <CreditCard className="w-4 h-4" />
          Mina Sidor
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl text-gray-900">
            Logga in med BankID
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center py-8 space-y-6">
          {!isLoading && !isAuthenticated && (
            <>
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                <CreditCard className="w-10 h-10 text-blue-600" />
              </div>
              <div className="text-center space-y-2">
                <p className="text-gray-700 font-medium">
                  Klicka på knappen nedan för att logga in med BankID
                </p>
                <p className="text-sm text-gray-500">
                  Du kommer att omdirigeras till din BankID-app
                </p>
              </div>
              <Button
                onClick={handleBankIDLogin}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 font-semibold"
              >
                Logga in med BankID
              </Button>
            </>
          )}
          
          {isLoading && (
            <>
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
              </div>
              <div className="text-center space-y-2">
                <p className="text-gray-700 font-medium">
                  Väntar på BankID...
                </p>
                <p className="text-sm text-gray-500">
                  Öppna din BankID-app och följ instruktionerna
                </p>
              </div>
            </>
          )}
          
          {isAuthenticated && (
            <>
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <div className="text-center space-y-2">
                <p className="text-green-700 font-medium">
                  Inloggning lyckades!
                </p>
                <p className="text-sm text-gray-500">
                  Du omdirigeras nu till Mina Sidor...
                </p>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BankIDLogin;
