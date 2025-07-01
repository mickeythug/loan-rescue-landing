
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle, Shield, Clock, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [currentStep, setCurrentStep] = useState("form");
  const [loanAmount, setLoanAmount] = useState(95000);
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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.firstName || !formData.lastName || !formData.personalNumber || 
        !formData.email || !formData.phone || !formData.income || !formData.hasDebts) {
      toast({
        title: "Vänligen fyll i alla fält",
        description: "Alla fält måste fyllas i för att få ett preliminärt besked.",
        variant: "destructive"
      });
      return;
    }

    // Calculate loan amount based on income
    const income = parseInt(formData.income);
    const calculatedAmount = Math.min(Math.max(income * 3, 30000), 200000);
    setLoanAmount(calculatedAmount);
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Du kan preliminärt beviljas:
              </h1>
              <div className="text-5xl font-bold text-blue-600 mb-4">
                {loanAmount.toLocaleString('sv-SE')} kr
              </div>
              <p className="text-lg text-slate-600 mb-6">
                Detta är en uppskattning baserad på dina uppgifter.<br />
                Vill du gå vidare och få hjälp att säkra lånet?
              </p>
            </div>
            <Button 
              onClick={handleContinue}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-semibold"
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-blue-600" />
              </div>
              <h1 className="text-3xl font-bold text-slate-900 mb-4">
                Tack för din förfrågan!
              </h1>
              <p className="text-lg text-slate-600 mb-6">
                En av våra lånespecialister kommer att kontakta dig inom kort.<br />
                Vi har fått dina uppgifter och behandlar dem nu konfidentiellt.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 font-medium">
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
      <section className="relative h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            VILL DU HA ETT PRIVATLÅN – MEN BLIR ALLTID NEKAD?
          </h1>
          <p className="text-xl md:text-2xl mb-8 leading-relaxed">
            Vi hjälper dig att få lån beviljat. Inget krav på kreditvärdighet.<br />
            Inga kreditupplysningar. Inget bindande.
          </p>
          <Button 
            onClick={scrollToForm}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-xl font-semibold transition-all duration-300 hover:scale-105"
          >
            👉 FÅ DITT BESKED NU
          </Button>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Inga kreditupplysningar</h3>
              <p className="text-gray-600">
                Ditt besked påverkar inte din kreditvärdighet.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Fungerar även med skulder</h3>
              <p className="text-gray-600">
                Vi hjälper även dig som har betalningsanmärkningar.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Svar direkt – gratis</h3>
              <p className="text-gray-600">
                Du får veta direkt hur mycket du kan få beviljat.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Personlig rådgivning</h3>
              <p className="text-gray-600">
                Våra experter kontaktar dig om du vill gå vidare.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Så fungerar det – enkelt, snabbt och tryggt
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="relative">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">Fyll i dina uppgifter</h3>
              <p className="text-gray-600">
                Namn, personnummer, inkomst etc.
              </p>
            </div>
            <div className="relative">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">Få besked direkt</h3>
              <p className="text-gray-600">
                Inga register kontrolleras, bara baserat på dina siffror.
              </p>
            </div>
            <div className="relative">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">Vi kontaktar dig</h3>
              <p className="text-gray-600">
                Om du vill gå vidare hjälper vi dig säkra lånet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Loan Form Section */}
      <section id="loan-form" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto shadow-xl">
            <CardContent className="p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
                Få ditt preliminära lånebesked
              </h2>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Förnamn</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Efternamn</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="mt-1"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="personalNumber">Personnummer</Label>
                  <Input
                    id="personalNumber"
                    placeholder="YYYYMMDD-XXXX"
                    value={formData.personalNumber}
                    onChange={(e) => setFormData({...formData, personalNumber: e.target.value})}
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">E-postadress</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Mobilnummer</Label>
                  <Input
                    id="phone"
                    placeholder="07X-XXX XX XX"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="income">Årsinkomst före skatt (kr)</Label>
                  <Input
                    id="income"
                    type="number"
                    placeholder="250000"
                    value={formData.income}
                    onChange={(e) => setFormData({...formData, income: e.target.value})}
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label className="text-base font-medium">Har du skulder hos Kronofogden?</Label>
                  <RadioGroup
                    value={formData.hasDebts}
                    onValueChange={(value) => setFormData({...formData, hasDebts: value})}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="debts-yes" />
                      <Label htmlFor="debts-yes">Ja</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="debts-no" />
                      <Label htmlFor="debts-no">Nej</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm text-green-800">
                  <p>
                    <strong>🔒 Trygg hantering:</strong> Dina uppgifter behandlas enligt GDPR. 
                    Ingen kreditupplysning görs.
                  </p>
                </div>

                <Button 
                  type="submit"
                  size="lg"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg font-semibold"
                >
                  👉 VISA HUR MYCKET JAG KAN FÅ
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
