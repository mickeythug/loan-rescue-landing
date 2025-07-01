
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle, Shield, Clock, Users, Loader2, AlertCircle, XCircle, ArrowRight, Phone, Mail, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSmartFormValidation, formValidationRules } from "@/hooks/useSmartFormValidation";

const Index = () => {
  const [currentStep, setCurrentStep] = useState<"form" | "result" | "thanks">("form");
  const [loanAmount, setLoanAmount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
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

  const scrollToForm = () => {
    document.getElementById('loan-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Mobile Progress Component
  const MobileProgress = ({ step }: { step: "form" | "result" | "thanks" }) => (
    <div className="bg-white border-b border-gray-100 px-4 py-3 sticky top-0 z-10">
      <div className="flex items-center justify-center space-x-2">
        <div className={`w-2 h-2 rounded-full ${step === "form" ? "bg-blue-500" : "bg-gray-300"}`}></div>
        <div className={`w-2 h-2 rounded-full ${step === "result" ? "bg-blue-500" : "bg-gray-300"}`}></div>
        <div className={`w-2 h-2 rounded-full ${step === "thanks" ? "bg-blue-500" : "bg-gray-300"}`}></div>
      </div>
    </div>
  );

  if (currentStep === "result") {
    if (isRejected) {
      return (
        <div className="min-h-screen bg-gray-50">
          <MobileProgress step={currentStep} />
          <div className="p-4 space-y-4">
            <Card className="bg-white shadow-sm border-0 rounded-2xl overflow-hidden">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <XCircle className="w-8 h-8 text-red-500" />
                </div>
                <h1 className="text-xl font-bold text-gray-900 mb-3">
                  Tyvärr kan vi inte hjälpa dig
                </h1>
                <p className="text-sm text-gray-600 leading-relaxed">
                  På grund av befintliga skulder hos Kronofogden kan vi tyvärr inte erbjuda dig ett lån för tillfället.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <MobileProgress step={currentStep} />
        <div className="p-4 space-y-4">
          <Card className="bg-white shadow-sm border-0 rounded-2xl overflow-hidden">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <h1 className="text-xl font-bold text-gray-900 mb-2">
                Du kan få upp till:
              </h1>
              <div className="text-3xl font-bold text-blue-600 mb-4">
                {loanAmount.toLocaleString('sv-SE')} kr
              </div>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Detta är en uppskattning baserad på dina uppgifter. Vill du gå vidare?
              </p>
              <Button 
                onClick={handleContinue}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-4 text-base font-semibold"
              >
                JA – JAG VILL GÅ VIDARE
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (currentStep === "thanks") {
    return (
      <div className="min-h-screen bg-gray-50">
        <MobileProgress step={currentStep} />
        <div className="p-4 space-y-4">
          <Card className="bg-white shadow-sm border-0 rounded-2xl overflow-hidden">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-500" />
              </div>
              <h1 className="text-xl font-bold text-gray-900 mb-3">
                Tack för din förfrågan!
              </h1>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                En av våra lånespecialister kommer att kontakta dig inom kort.
              </p>
              <Card className="bg-green-50 border-green-200 rounded-xl">
                <CardContent className="p-4">
                  <div className="space-y-2 text-sm text-green-800">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                      <span>Din förfrågan är mottagen</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                      <span>Kontakt inom 24 timmar</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                      <span>Helt utan kostnad</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="p-6 text-center">
          <h1 className="text-2xl font-bold mb-4 leading-tight">
            VILL DU HA ETT PRIVATLÅN?
          </h1>
          <p className="text-base mb-6 opacity-90 leading-relaxed">
            Vi hjälper dig att få lån beviljat. Inget krav på kreditvärdighet.
          </p>
          <Button 
            onClick={scrollToForm}
            className="w-full bg-white text-blue-600 hover:bg-gray-100 rounded-xl py-4 text-base font-semibold"
          >
            FÅ DITT BESKED NU
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Benefits Widgets */}
      <div className="p-4 space-y-3">
        <div className="grid grid-cols-1 gap-3">
          <Card className="bg-white shadow-sm border-0 rounded-2xl">
            <CardContent className="p-4 flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">Inga kreditupplysningar</h3>
                <p className="text-xs text-gray-600">Påverkar inte din kreditvärdighet</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border-0 rounded-2xl">
            <CardContent className="p-4 flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">Svar direkt – gratis</h3>
                <p className="text-xs text-gray-600">Få besked inom sekunder</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border-0 rounded-2xl">
            <CardContent className="p-4 flex items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mr-4">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">Personlig rådgivning</h3>
                <p className="text-xs text-gray-600">Våra experter hjälper dig</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* How it Works */}
      <div className="p-4">
        <Card className="bg-white shadow-sm border-0 rounded-2xl">
          <CardContent className="p-6">
            <h2 className="text-lg font-bold text-center text-gray-900 mb-6">
              Så fungerar det
            </h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">Fyll i dina uppgifter</h3>
                  <p className="text-xs text-gray-600">Namn, personnummer, inkomst</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">Få besked direkt</h3>
                  <p className="text-xs text-gray-600">Baserat på dina siffror</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">Vi kontaktar dig</h3>
                  <p className="text-xs text-gray-600">Hjälper dig säkra lånet</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Loan Form Section */}
      <div id="loan-form" className="p-4">
        <Card className="bg-white shadow-sm border-0 rounded-2xl">
          <CardContent className="p-6">
            <h2 className="text-lg font-bold text-center text-gray-900 mb-6">
              Få ditt preliminära lånebesked
            </h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">Förnamn</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className={`mt-1 h-12 text-sm border-gray-200 rounded-xl ${
                      errors.firstName ? 'border-red-300 bg-red-50' : ''
                    }`}
                  />
                  {errors.firstName && (
                    <div className="flex items-center mt-1 text-red-500 text-xs">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      <span>{errors.firstName}</span>
                    </div>
                  )}
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">Efternamn</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className={`mt-1 h-12 text-sm border-gray-200 rounded-xl ${
                      errors.lastName ? 'border-red-300 bg-red-50' : ''
                    }`}
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
                <Label htmlFor="personalNumber" className="text-sm font-medium text-gray-700">Personnummer</Label>
                <Input
                  id="personalNumber"
                  placeholder="YYYYMMDD-XXXX"
                  value={formData.personalNumber}
                  onChange={handlePersonalNumberChange}
                  className={`mt-1 h-12 text-sm border-gray-200 rounded-xl ${
                    errors.personalNumber ? 'border-red-300 bg-red-50' : ''
                  }`}
                />
                {errors.personalNumber && (
                  <div className="flex items-center mt-1 text-red-500 text-xs">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    <span>{errors.personalNumber}</span>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">E-postadress</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className={`mt-1 h-12 text-sm border-gray-200 rounded-xl ${
                    errors.email ? 'border-red-300 bg-red-50' : ''
                  }`}
                />
                {errors.email && (
                  <div className="flex items-center mt-1 text-red-500 text-xs">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    <span>{errors.email}</span>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Mobilnummer</Label>
                <Input
                  id="phone"
                  placeholder="07X-XXX XX XX"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className={`mt-1 h-12 text-sm border-gray-200 rounded-xl ${
                    errors.phone ? 'border-red-300 bg-red-50' : ''
                  }`}
                />
                {errors.phone && (
                  <div className="flex items-center mt-1 text-red-500 text-xs">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    <span>{errors.phone}</span>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="income" className="text-sm font-medium text-gray-700">Årsinkomst före skatt (kr)</Label>
                <Input
                  id="income"
                  type="number"
                  placeholder="250000"
                  value={formData.income}
                  onChange={(e) => setFormData({...formData, income: e.target.value})}
                  className={`mt-1 h-12 text-sm border-gray-200 rounded-xl ${
                    errors.income ? 'border-red-300 bg-red-50' : ''
                  }`}
                />
                {errors.income && (
                  <div className="flex items-center mt-1 text-red-500 text-xs">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    <span>{errors.income}</span>
                  </div>
                )}
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Har du skulder hos Kronofogden?</Label>
                <RadioGroup
                  value={formData.hasDebts}
                  onValueChange={(value) => setFormData({...formData, hasDebts: value})}
                  className="mt-2 flex gap-6"
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

              <Card className="bg-green-50 border-green-200 rounded-xl">
                <CardContent className="p-4">
                  <p className="text-xs text-green-800 leading-relaxed">
                    <strong>🔒 Trygg hantering:</strong> Dina uppgifter behandlas enligt GDPR. 
                    Ingen kreditupplysning görs.
                  </p>
                </CardContent>
              </Card>

              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-4 text-base font-semibold"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    BEARBETAR...
                  </>
                ) : (
                  <>
                    VISA HUR MYCKET JAG KAN FÅ
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Contact Section */}
      <div className="p-4 pb-8">
        <Card className="bg-white shadow-sm border-0 rounded-2xl">
          <CardContent className="p-6">
            <h2 className="text-lg font-bold text-center text-gray-900 mb-6">
              Kontakta oss
            </h2>
            <div className="space-y-3">
              <Card className="bg-gray-50 border-0 rounded-xl">
                <CardContent className="p-4 flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mr-3">
                    <Mail className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">E-post</h3>
                    <p className="text-xs text-green-600 font-medium">info@privatlan.se</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-50 border-0 rounded-xl">
                <CardContent className="p-4 flex items-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mr-3">
                    <Clock className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">Öppettider</h3>
                    <p className="text-xs text-purple-600 font-medium">Mån-Fre 8-17, Lör 9-14</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-50 border-0 rounded-xl">
                <CardContent className="p-4 flex items-center">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center mr-3">
                    <MapPin className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">Adress</h3>
                    <p className="text-xs text-orange-600 font-medium">Drottninggatan 1, Stockholm</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
