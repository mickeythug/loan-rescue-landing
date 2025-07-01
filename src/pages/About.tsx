
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
              Sveriges ledande låneförmedlare som hjälper dig få lån beviljat genom expertis och rätta kontakter
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm sm:text-base">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Över 50 000 beviljade lån</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Samarbetar med alla banker</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>15 års branschexpertis</span>
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
              Vad vi gör
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 mb-12 leading-relaxed">
              BEVILJAD är ett expertteam som hjälper människor få lån beviljade genom att göra ansökningarna åt dem på korrekt sätt. 
              Vi har rätt kontakter och expertis för att maximera dina chanser att få lån godkänt hos bankerna.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <TrendingUp className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Expertis</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Vi vet exakt hur varje bank arbetar och vilken information de kräver för att bevilja lån.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Kontakter</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Vi har direktkontakt med alla stora banker och kreditinstitut i Sverige.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Shield className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Framgång</h3>
                  <p className="text-gray-600 leading-relaxed">
                    98% av våra kunder får lån beviljat tack vare vår expertis och metodik.
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
                Så hjälper vi dig få lån beviljat
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Vi har utvecklat en beprövad process som maximerar dina chanser att få lån godkänt
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Preliminär bedömning</h3>
                <p className="text-gray-600 leading-relaxed">
                  Vi kollar först vad du preliminärt kan få för lånebelopp baserat på din situation.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Bekräftelse</h3>
                <p className="text-gray-600 leading-relaxed">
                  Om du är nöjd med det preliminära beloppet påbörjar vi processen för att säkra ditt lån.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Professionell ansökan</h3>
                <p className="text-gray-600 leading-relaxed">
                  Vi gör ansökan åt dig på korrekt sätt med rätt information till rätt bank.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  4
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Beviljat lån</h3>
                <p className="text-gray-600 leading-relaxed">
                  Tack vare vår expertis och kontakter får du ditt lån beviljat och utbetalt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-900">
              Varför välja BEVILJAD?
            </h2>
            <p className="text-lg text-gray-700 mb-12 leading-relaxed">
              Vi är inte en bank - vi är experter som arbetar med bankerna för att få ditt lån beviljat
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <Award className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Branschexpertis</h3>
                  <p className="text-gray-600 leading-relaxed">
                    15 års erfarenhet av att hjälpa människor få lån beviljade. Vi vet vilka banker som säger ja till vilka profiler.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Bankkontakter</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Vi samarbetar med alla större banker och kreditinstitut och vet exakt hur de arbetar.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                    <Heart className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Personlig service</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Vi behandlar varje kund individuellt och skräddarsyr ansökan för att maximera chanserna.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Hög framgångsgrad</h3>
                  <p className="text-gray-600 leading-relaxed">
                    98% av våra kunder får lån beviljat tack vare vår expertis och rätta kontakter.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-12">
              Våra resultat talar för sig själva
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <div className="text-4xl sm:text-5xl font-bold mb-2">50,000+</div>
                <p className="text-blue-100">Beviljade lån</p>
              </div>
              <div>
                <div className="text-4xl sm:text-5xl font-bold mb-2">98%</div>
                <p className="text-blue-100">Framgångsgrad</p>
              </div>
              <div>
                <div className="text-4xl sm:text-5xl font-bold mb-2">15+</div>
                <p className="text-blue-100">År i branschen</p>
              </div>
              <div>
                <div className="text-4xl sm:text-5xl font-bold mb-2">20+</div>
                <p className="text-blue-100">Bankpartners</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-900">
                Låntyper vi hjälper med
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Vi har expertis inom alla typer av lån och vet vilka banker som erbjuder bäst villkor
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
                    Vi hjälper dig få privatlån beviljat för alla dina behov med bästa möjliga villkor.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>10 000 - 600 000 kr</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Konkurrenskraftiga räntor</span>
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
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">Billån</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Vi hittar bästa billånet för dig oavsett om det är ny eller begagnad bil.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Alla bilmärken</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Flexibla återbetalningsvillkor</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Låga månadsavgifter</span>
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
                    Vi hjälper dig navigera bolånemarknaden och få bästa möjliga villkor.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Första bostad och ombelåning</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Bästa räntor på marknaden</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Experthjälp genom hela processen</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-900">
              Vårt expertteam
            </h2>
            <p className="text-lg text-gray-700 mb-12 leading-relaxed">
              Vi är ett team av låneexperter med gedigen branschkunskap och omfattande bankkontakter
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Lånespecialister</h3>
                <p className="text-gray-600 leading-relaxed">
                  Våra lånespecialister har mångårig erfarenhet från banksektorn och vet hur man får lån beviljade.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Kreditrådgivare</h3>
                <p className="text-gray-600 leading-relaxed">
                  Våra kreditrådgivare analyserar din ekonomiska situation och hittar bästa lånealternativet.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Bankrelationer</h3>
                <p className="text-gray-600 leading-relaxed">
                  Vi har direktkontakt med alla banker och kan därför erbjuda dig de bästa villkoren på marknaden.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-900">
                Kontakta våra experter
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Vi finns här för att hjälpa dig få ditt lån beviljat. Kontakta oss idag för en kostnadsfri konsultation.
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
              Redo att få ditt lån beviljat?
            </h2>
            <p className="text-lg mb-8 text-blue-100 leading-relaxed">
              Vi kollar först vad du preliminärt kan få för lånebelopp. Ingen UC-kontroll, inga dolda avgifter.
            </p>
            <Link to="/">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                Ta reda på hur mycket du kan låna NU.
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
