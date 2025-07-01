import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileApp from "@/components/MobileApp";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle, Shield, Clock, Users, Loader2, AlertCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSmartFormValidation, formValidationRules } from "@/hooks/useSmartFormValidation";
import ContactSection from "@/components/ContactSection";
import ProgressSteps from "@/components/ProgressSteps";
import BankSelector from "@/components/BankSelector";

const Index = () => {
  const isMobile = useIsMobile();
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
    hasDebts: "",
    bank: "",
    referralId: ""
  });

  const extendedValidationRules = {
    ...formValidationRules,
    bank: (value: string) => {
      if (!value || value.trim() === "") {
        return "Vänligen välj din bank";
      }
      return null;
    }
  };

  const { errors, isValid, triggerValidation } = useSmartFormValidation(formData, extendedValidationRules);

  const handleBack = () => {
    if (currentStep === "result") {
      setCurrentStep("form");
    } else if (currentStep === "thanks") {
      setCurrentStep("result");
    }
  };

  // If mobile, render the mobile app
  if (isMobile) {
    return (
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
    );
  }

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

  if (currentStep === "result") {
    if (isRejected) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 flex items-center justify-center p-3 sm:p-4 lg:p-6">
          <Card className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl shadow-2xl mx-3">
            <CardContent className="p-4 sm:p-6 md:p-8 text-center">
              <ProgressSteps currentStep={currentStep} onBack={handleBack} />
              <div className="mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <XCircle className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
                </div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-3 px-1 leading-tight">
                  Tyvärr kan vi inte hjälpa dig just nu
                </h1>
                <p className="text-sm sm:text-base text-slate-600 mb-4 px-1 leading-relaxed">
                  På grund av befintliga skulder hos Kronofogden kan vi tyvärr inte erbjuda dig ett lån för tillfället.
                  <span className="block mt-2"> Vi rekommenderar att du kontaktar en skuldrådgivare för hjälp.</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-3 sm:p-4 lg:p-6">
        <Card className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl shadow-2xl mx-3">
          <CardContent className="p-4 sm:p-6 md:p-8 text-center">
            <ProgressSteps currentStep={currentStep} onBack={handleBack} />
            <div className="mb-4 sm:mb-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-3 px-1 leading-tight">
                Fantastiskt! Du kan få upp till:
              </h1>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 mb-3 break-all">
                {loanAmount.toLocaleString('sv-SE')} kr
              </div>
              <p className="text-sm sm:text-base text-slate-600 mb-4 px-1 leading-relaxed">
                Detta är ett lånelöfte baserat på dina uppgifter.
                <span className="block mt-2"> Vill du gå vidare och säkra ditt lån?</span>
              </p>
            </div>
            <Button 
              onClick={handleContinue}
              size="lg"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 sm:px-6 sm:py-4 text-sm sm:text-base font-semibold"
            >
              👉 JA – JAG VILL GÅ VIDARE
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (currentStep === "thanks") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-3 sm:p-4 lg:p-6">
        <Card className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl shadow-2xl mx-3">
          <CardContent className="p-4 sm:p-6 md:p-8 text-center">
            <ProgressSteps currentStep={currentStep} onBack={handleBack} />
            <div className="mb-4 sm:mb-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-3 px-1 leading-tight">
                Tack för din förfrågan!
              </h1>
              <p className="text-sm sm:text-base text-slate-600 mb-4 px-1 leading-relaxed">
                En av våra lånespecialister kommer att kontakta dig inom kort.
                <span className="block mt-2"> Vi har fått dina uppgifter och behandlar dem nu konfidentiellt.</span>
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-green-800 font-medium text-xs sm:text-sm leading-relaxed">
                  ✓ Din förfrågan är mottagen<br />
                  ✓ Kontakt inom 24 timmar<br />
                  ✓ Helt utan kostnad eller förpliktelse
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section with updated catchy text */}
      <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center text-white px-3 sm:px-4 lg:px-6">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto w-full">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight px-2 break-words">
            ETT LÅNELÖFTE DIREKT I HANDEN, UTAN TJAFS!
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 leading-relaxed max-w-3xl mx-auto px-2">
            🎯 Privatlån • Billån • Bolån - Vi fixar allt!
            <span className="block mt-2"> ✅ Inget krav på kreditvärdighet • ⚡ Svar på 2 minuter</span>
          </p>
          <Button 
            onClick={scrollToForm}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-lg font-semibold w-full sm:w-auto max-w-xs sm:max-w-none mx-auto"
          >
            🎯 FÅ DITT LÅNELÖFTE NU
          </Button>
        </div>
      </section>

      {/* Benefits Section with updated text */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
            <div className="text-center p-3 sm:p-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
              </div>
              <h3 className="text-base sm:text-lg font-bold mb-2">Lånelöfte utan UC</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Får ditt besked direkt utan att påverka kreditvärdigheten.
              </p>
            </div>
            <div className="text-center p-3 sm:p-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
              </div>
              <h3 className="text-base sm:text-lg font-bold mb-2">Alla låntyper</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Privatlån, billån, bolån - vi fixar det bästa för dig.
              </p>
            </div>
            <div className="text-center p-3 sm:p-4 md:col-span-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
              </div>
              <h3 className="text-base sm:text-lg font-bold mb-2">Utan tjafs</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Enkelt, snabbt och helt utan krångel eller bindning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 max-w-3xl mx-auto leading-tight px-2">
            🚀 Så enkelt får du ditt lånelöfte
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
            <div className="relative p-3 sm:p-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 text-sm sm:text-lg font-bold">
                1
              </div>
              <h3 className="text-base sm:text-lg font-bold mb-2">Fyll i enkla uppgifter</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Namn, bank, inkomst och några snabba frågor.
              </p>
            </div>
            <div className="relative p-3 sm:p-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 text-sm sm:text-lg font-bold">
                2
              </div>
              <h3 className="text-base sm:text-lg font-bold mb-2">Få ditt lånelöfte</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Direkt besked utan UC-kontroll eller krångel.
              </p>
            </div>
            <div className="relative p-3 sm:p-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 text-sm sm:text-lg font-bold">
                3
              </div>
              <h3 className="text-base sm:text-lg font-bold mb-2">Vi ordnar allt</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Våra experter fixar det bästa lånet för dig.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Loan Form Section with Bank Selector */}
      <section id="loan-form" className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6">
          <Card className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto shadow-xl">
            <CardContent className="p-4 sm:p-6 md:p-8">
              <ProgressSteps currentStep={currentStep} onBack={handleBack} />
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center mb-4 sm:mb-6 leading-tight px-2">
                🎯 Få ditt lånelöfte direkt
              </h2>
              <form onSubmit={handleFormSubmit} className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="firstName" className="text-sm font-medium">Förnamn</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className={`mt-1 h-10 text-sm ${
                        errors.firstName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      required
                    />
                    {errors.firstName && (
                      <div className="flex items-center mt-1 text-red-500 text-xs">
                        <AlertCircle className="w-3 h-3 mr-1 flex-shrink-0" />
                        <span>{errors.firstName}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-sm font-medium">Efternamn</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className={`mt-1 h-10 text-sm ${
                        errors.lastName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      required
                    />
                    {errors.lastName && (
                      <div className="flex items-center mt-1 text-red-500 text-xs">
                        <AlertCircle className="w-3 h-3 mr-1 flex-shrink-0" />
                        <span>{errors.lastName}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="personalNumber" className="text-sm font-medium">Personnummer</Label>
                  <Input
                    id="personalNumber"
                    placeholder="YYYYMMDD-XXXX"
                    value={formData.personalNumber}
                    onChange={handlePersonalNumberChange}
                    className={`mt-1 h-10 text-sm ${
                      errors.personalNumber ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  />
                  {errors.personalNumber && (
                    <div className="flex items-center mt-1 text-red-500 text-xs">
                      <AlertCircle className="w-3 h-3 mr-1 flex-shrink-0" />
                      <span className="break-words">{errors.personalNumber}</span>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium">E-postadress</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className={`mt-1 h-10 text-sm ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  />
                  {errors.email && (
                    <div className="flex items-center mt-1 text-red-500 text-xs">
                      <AlertCircle className="w-3 h-3 mr-1 flex-shrink-0" />
                      <span>{errors.email}</span>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone" className="text-sm font-medium">Mobilnummer</Label>
                  <Input
                    id="phone"
                    placeholder="07X-XXX XX XX"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className={`mt-1 h-10 text-sm ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  />
                  {errors.phone && (
                    <div className="flex items-center mt-1 text-red-500 text-xs">
                      <AlertCircle className="w-3 h-3 mr-1 flex-shrink-0" />
                      <span>{errors.phone}</span>
                    </div>
                  )}
                </div>

                <BankSelector
                  value={formData.bank}
                  onChange={(value) => setFormData({...formData, bank: value})}
                  error={errors.bank}
                />

                <div>
                  <Label htmlFor="income" className="text-sm font-medium">Årsinkomst före skatt (kr)</Label>
                  <Input
                    id="income"
                    type="number"
                    placeholder="250000"
                    value={formData.income}
                    onChange={(e) => setFormData({...formData, income: e.target.value})}
                    className={`mt-1 h-10 text-sm ${
                      errors.income ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  />
                  {errors.income && (
                    <div className="flex items-center mt-1 text-red-500 text-xs">
                      <AlertCircle className="w-3 h-3 mr-1 flex-shrink-0" />
                      <span className="break-words">{errors.income}</span>
                    </div>
                  )}
                </div>

                <div>
                  <Label className="text-sm font-medium">Har du skulder hos Kronofogden?</Label>
                  <RadioGroup
                    value={formData.hasDebts}
                    onValueChange={(value) => setFormData({...formData, hasDebts: value})}
                    className="mt-2 space-y-2"
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

                <div>
                  <Label htmlFor="referralId" className="text-sm font-medium">
                    Referral ID (frivilligt)
                  </Label>
                  <Input
                    id="referralId"
                    placeholder="Ange referral ID om du har ett"
                    value={formData.referralId}
                    onChange={(e) => setFormData({...formData, referralId: e.target.value})}
                    className="mt-1 h-10 text-sm border-gray-300"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Om någon rekommenderat dig, ange deras referral ID här
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-xs sm:text-sm text-green-800">
                  <p className="leading-relaxed">
                    <strong>🔒 Trygg hantering:</strong> Dina uppgifter behandlas enligt GDPR. 
                    Ingen kreditupplysning görs.
                  </p>
                </div>

                <Button 
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 sm:py-4 text-sm sm:text-base font-semibold h-auto"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      BEARBETAR...
                    </>
                  ) : (
                    "🎯 FÅ DITT LÅNELÖFTE NU"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
};

export default Index;
