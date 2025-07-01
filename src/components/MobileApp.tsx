import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle, Shield, Clock, Users, Loader2, AlertCircle, XCircle, ArrowRight, Star, Zap, ArrowLeft, Phone, Mail, MapPin, MessageCircle, Award, TrendingUp, Lock } from "lucide-react";
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
    hasDebts: "",
    referralId: ""
  });

  const { errors, isValid, triggerValidation } = useSmartFormValidation(formData, formValidationRules);

  const handleBack = () => {
    if (currentStep === "result") {
      setCurrentStep("form");
    } else if (currentStep === "thanks") {
      setCurrentStep("result");
    }
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
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-red-100 to-orange-50">
          <div className="p-6">
            <div className="max-w-sm mx-auto pt-12">
              <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-lg rounded-3xl overflow-hidden">
                <CardContent className="p-8 text-center">
                  <div className="mb-6">
                    <Button
                      onClick={handleBack}
                      variant="ghost"
                      size="sm"
                      className="flex items-center text-sm mb-6 text-gray-600 hover:text-gray-800"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Tillbaka
                    </Button>
                  </div>
                  <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <XCircle className="w-10 h-10 text-white" />
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                    Tyvärr kan vi inte hjälpa dig
                  </h1>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    På grund av befintliga skulder kan vi tyvärr inte erbjuda dig ett lån för tillfället.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-6">
                    <div className="flex items-center mb-3">
                      <Shield className="w-5 h-5 text-blue-600 mr-2" />
                      <span className="font-semibold text-blue-900">Rekommendation</span>
                    </div>
                    <p className="text-sm text-blue-800 leading-relaxed">
                      Vi rekommenderar att du kontaktar en skuldrådgivare för professionell hjälp med din ekonomiska situation.
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
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-100 to-teal-50">
        <div className="p-6">
          <div className="max-w-sm mx-auto pt-12">
            <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-lg rounded-3xl overflow-hidden">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <Button
                    onClick={handleBack}
                    variant="ghost"
                    size="sm"
                    className="flex items-center text-sm mb-6 text-gray-600 hover:text-gray-800"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Tillbaka
                  </Button>
                </div>
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">
                  Fantastiskt! Du kan få:
                </h1>
                <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6">
                  {loanAmount.toLocaleString('sv-SE')} kr
                </div>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Detta är en preliminär bedömning baserad på dina uppgifter. Vill du gå vidare för att säkra ditt lån?
                </p>
                <Button 
                  onClick={handleContinue}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  JA – JAG VILL GÅ VIDARE
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <div className="mt-6 flex items-center justify-center text-sm text-gray-500">
                  <Lock className="w-4 h-4 mr-2" />
                  <span>100% säker och konfidentiell</span>
                </div>
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-50">
        <div className="p-6">
          <div className="max-w-sm mx-auto pt-12">
            <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-lg rounded-3xl overflow-hidden">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <Button
                    onClick={handleBack}
                    variant="ghost"
                    size="sm"
                    className="flex items-center text-sm mb-6 text-gray-600 hover:text-gray-800"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Tillbaka
                  </Button>
                </div>
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                  Tack för din förfrågan!
                </h1>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  En av våra erfarna lånespecialister kommer att kontakta dig inom kort för att hjälpa dig vidare.
                </p>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 mb-6">
                  <div className="space-y-4">
                    <div className="flex items-center text-green-800">
                      <CheckCircle className="w-5 h-5 mr-3 text-green-600" />
                      <span className="font-medium">Din förfrågan är mottagen</span>
                    </div>
                    <div className="flex items-center text-green-800">
                      <Clock className="w-5 h-5 mr-3 text-green-600" />
                      <span className="font-medium">Kontakt inom 24 timmar</span>
                    </div>
                    <div className="flex items-center text-green-800">
                      <Shield className="w-5 h-5 mr-3 text-green-600" />
                      <span className="font-medium">Helt utan kostnad</span>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                  <p className="text-sm text-blue-800 font-medium">
                    💡 Tips: Håll din telefon redo – vi ringer vanligtvis inom några timmar!
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Enhanced Mobile Hero */}
      <div className="relative pt-16 pb-12 px-6">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-center text-white max-w-sm mx-auto">
          <div className="mb-6">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-lg rounded-full px-4 py-2 mb-4">
              <Award className="w-4 h-4 mr-2 text-yellow-400" />
              <span className="text-sm font-medium">Betrodd av 10,000+ kunder</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4 leading-tight">
            VILL DU HA ETT PRIVATLÅN – MEN BLIR ALLTID NEKAD?
          </h1>
          <p className="text-lg text-blue-100 mb-8 leading-relaxed">
            Vi hjälper dig att få lån beviljat. Inget krav på kreditvärdighet.
            <span className="block mt-2 font-semibold">Inga kreditupplysningar. Inget bindande.</span>
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm">
            <div className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-1 text-green-400" />
              <span>95% godkännande</span>
            </div>
            <div className="w-1 h-1 bg-white/50 rounded-full"></div>
            <div className="flex items-center">
              <Zap className="w-4 h-4 mr-1 text-yellow-400" />
              <span>Svar på 2 min</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Benefits Cards */}
      <div className="px-6 pb-12">
        <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto mb-12">
          <Card className="bg-white/10 backdrop-blur-lg border-0 hover:bg-white/15 transition-all duration-300">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm text-white font-semibold mb-1">Ingen kredit-kontroll</p>
              <p className="text-xs text-blue-200">Påverkar ej UC</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-lg border-0 hover:bg-white/15 transition-all duration-300">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm text-white font-semibold mb-1">Svar direkt</p>
              <p className="text-xs text-blue-200">På 2 minuter</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-lg border-0 hover:bg-white/15 transition-all duration-300">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                <Star className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm text-white font-semibold mb-1">Personlig hjälp</p>
              <p className="text-xs text-blue-200">Från experter</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Enhanced How it Works Section - Mobile */}
      <div className="px-6 pb-12">
        <div className="max-w-sm mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8 leading-tight">
            Så fungerar det – enkelt, snabbt och tryggt
          </h2>
          <div className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-lg border-0">
              <CardContent className="p-6 flex items-start">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl flex items-center justify-center mr-4 flex-shrink-0 font-bold text-lg shadow-lg">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">Fyll i dina uppgifter</h3>
                  <p className="text-sm text-blue-100 leading-relaxed">Namn, personnummer, inkomst och några enkla frågor. Tar bara 2 minuter.</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-lg border-0">
              <CardContent className="p-6 flex items-start">
                <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 text-white rounded-2xl flex items-center justify-center mr-4 flex-shrink-0 font-bold text-lg shadow-lg">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">Få besked direkt</h3>
                  <p className="text-sm text-blue-100 leading-relaxed">Inga register kontrolleras, endast baserat på dina siffror. Inget UC-spår.</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-lg border-0">
              <CardContent className="p-6 flex items-start">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-2xl flex items-center justify-center mr-4 flex-shrink-0 font-bold text-lg shadow-lg">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">Vi kontaktar dig</h3>
                  <p className="text-sm text-blue-100 leading-relaxed">Om du vill gå vidare hjälper våra experter dig säkra det bästa lånet.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Form */}
      <div className="px-6 pb-12">
        <Card className="max-w-sm mx-auto shadow-2xl border-0 bg-white/98 backdrop-blur-lg rounded-3xl overflow-hidden">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">
                Få ditt lånebesked
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Fyll i dina uppgifter nedan för att se hur mycket du kan få
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-lg font-black text-gray-900 mb-4 block">
                    FÖRNAMN
                  </Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className={`h-16 text-lg font-semibold rounded-2xl border-3 transition-all duration-300 bg-white text-gray-900 placeholder:text-gray-500 ${
                      errors.firstName 
                        ? 'border-red-500 focus:border-red-600 focus:ring-4 focus:ring-red-200' 
                        : 'border-gray-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-200'
                    }`}
                    placeholder="Ange förnamn"
                    required
                  />
                  {errors.firstName && (
                    <div className="flex items-center mt-3 text-red-700 text-base font-bold">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      <span>{errors.firstName}</span>
                    </div>
                  )}
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-lg font-black text-gray-900 mb-4 block">
                    EFTERNAMN
                  </Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className={`h-16 text-lg font-semibold rounded-2xl border-3 transition-all duration-300 bg-white text-gray-900 placeholder:text-gray-500 ${
                      errors.lastName 
                        ? 'border-red-500 focus:border-red-600 focus:ring-4 focus:ring-red-200' 
                        : 'border-gray-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-200'
                    }`}
                    placeholder="Ange efternamn"
                    required
                  />
                  {errors.lastName && (
                    <div className="flex items-center mt-3 text-red-700 text-base font-bold">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      <span>{errors.lastName}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="personalNumber" className="text-lg font-black text-gray-900 mb-4 block">
                  PERSONNUMMER
                </Label>
                <Input
                  id="personalNumber"
                  placeholder="ÅÅÅÅMMDD-XXXX"
                  value={formData.personalNumber}
                  onChange={handlePersonalNumberChange}
                  className={`h-16 text-lg font-semibold rounded-2xl border-3 transition-all duration-300 bg-white text-gray-900 placeholder:text-gray-500 ${
                    errors.personalNumber 
                      ? 'border-red-500 focus:border-red-600 focus:ring-4 focus:ring-red-200' 
                      : 'border-gray-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-200'
                  }`}
                  required
                />
                {errors.personalNumber && (
                  <div className="flex items-center mt-3 text-red-700 text-base font-bold">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    <span>{errors.personalNumber}</span>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="email" className="text-lg font-black text-gray-900 mb-4 block">
                  E-POSTADRESS
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className={`h-16 text-lg font-semibold rounded-2xl border-3 transition-all duration-300 bg-white text-gray-900 placeholder:text-gray-500 ${
                    errors.email 
                      ? 'border-red-500 focus:border-red-600 focus:ring-4 focus:ring-red-200' 
                      : 'border-gray-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-200'
                  }`}
                  placeholder="exempel@email.com"
                  required
                />
                {errors.email && (
                  <div className="flex items-center mt-3 text-red-700 text-base font-bold">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    <span>{errors.email}</span>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="phone" className="text-lg font-black text-gray-900 mb-4 block">
                  MOBILNUMMER
                </Label>
                <Input
                  id="phone"
                  placeholder="07X-XXX XX XX"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className={`h-16 text-lg font-semibold rounded-2xl border-3 transition-all duration-300 bg-white text-gray-900 placeholder:text-gray-500 ${
                    errors.phone 
                      ? 'border-red-500 focus:border-red-600 focus:ring-4 focus:ring-red-200' 
                      : 'border-gray-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-200'
                  }`}
                  required
                />
                {errors.phone && (
                  <div className="flex items-center mt-3 text-red-700 text-base font-bold">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    <span>{errors.phone}</span>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="income" className="text-lg font-black text-gray-900 mb-4 block">
                  ÅRSINKOMST (KR)
                </Label>
                <Input
                  id="income"
                  type="number"
                  placeholder="250 000"
                  value={formData.income}
                  onChange={(e) => setFormData({...formData, income: e.target.value})}
                  className={`h-16 text-lg font-semibold rounded-2xl border-3 transition-all duration-300 bg-white text-gray-900 placeholder:text-gray-500 ${
                    errors.income 
                      ? 'border-red-500 focus:border-red-600 focus:ring-4 focus:ring-red-200' 
                      : 'border-gray-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-200'
                  }`}
                  required
                />
                {errors.income && (
                  <div className="flex items-center mt-3 text-red-700 text-base font-bold">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    <span>{errors.income}</span>
                  </div>
                )}
              </div>

              <div>
                <Label className="text-lg font-black text-gray-900 mb-6 block">
                  SKULDER HOS KRONOFOGDEN?
                </Label>
                <RadioGroup
                  value={formData.hasDebts}
                  onValueChange={(value) => setFormData({...formData, hasDebts: value})}
                  className="flex gap-10"
                >
                  <div className="flex items-center space-x-4">
                    <RadioGroupItem value="yes" id="debts-yes" className="w-8 h-8 border-3 border-gray-500" />
                    <Label htmlFor="debts-yes" className="text-xl font-bold text-gray-900 cursor-pointer">JA</Label>
                  </div>
                  <div className="flex items-center space-x-4">
                    <RadioGroupItem value="no" id="debts-no" className="w-8 h-8 border-3 border-gray-500" />
                    <Label htmlFor="debts-no" className="text-xl font-bold text-gray-900 cursor-pointer">NEJ</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="referralId" className="text-lg font-black text-gray-900 mb-4 block">
                  REFERRAL ID (FRIVILLIGT)
                </Label>
                <Input
                  id="referralId"
                  placeholder="Ange referral ID om du har ett"
                  value={formData.referralId}
                  onChange={(e) => setFormData({...formData, referralId: e.target.value})}
                  className="h-16 text-lg font-semibold rounded-2xl border-3 border-gray-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-200 transition-all duration-300 bg-white text-gray-900 placeholder:text-gray-500"
                />
                <p className="text-base text-gray-700 mt-4 leading-relaxed font-semibold">
                  Om någon rekommenderat dig, ange deras referral ID här för eventuell bonus
                </p>
              </div>

              <div className="bg-gradient-to-r from-emerald-50 to-green-50 border-3 border-green-300 rounded-2xl p-6 shadow-lg">
                <div className="flex items-start">
                  <Lock className="w-7 h-7 text-green-600 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-lg font-black text-green-800 mb-3">🔒 TRYGG HANTERING</p>
                    <p className="text-base text-green-700 leading-relaxed font-semibold">
                      Dina uppgifter behandlas enligt GDPR och krypteras säkert. Ingen kreditupplysning görs.
                    </p>
                  </div>
                </div>
              </div>

              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-7 rounded-2xl font-black text-xl shadow-xl transform hover:scale-105 transition-all duration-300 border-0"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-7 h-7 mr-3 animate-spin" />
                    BEARBETAR...
                  </>
                ) : (
                  <>
                    👉 FÅ DITT BESKED NU
                    <ArrowRight className="w-7 h-7 ml-3" />
                  </>
                )}
              </Button>
              
              <div className="text-center">
                <p className="text-base text-gray-700 font-black">
                  ⚡ GENOMSNITTLIG SVARSTID: 2 MINUTER
                </p>
              </div>
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
