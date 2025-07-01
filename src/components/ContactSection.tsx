
import { MessageCircle, Mail, Clock, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ContactSection = () => {
  const handleLiveChat = () => {
    // Här kan du integrera med din live chat-tjänst
    console.log("Starta live chat");
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-slate-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Kontakta oss
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto">
            Vi är här för att hjälpa dig. Kontakta oss på det sätt som passar dig bäst.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <Card className="bg-slate-800 border-slate-700 hover:bg-slate-700 transition-all duration-300 hover:scale-105">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Live Chat</h3>
              <Button 
                onClick={handleLiveChat}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
              >
                Starta Chat
              </Button>
              <p className="text-slate-400 text-sm mt-1">Direktsvar online</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700 hover:bg-slate-700 transition-all duration-300 hover:scale-105">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">E-post</h3>
              <p className="text-green-400 font-medium">info@privatlan.se</p>
              <p className="text-slate-400 text-sm mt-1">Svar inom 2 timmar</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700 hover:bg-slate-700 transition-all duration-300 hover:scale-105">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Öppettider</h3>
              <p className="text-purple-400 font-medium">Mån-Fre 8-17</p>
              <p className="text-slate-400 text-sm mt-1">Lördag 9-14</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700 hover:bg-slate-700 transition-all duration-300 hover:scale-105">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Adress</h3>
              <p className="text-orange-400 font-medium">Drottninggatan 1</p>
              <p className="text-slate-400 text-sm mt-1">111 51 Stockholm</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
