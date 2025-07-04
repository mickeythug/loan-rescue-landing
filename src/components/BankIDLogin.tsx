import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CreditCard, Loader2, CheckCircle, Smartphone, QrCode } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import BankSelector from "./BankSelector";

const BankIDLogin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [personalNumber, setPersonalNumber] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleBankIDLogin = async () => {
    if (!personalNumber.trim() || !selectedBank.trim()) return;
    
    setIsLoading(true);
    setShowQRCode(true);
    
    // Simulate waiting for QR code scan and authentication
    setTimeout(async () => {
      setShowQRCode(false);
      
      // Simulate authentication process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsLoading(false);
      setIsAuthenticated(true);
      
      // Close dialog after successful authentication
      setTimeout(() => {
        setIsOpen(false);
        setIsAuthenticated(false);
        setShowQRCode(false);
        setPersonalNumber("");
        setSelectedBank("");
      }, 2000);
    }, 8000); // Show QR code for 8 seconds
  };

  const formatPersonalNumber = (value: string) => {
    const digits = value.replace(/\D/g, '');
    
    if (digits.length >= 8) {
      const birthDate = digits.substring(0, 8);
      const lastFour = digits.substring(8, 12);
      return `${birthDate}-${lastFour}`;
    }
    
    return digits;
  };

  const handlePersonalNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPersonalNumber(e.target.value);
    setPersonalNumber(formatted);
  };

  const isFormValid = personalNumber.trim() && selectedBank.trim();

  // Generate a mock QR code pattern
  const generateQRPattern = () => {
    const size = 21; // Standard QR code size
    const pattern = [];
    for (let i = 0; i < size; i++) {
      pattern[i] = [];
      for (let j = 0; j < size; j++) {
        // Create a pseudo-random pattern that looks like a QR code
        const seed = (i * size + j + personalNumber.length) % 100;
        pattern[i][j] = seed > 50;
      }
    }
    return pattern;
  };

  const qrPattern = generateQRPattern();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 border-0 text-white font-semibold px-6 py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <CreditCard className="w-4 h-4" />
          Mina Sidor
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white border-0 shadow-2xl rounded-2xl">
        <DialogHeader className="pb-6">
          <DialogTitle className="text-center text-2xl font-bold text-gray-900 mb-2">
            Logga in
          </DialogTitle>
          <div className="flex justify-center">
            <div className="bg-gray-100 rounded-full p-1">
              <div className="bg-teal-600 text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium">
                <Smartphone className="w-4 h-4" />
                Mobilt BankID
              </div>
            </div>
          </div>
        </DialogHeader>
        
        <div className="flex flex-col space-y-6 py-4">
          {!isLoading && !showQRCode && !isAuthenticated && (
            <>
              <div className="space-y-4">
                <BankSelector
                  value={selectedBank}
                  onChange={setSelectedBank}
                />
                
                <div>
                  <Label htmlFor="personalNumber" className="text-sm font-medium text-gray-700 mb-2 block">
                    Personnummer
                  </Label>
                  <Input
                    id="personalNumber"
                    type="text"
                    placeholder="YYYYMMDD-XXXX"
                    value={personalNumber}
                    onChange={handlePersonalNumberChange}
                    className="h-12 text-base border-2 border-gray-200 rounded-lg focus:border-teal-600 focus:ring-2 focus:ring-teal-200 transition-all duration-200"
                    maxLength={13}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="remember" 
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    className="border-2 border-gray-300 data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600"
                  />
                  <Label htmlFor="remember" className="text-sm text-gray-600">
                    Kom ihåg mitt personnummer på den här datorn.
                  </Label>
                </div>
              </div>
              
              <Button
                onClick={handleBankIDLogin}
                disabled={!isFormValid}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 font-semibold text-base rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Logga in med Mobilt BankID
              </Button>
            </>
          )}

          {showQRCode && (
            <>
              <div className="flex flex-col items-center space-y-4 py-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <QrCode className="w-8 h-8 text-blue-600" />
                </div>
                
                <div className="text-center space-y-2 mb-6">
                  <p className="text-gray-900 font-semibold text-lg">
                    Skanna QR-koden
                  </p>
                  <p className="text-sm text-gray-600">
                    Öppna BankID-appen på din mobil och skanna koden nedan
                  </p>
                </div>

                {/* QR Code Display */}
                <div className="bg-white p-4 rounded-lg border-2 border-gray-300 shadow-lg">
                  <div className="grid grid-cols-21 gap-px bg-black p-2 rounded" style={{ gridTemplateColumns: 'repeat(21, 1fr)' }}>
                    {qrPattern.map((row, i) =>
                      row.map((cell, j) => (
                        <div
                          key={`${i}-${j}`}
                          className={`w-2 h-2 ${cell ? 'bg-black' : 'bg-white'}`}
                        />
                      ))
                    )}
                  </div>
                </div>

                <div className="text-center space-y-2 mt-4">
                  <p className="text-xs text-gray-500">
                    1. Öppna BankID-appen på din mobil
                  </p>
                  <p className="text-xs text-gray-500">
                    2. Tryck på "Skanna QR-kod"
                  </p>
                  <p className="text-xs text-gray-500">
                    3. Rikta kameran mot QR-koden ovan
                  </p>
                  <p className="text-xs text-gray-500">
                    4. Signera med din PIN-kod eller biometri
                  </p>
                </div>
              </div>
            </>
          )}
          
          {isLoading && !showQRCode && (
            <>
              <div className="flex flex-col items-center space-y-4 py-8">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
                  <Loader2 className="w-8 h-8 text-teal-600 animate-spin" />
                </div>
                <div className="text-center space-y-2">
                  <p className="text-gray-900 font-semibold">
                    Väntar på signering...
                  </p>
                  <p className="text-sm text-gray-600">
                    Signera i din BankID-app för att slutföra inloggningen
                  </p>
                </div>
              </div>
            </>
          )}
          
          {isAuthenticated && (
            <>
              <div className="flex flex-col items-center space-y-4 py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <div className="text-center space-y-2">
                  <p className="text-green-700 font-semibold">
                    Inloggning lyckades!
                  </p>
                  <p className="text-sm text-gray-600">
                    Du omdirigeras nu till Mina Sidor...
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BankIDLogin;
