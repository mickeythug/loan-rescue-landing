import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle, Shield, Clock, Users, Loader2, AlertCircle, XCircle, ArrowRight, Star, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSmartFormValidation, formValidationRules } from "@/hooks/useSmartFormValidation";
import ContactSection from "@/components/ContactSection";

interface MobileAppProps {
  currentStep: "form" | "result" | "thanks";
  setCurrentStep: (step: "form" | "result" | "thanks") => void;
  loanAmount: number;
  setLoanAmount: (amount: number) => void;
  isSubmitting: boolean;
  setIsSubmitting: (submitting: boolean) => void;
  isRejected: boolean;
  setIsRejected: (rejected: boolean) => void;
}

const MobileApp = ({ 
  currentStep, 
  setCurrentStep, 
  loanAmount, 
  setLoanAmount, 
  isSubmitting, 
  setIsSubmitting, 
  isRejected, 
  setIsRejected 
}: MobileAppProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    personalNumber: "",
    email: "",
    phone: "",
    income: "",
    hasDebts: ""
  });

  const { errors, isValid, triggerValidation } = useSmartFormValidation(formData, formValidationRules);

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
    setFormData({...formData, personalNumber: formatted});
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    triggerValidation();
    
    if (!isValid) {
      toast({
        title: "Kontrollera formuläret",
        description: "Vänligen rätta till felen innan du fortsätter.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));

    if (formData.hasDebts === "yes") {
      setIsRejected(true);
      setIsSubmitting(false);
      setCurrentStep("result");
      return;
    }

    const income = parseInt(formData.income);
    let calculatedAmount = 0;

    if (income >= 300000) {
      calculatedAmount = Math.min(600000 + Math.floor(Math.random() * 100000), 600000);
    } else if (income >= 200000) {
      calculatedAmount = Math.min(400000 + Math.floor(Math.random() * 50000), 500000);
    } else {
      calculatedAmount = Math.min(200000 + Math.floor(Math.random() * 50000), 300000);
    }
    
    setLoanAmount(calculatedAmount);
    setIsRejected(false);
    setIsSubmitting(false);
    setCurrentStep("result");
  };

  const handleContinue = () => {
    setCurrentStep("thanks");
    toast({
      title: "Tack för din förfrågan!",
      description: "Vi kontaktar dig inom kort.",
    });
  };

  if (currentStep === "result") {
    if (isRejected) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100">
          <div className="p-4">
            <div className="max-w-sm mx-auto pt-8">
              <Card className="shadow-xl border-0 bg-white/95 backdrop-blur">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <XCircle className="w-8 h-8 text-red-600" />
                  </div>
                  <h1 className="text-xl font-bold text-gray-900 mb-3">
                    Tyvärr kan vi inte hjälpa dig
                  </h1>
                  <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                    På grund av befintliga skulder kan vi tyvärr inte erbjuda dig ett lån för tillfället.
                  </p>
                  <div className="bg-blue-50 rounded-lg p-4 mb-4">
                    <p className="text-xs text-blue-800">
                      Vi rekommenderar att du kontaktar en skuldrådgivare för hjälp.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <ContactSection />
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="p-4">
          <div className="max-w-sm mx-auto pt-8">
            <Card className="shadow-xl border-0 bg-white/95 backdrop-blur">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h1 className="text-xl font-bold text-gray-900 mb-2">
                  Grattis! Du kan få:
                </h1>
                <div className="text-3xl font-bold text-green-600 mb-4">
                  {loanAmount.toLocaleString('sv-SE')} kr
                </div>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  Detta är en uppskattning baserad på dina uppgifter. Vill du gå vidare?
                </p>
                <Button 
                  onClick={handleContinue}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold"
                >
                  JA – JAG VILL GÅ VIDARE
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        <ContactSection />
      </div>
    );
  }

  if (currentStep === "thanks") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="p-4">
          <div className="max-w-sm mx-auto pt-8">
            <Card className="shadow-xl border-0 bg-white/95 backdrop-blur">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h1 className="text-xl font-bold text-gray-900 mb-3">
                  Tack för din förfrågan!
                </h1>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  En av våra lånespecialister kontaktar dig inom kort.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="space-y-2 text-xs text-green-800">
                    <div className="flex items-center">
                      <CheckCircle className="w-3 h-3 mr-2" />
                      <span>Din förfrågan är mottagen</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-3 h-3 mr-2" />
                      <span>Kontakt inom 24 timmar</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-3 h-3 mr-2" />
                      <span>Helt utan kostnad</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <ContactSection />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Mobile Hero */}
      <div className="relative pt-12 pb-8 px-4">
        <div className="text-center text-white max-w-sm mx-auto">
          <h1 className="text-2xl font-bold mb-3 leading-tight">
            VILL DU HA ETT PRIVATLÅN – MEN BLIR ALLTID NEKAD?
          </h1>
          <p className="text-sm text-blue-100 mb-6 leading-relaxed">
            Vi hjälper dig att få lån beviljat. Inget krav på kreditvärdighet.
            <span className="block mt-2">Inga kreditupplysningar. Inget bindande.</span>
          </p>
        </div>
      </div>

      {/* Mobile Benefits Cards */}
      <div className="px-4 pb-8">
        <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto mb-8">
          <Card className="bg-white/10 backdrop-blur border-0">
            <CardContent className="p-3 text-center">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <p className="text-xs text-white font-medium">Ingen kredit-kontroll</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur border-0">
            <CardContent className="p-3 text-center">
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Clock className="w-4 h-4 text-white" />
              </div>
              <p className="text-xs text-white font-medium">Svar direkt</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur border-0">
            <CardContent className="p-3 text-center">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Star className="w-4 h-4 text-white" />
              </div>
              <p className="text-xs text-white font-medium">Personlig hjälp</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Mobile Form */}
      <div className="px-4 pb-8">
        <Card className="max-w-sm mx-auto shadow-2xl border-0 bg-white/95 backdrop-blur">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-2">
                Få ditt lånebesked
              </h2>
              <p className="text-xs text-gray-600">
                Fyll i dina uppgifter nedan
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="firstName" className="text-xs font-medium text-gray-700">Förnamn</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className={`mt-1 h-10 text-sm rounded-lg ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  />
                  {errors.firstName && (
                    <div className="flex items-center mt-1 text-red-500 text-xs">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      <span>{errors.firstName}</span>
                    </div>
                  )}
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-xs font-medium text-gray-700">Efternamn</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className={`mt-1 h-10 text-sm rounded-lg ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  />
                  {errors.lastName && (
                    <div className="flex items-center mt-1 text-red-500 text-xs">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      <span>{errors.lastName}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="personalNumber" className="text-xs font-medium text-gray-700">Personnummer</Label>
                <Input
                  id="personalNumber"
                  placeholder="YYYYMMDD-XXXX"
                  value={formData.personalNumber}
                  onChange={handlePersonalNumberChange}
                  className={`mt-1 h-10 text-sm rounded-lg ${
                    errors.personalNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.personalNumber && (
                  <div className="flex items-center mt-1 text-red-500 text-xs">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    <span>{errors.personalNumber}</span>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="email" className="text-xs font-medium text-gray-700">E-postadress</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className={`mt-1 h-10 text-sm rounded-lg ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.email && (
                  <div className="flex items-center mt-1 text-red-500 text-xs">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    <span>{errors.email}</span>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="phone" className="text-xs font-medium text-gray-700">Mobilnummer</Label>
                <Input
                  id="phone"
                  placeholder="07X-XXX XX XX"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className={`mt-1 h-10 text-sm rounded-lg ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.phone && (
                  <div className="flex items-center mt-1 text-red-500 text-xs">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    <span>{errors.phone}</span>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="income" className="text-xs font-medium text-gray-700">Årsinkomst (kr)</Label>
                <Input
                  id="income"
                  type="number"
                  placeholder="250000"
                  value={formData.income}
                  onChange={(e) => setFormData({...formData, income: e.target.value})}
                  className={`mt-1 h-10 text-sm rounded-lg ${
                    errors.income ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.income && (
                  <div className="flex items-center mt-1 text-red-500 text-xs">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    <span>{errors.income}</span>
                  </div>
                )}
              </div>

              <div>
                <Label className="text-xs font-medium text-gray-700">Skulder hos Kronofogden?</Label>
                <RadioGroup
                  value={formData.hasDebts}
                  onValueChange={(value) => setFormData({...formData, hasDebts: value})}
                  className="mt-2 flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="debts-yes" />
                    <Label htmlFor="debts-yes" className="text-sm">Ja</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="debts-no" />
                    <Label htmlFor="debts-no" className="text-sm">Nej</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-xs text-green-800 leading-relaxed">
                  <strong>🔒 Trygg hantering:</strong> Dina uppgifter behandlas enligt GDPR. Ingen kreditupplysning görs.
                </p>
              </div>

              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    BEARBETAR...
                  </>
                ) : (
                  <>
                    👉 FÅ DITT BESKED NU
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
};

export default MobileApp;
