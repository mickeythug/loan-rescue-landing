
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CheckCircle, Shield, Users, Award, TrendingUp, Clock, Handshake, Building2, Globe, Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#contact') {
      const contactSection = document.getElementById('contact-section');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              BEVILJAD
            </Link>
            <div className="flex space-x-6">
              <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Hem
              </Link>
              <Link to="/om-oss" className="text-blue-600 font-medium">
                Om oss
              </Link>
              <Link to="/#loan-form" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Lån
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Om BEVILJAD
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
            Din partner för att få lån beviljade genom expertis och bankkontakter
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white">
        {/* Vad vi gör */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
              Vad vi gör
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-gray-900">
                  Vi är din låneförmedlare
                </h3>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  BEVILJAD är ett expertteam som hjälper människor att få lån beviljade genom att göra ansökningarna åt dem på korrekt sätt. Vi har rätt kontakter och expertis för att maximera dina chanser att få det lån du behöver.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Vi är ingen bank - vi jobbar MED bankerna som din representant och förespråkare.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="font-bold text-blue-900 mb-3">Så här fungerar det:</h4>
                  <ul className="space-y-2 text-blue-800">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-2 mt-0.5 text-blue-600" />
                      <span>Vi kollar först vad du preliminärt kan få utlånat</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-2 mt-0.5 text-blue-600" />
                      <span>Om du är nöjd med beloppet påbörjar vi processen</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-2 mt-0.5 text-blue-600" />
                      <span>Vi sköter alla kontakter med bankerna åt dig</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-0 shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Handshake className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">Expertis</h4>
                    <p className="text-sm text-gray-600">Professionell rådgivning</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-0 shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Building2 className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">Bankkontakter</h4>
                    <p className="text-sm text-gray-600">Direkta kontakter</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-0 shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">Säkerhet</h4>
                    <p className="text-sm text-gray-600">Trygg hantering</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-0 shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Clock className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">Snabbhet</h4>
                    <p className="text-sm text-gray-600">Effektiv process</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Våra fördelar */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
              Varför välja BEVILJAD?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Expertteam</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Vårt erfarna team av lånespecialister har djup kunskap om bankernas krav och processer.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <TrendingUp className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Högre chanser</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Med rätt kontakter och expertis ökar vi dina chanser att få lån beviljat avsevärt.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Globe className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Omfattande nätverk</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Vi har etablerade relationer med flera banker och finansinstitut i Sverige.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Processen */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
              Så går processen till
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  1
                </div>
                <h3 className="text-lg font-bold mb-3 text-gray-900">Första kontakten</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Du fyller i vårt formulär och vi gör en preliminär bedömning av dina lånemöjligheter.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  2
                </div>
                <h3 className="text-lg font-bold mb-3 text-gray-900">Konsultation</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Vi går igenom din situation och föreslår den bästa strategin för att få lån beviljat.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  3
                </div>
                <h3 className="text-lg font-bold mb-3 text-gray-900">Ansökningsprocess</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Vi förbereder och skickar in ansökan till våra bankkontakter på dina vägnar.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  4
                </div>
                <h3 className="text-lg font-bold mb-3 text-gray-900">Beviljat lån</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Vi följer upp processen tills du får ditt lån beviljat och pengarna utbetalda.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Statistik */}
        <section className="py-16 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">Våra resultat talar för sig</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">95%</div>
                <p className="text-lg text-blue-100">Godkännande-procent</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">10,000+</div>
                <p className="text-lg text-blue-100">Nöjda kunder</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">24h</div>
                <p className="text-lg text-blue-100">Genomsnittlig svarstid</p>
              </div>
            </div>
          </div>
        </section>

        {/* Kontakta våra experter */}
        <section id="contact-section" className="py-16 px-6 bg-slate-900 text-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Kontakta våra experter
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed">
                Redo att ta nästa steg? Våra låneexperter finns här för att hjälpa dig.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2 text-white">E-post</h3>
                  <p className="text-green-400 font-medium">info@beviljad.se</p>
                  <p className="text-slate-400 text-sm mt-1">Svar inom 2 timmar</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2 text-white">Telefon</h3>
                  <p className="text-blue-400 font-medium">08-123 45 67</p>
                  <p className="text-slate-400 text-sm mt-1">Vardagar 8-17</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2 text-white">Öppettider</h3>
                  <p className="text-purple-400 font-medium">Mån-Fre 8-17</p>
                  <p className="text-slate-400 text-sm mt-1">Lördag 9-14</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2 text-white">Adress</h3>
                  <p className="text-orange-400 font-medium">Sveavägen 9</p>
                  <p className="text-slate-400 text-sm">Stockholm, City</p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Link to="/#loan-form">
                <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg">
                  Starta din låneansökan nu
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
