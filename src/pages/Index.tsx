
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle, Shield, Clock, Users, Loader2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useFormValidation, formValidationRules } from "@/hooks/useFormValidation";
import ContactSection from "@/components/ContactSection";
import ProgressSteps from "@/components/ProgressSteps";
import LoanCalculator from "@/components/LoanCalculator";

const Index = () => {
  const [currentStep, setCurrentStep] = useState<"form" | "result" | "thanks">("form");
  const [loanAmount, setLoanAmount] = useState(95000);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const { errors, isValid } = useFormValidation(formData, formValidationRules);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValid) {
      toast({
        title: "Kontrollera formuläret",
        description: "Vänligen rätta till felen innan du fortsätter.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulera API-anrop
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Beräkna lånebelopp baserad på inkomst och skulder
    const income = parseInt(formData.income);
    const baseAmount = income * 3;
    const debtPenalty = formData.hasDebts === "yes" ? 0.3 : 0;
    const calculatedAmount = Math.min(Math.max(baseAmount * (1 - debtPenalty), 30000), 500000);
    
    setLoanAmount(Math.round(calculatedAmount));
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
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-fade-in">
        <Card className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl shadow-2xl animate-scale-in">
          <CardContent className="p-4 sm:p-6 md:p-8 text-center">
            <ProgressSteps currentStep={currentStep} />
            <div className="mb-4 sm:mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 animate-pulse">
                <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-2 px-2">
                Du kan preliminärt beviljas:
              </h1>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-600 mb-3 sm:mb-4 animate-bounce">
                {loanAmount.toLocaleString('sv-SE')} kr
              </div>
              <p className="text-base sm:text-lg text-slate-600 mb-4 sm:mb-6 px-2 leading-relaxed">
                Detta är en uppskattning baserad på dina uppgifter.<br className="hidden sm:block" />
                <span className="block sm:inline"> Vill du gå vidare och få hjälp att säkra lånet?</span>
              </p>
            </div>
            <Button 
              onClick={handleContinue}
              size="lg"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold hover:scale-105 transition-all duration-300"
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-fade-in">
        <Card className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl shadow-2xl animate-scale-in">
          <CardContent className="p-4 sm:p-6 md:p-8 text-center">
            <ProgressSteps currentStep={currentStep} />
            <div className="mb-4 sm:mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 animate-pulse">
                <Users className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 sm:mb-4 px-2">
                Tack för din förfrågan!
              </h1>
              <p className="text-base sm:text-lg text-slate-600 mb-4 sm:mb-6 px-2 leading-relaxed">
                En av våra lånespecialister kommer att kontakta dig inom kort.<br className="hidden sm:block" />
                <span className="block sm:inline"> Vi har fått dina uppgifter och behandlar dem nu konfidentiellt.</span>
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4 animate-fade-in">
                <p className="text-green-800 font-medium text-sm sm:text-base leading-relaxed">
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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center text-white px-4 sm:px-6 lg:px-8 animate-fade-in">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight px-2 animate-slide-in-from-top">
            VILL DU HA ETT PRIVATLÅN – MEN BLIR ALLTID NEKAD?
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6 sm:mb-8 leading-relaxed max-w-4xl mx-auto px-2 animate-slide-in-from-bottom">
            Vi hjälper dig att få lån beviljat. Inget krav på kreditvärdighet.<br className="hidden sm:block" />
            <span className="block sm:inline"> Inga kreditupplysningar. Inget bindande.</span>
          </p>
          <Button 
            onClick={scrollToForm}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-4 sm:py-6 text-lg sm:text-xl font-semibold transition-all duration-300 hover:scale-105 w-full sm:w-auto animate-pulse"
          >
            👉 FÅ DITT BESKED NU
          </Button>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            <div className="text-center p-4 sm:p-6 hover:scale-105 transition-all duration-300 animate-fade-in">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 hover:bg-green-200 transition-colors duration-300">
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Inga kreditupplysningar</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Ditt besked påverkar inte din kreditvärdighet.
              </p>
            </div>
            <div className="text-center p-4 sm:p-6 hover:scale-105 transition-all duration-300 animate-fade-in">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 hover:bg-purple-200 transition-colors duration-300">
                <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Svar direkt – gratis</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Du får veta direkt hur mycket du kan få beviljat.
              </p>
            </div>
            <div className="text-center p-4 sm:p-6 sm:col-span-2 lg:col-span-1 hover:scale-105 transition-all duration-300 animate-fade-in">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 hover:bg-orange-200 transition-colors duration-300">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Personlig rådgivning</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Våra experter kontaktar dig om du vill gå vidare.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Loan Calculator Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 animate-fade-in">
              Beräkna ditt lån
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in">
              Använd vår interaktiva kalkylator för att se vad du kan låna baserat på din ekonomiska situation.
            </p>
          </div>
          <LoanCalculator onAmountChange={setLoanAmount} />
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12 max-w-4xl mx-auto leading-tight animate-fade-in">
            Så fungerar det – enkelt, snabbt och tryggt
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            <div className="relative p-4 sm:p-6 hover:scale-105 transition-all duration-300 animate-fade-in">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 text-lg sm:text-xl font-bold hover:bg-blue-700 transition-colors duration-300">
                1
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Fyll i dina uppgifter</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Namn, personnummer, inkomst etc.
              </p>
            </div>
            <div className="relative p-4 sm:p-6 hover:scale-105 transition-all duration-300 animate-fade-in">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 text-lg sm:text-xl font-bold hover:bg-blue-700 transition-colors duration-300">
                2
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Få besked direkt</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Inga register kontrolleras, bara baserat på dina siffror.
              </p>
            </div>
            <div className="relative p-4 sm:p-6 hover:scale-105 transition-all duration-300 animate-fade-in">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 text-lg sm:text-xl font-bold hover:bg-blue-700 transition-colors duration-300">
                3
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Vi kontaktar dig</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Om du vill gå vidare hjälper vi dig säkra lånet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Loan Form Section */}
      <section id="loan-form" className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-4 sm:p-6 md:p-8">
              <ProgressSteps currentStep={currentStep} />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 leading-tight">
                Få ditt preliminära lånebesked
              </h2>
              <form onSubmit={handleFormSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-sm sm:text-base">Förnamn</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className={`mt-1 h-10 sm:h-11 text-sm sm:text-base transition-all duration-300 hover:border-blue-400 focus:border-blue-500 ${
                        errors.firstName ? 'border-red-500' : ''
                      }`}
                      required
                    />
                    {errors.firstName && (
                      <div className="flex items-center mt-1 text-red-500 text-xs animate-fade-in">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors.firstName}
                      </div>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-sm sm:text-base">Efternamn</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className={`mt-1 h-10 sm:h-11 text-sm sm:text-base transition-all duration-300 hover:border-blue-400 focus:border-blue-500 ${
                        errors.lastName ? 'border-red-500' : ''
                      }`}
                      required
                    />
                    {errors.lastName && (
                      <div className="flex items-center mt-1 text-red-500 text-xs animate-fade-in">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors.lastName}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="personalNumber" className="text-sm sm:text-base">Personnummer</Label>
                  <Input
                    id="personalNumber"
                    placeholder="YYYYMMDD-XXXX"
                    value={formData.personalNumber}
                    onChange={(e) => setFormData({...formData, personalNumber: e.target.value})}
                    className={`mt-1 h-10 sm:h-11 text-sm sm:text-base transition-all duration-300 hover:border-blue-400 focus:border-blue-500 ${
                      errors.personalNumber ? 'border-red-500' : ''
                    }`}
                    required
                  />
                  {errors.personalNumber && (
                    <div className="flex items-center mt-1 text-red-500 text-xs animate-fade-in">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.personalNumber}
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm sm:text-base">E-postadress</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className={`mt-1 h-10 sm:h-11 text-sm sm:text-base transition-all duration-300 hover:border-blue-400 focus:border-blue-500 ${
                      errors.email ? 'border-red-500' : ''
                    }`}
                    required
                  />
                  {errors.email && (
                    <div className="flex items-center mt-1 text-red-500 text-xs animate-fade-in">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.email}
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone" className="text-sm sm:text-base">Mobilnummer</Label>
                  <Input
                    id="phone"
                    placeholder="07X-XXX XX XX"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className={`mt-1 h-10 sm:h-11 text-sm sm:text-base transition-all duration-300 hover:border-blue-400 focus:border-blue-500 ${
                      errors.phone ? 'border-red-500' : ''
                    }`}
                    required
                  />
                  {errors.phone && (
                    <div className="flex items-center mt-1 text-red-500 text-xs animate-fade-in">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.phone}
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="income" className="text-sm sm:text-base">Årsinkomst före skatt (kr)</Label>
                  <Input
                    id="income"
                    type="number"
                    placeholder="250000"
                    value={formData.income}
                    onChange={(e) => setFormData({...formData, income: e.target.value})}
                    className={`mt-1 h-10 sm:h-11 text-sm sm:text-base transition-all duration-300 hover:border-blue-400 focus:border-blue-500 ${
                      errors.income ? 'border-red-500' : ''
                    }`}
                    required
                  />
                  {errors.income && (
                    <div className="flex items-center mt-1 text-red-500 text-xs animate-fade-in">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.income}
                    </div>
                  )}
                </div>

                <div>
                  <Label className="text-sm sm:text-base font-medium">Har du skulder hos Kronofogden?</Label>
                  <RadioGroup
                    value={formData.hasDebts}
                    onValueChange={(value) => setFormData({...formData, hasDebts: value})}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="debts-yes" />
                      <Label htmlFor="debts-yes" className="text-sm sm:text-base">Ja</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="debts-no" />
                      <Label htmlFor="debts-no" className="text-sm sm:text-base">Nej</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4 text-xs sm:text-sm text-green-800 animate-fade-in">
                  <p className="leading-relaxed">
                    <strong>🔒 Trygg hantering:</strong> Dina uppgifter behandlas enligt GDPR. 
                    Ingen kreditupplysning görs.
                  </p>
                </div>

                <Button 
                  type="submit"
                  size="lg"
                  disabled={!isValid || isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 sm:py-6 text-base sm:text-lg font-semibold h-auto transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      BEARBETAR...
                    </>
                  ) : (
                    "👉 VISA HUR MYCKET JAG KAN FÅ"
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
