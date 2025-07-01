
import { MessageCircle, Mail, Clock, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ContactSection = () => {
  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-slate-900 text-white">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 px-2">
            Kontakta oss
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto px-2 leading-relaxed">
            Vi är här för att hjälpa dig. Kontakta oss på det sätt som passar dig bäst.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
          <Card className="bg-slate-800 border-slate-700 transition-colors duration-300">
            <CardContent className="p-3 sm:p-4 text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-500 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-sm sm:text-base font-semibold mb-1 sm:mb-2 text-white">Live Chat</h3>
              <p className="text-gray-400 text-xs sm:text-sm">Inte tillgängligt</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700 transition-colors duration-300">
            <CardContent className="p-3 sm:p-4 text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-sm sm:text-base font-semibold mb-1 sm:mb-2 text-white">E-post</h3>
              <p className="text-green-400 font-medium text-xs sm:text-sm break-all">info@beviljad.se</p>
              <p className="text-slate-400 text-xs mt-1">Svar inom 2 timmar</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700 transition-colors duration-300">
            <CardContent className="p-3 sm:p-4 text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-sm sm:text-base font-semibold mb-1 sm:mb-2 text-white">Öppettider</h3>
              <p className="text-purple-400 font-medium text-xs sm:text-sm">Mån-Fre 8-17</p>
              <p className="text-slate-400 text-xs mt-1">Lördag 9-14</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700 transition-colors duration-300">
            <CardContent className="p-3 sm:p-4 text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-sm sm:text-base font-semibold mb-1 sm:mb-2 text-white">Adress</h3>
              <p className="text-orange-400 font-medium text-xs sm:text-sm">Sveavägen 9</p>
              <p className="text-slate-400 text-xs">Hötorgsskrapa 3</p>
              <p className="text-slate-400 text-xs mt-1">Stockholm, City</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center mt-8">
          <p className="text-lg font-semibold text-white">Beviljad</p>
          <p className="text-sm text-slate-400">Din partner för privatlån</p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
