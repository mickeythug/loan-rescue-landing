
import { Shield, Users, Clock, Award, CheckCircle, Phone, Mail, MapPin, TrendingUp, Lock, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import BankIDLogin from "@/components/BankIDLogin";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                BEVILJAD
              </Link>
            </div>
            
            <div className="flex items-center space-x-6">
              <nav className="hidden md:flex space-x-8">
                <Link to="/" className="text-gray-300 hover:text-blue-400 font-medium transition-colors duration-200">
                  Hem
                </Link>
                <a href="#" className="text-gray-300 hover:text-blue-400 font-medium transition-colors duration-200">
                  Lån
                </a>
                <Link to="/om-oss" className="text-blue-400 font-medium">
                  Om oss
                </Link>
                <a href="#" className="text-gray-300 hover:text-blue-400 font-medium transition-colors duration-200">
                  Kontakt
                </a>
              </nav>
              
              <div className="flex items-center space-x-3">
                <BankIDLogin />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white pt-16">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 container mx-auto px-4 py-16 sm:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Vi är BEVILJAD
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-8 leading-relaxed max-w-3xl mx-auto">
              Sveriges mest pålitliga låneförmedlare med över 15 års erfarenhet av att hjälpa människor få rätt lån
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm sm:text-base">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Över 50 000 nöjda kunder</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Auktoriserad låneförmedlare</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>GDPR-certifierad</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-900">
              Vår Mission
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 mb-12 leading-relaxed">
              På BEVILJAD tror vi att alla förtjänar tillgång till rättvis finansiering. Vi har gjort det enkelt, 
              transparent och snabbt att få ett lån - utan krångel, dolda avgifter eller långa väntetider.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Heart className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Transparens</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Inga dolda avgifter eller överraskningar. Vi visar alltid exakt vad ditt lån kostar från början.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Shield className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Trygghet</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Dina personuppgifter är skyddade med banknivå säkerhet och hanteras enligt GDPR.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Clock className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Snabbhet</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Få svar direkt utan UC-kontroll och få ditt lån utbetalt samma dag som du godkänner.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-900">
                Så fungerar det
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Vi har utvecklat en unik process som gör det enkelt och snabbt för dig att få det lån du behöver
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Ansök enkelt</h3>
                <p className="text-gray-600 leading-relaxed">
                  Fyll i vårt enkla formulär med grundläggande information. Tar mindre än 2 minuter.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Direkt bedömning</h3>
                <p className="text-gray-600 leading-relaxed">
                  Vårt system gör en snabb bedömning utan UC-kontroll och ger dig ett preliminärt svar direkt.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Personlig rådgivning</h3>
                <p className="text-gray-600 leading-relaxed">
                  En av våra lånespecialister kontaktar dig för att hitta det bästa lånet för just din situation.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  4
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Snabb utbetalning</h3>
                <p className="text-gray-600 leading-relaxed">
                  När du godkänt lånet får du pengarna utbetalda till ditt konto samma dag.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-12">
              Siffror som talar för sig själva
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <div className="text-4xl sm:text-5xl font-bold mb-2">50,000+</div>
                <p className="text-blue-100">Nöjda kunder</p>
              </div>
              <div>
                <div className="text-4xl sm:text-5xl font-bold mb-2">15+</div>
                <p className="text-blue-100">År i branschen</p>
              </div>
              <div>
                <div className="text-4xl sm:text-5xl font-bold mb-2">2.4B</div>
                <p className="text-blue-100">SEK utlånat</p>
              </div>
              <div>
                <div className="text-4xl sm:text-5xl font-bold mb-2">98%</div>
                <p className="text-blue-100">Kundnöjdhet</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-900">
                Våra tjänster
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Vi erbjuder ett brett utbud av lånprodukter för att möta alla dina finansiella behov
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <CardTitle className="text-xl">Privatlån</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Flexibla privatlån för alla dina behov - från semester till hemrenovering.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>10 000 - 600 000 kr</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>1-15 års löptid</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Konkurrenskraftiga räntor</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">Billån</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Finansiera ditt nästa fordon med våra förmånliga billån.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Nya och begagnade bilar</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Upp till 85% finansiering</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Snabb handläggning</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <Award className="w-6 h-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl">Bolån</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Gör drömmen om eget boende till verklighet med våra bolån.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Första hem och ny belåning</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Rörlig och fast ränta</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Personlig rådgivning</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-900">
              Din säkerhet är vår prioritet
            </h2>
            <p className="text-lg text-gray-700 mb-12 leading-relaxed">
              Vi använder samma säkerhetsteknologi som banker för att skydda dina personuppgifter
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Lock className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">SSL-kryptering</h3>
                <p className="text-gray-600 leading-relaxed">
                  All data överförs med 256-bitars SSL-kryptering, samma standard som banker använder.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">GDPR-certifierad</h3>
                <p className="text-gray-600 leading-relaxed">
                  Vi följer alla GDPR-regler och ger dig full kontroll över dina personuppgifter.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Auktoriserad</h3>
                <p className="text-gray-600 leading-relaxed">
                  Vi är en auktoriserad låneförmedlare under Finansinspektionens tillsyn.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-900">
                Kontakta oss
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Vi finns här för att hjälpa dig. Tveka inte att höra av dig om du har frågor.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Phone className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Telefon</h3>
                  <p className="text-gray-600 mb-4">Vardagar 08:00-18:00</p>
                  <p className="text-blue-600 font-semibold text-lg">08-123 456 78</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Mail className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">E-post</h3>
                  <p className="text-gray-600 mb-4">Svarar inom 24 timmar</p>
                  <p className="text-green-600 font-semibold">info@beviljad.se</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MapPin className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Kontor</h3>
                  <p className="text-gray-600 mb-2">Stureplan 15</p>
                  <p className="text-gray-600">114 35 Stockholm</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-8">
              Redo att ansöka om ditt lån?
            </h2>
            <p className="text-lg mb-8 text-blue-100 leading-relaxed">
              Det tar bara 2 minuter att få reda på hur mycket du kan låna. Ingen UC-kontroll, inga dolda avgifter.
            </p>
            <Link to="/">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                💰 Ta reda på hur mycket du kan låna NU.
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
