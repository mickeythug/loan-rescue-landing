
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Search, Check, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SWEDISH_BANKS = [
  "Handelsbanken",
  "Swedbank",
  "SEB",
  "Nordea",
  "Danske Bank",
  "ICA Banken",
  "Länsförsäkringar Bank",
  "SBAB",
  "Avanza Bank",
  "Nordnet Bank",
  "Skandiabanken",
  "Marginalen Bank",
  "Resurs Bank",
  "Bluestep Bank",
  "Collector Bank",
  "Erik Penser Bank",
  "Forex Bank",
  "JAK Medlemsbank",
  "Klarna Bank",
  "Lendify",
  "Mercedes-Benz Financial Services",
  "Multitude Bank",
  "Northmill Bank",
  "Qliro AB",
  "Santander Consumer Bank",
  "Sparbanken Syd",
  "TF Bank",
  "Toyota Kreditbank",
  "Volvo Personvagnar",
  "Wasa Kredit",
  "Ålandsbanken",
  "Entercard Group",
  "Ikano Bank",
  "Komplett Bank",
  "Lunar Bank",
  "PayEx",
  "Svea Bank",
  "BNP Paribas Personal Finance",
  "Carnegie Investment Bank",
  "Catella Bank",
  "HQ Bank",
  "Pareto Bank",
  "Sparbanken Alingsås",
  "Sparbanken Lidköping",
  "Sparbanken Rekarne",
  "Sparbanken Skåne",
  "Sparbanken Öresund",
  "Sparbankerna i Småland",
  "Annan bank"
];

interface BankSelectorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const BankSelector = ({ value, onChange, error }: BankSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredBanks = SWEDISH_BANKS.filter(bank =>
    bank.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Label className="text-sm font-semibold text-gray-900 mb-2 block uppercase tracking-wide">
        Välj din bank
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={`h-12 text-base font-medium rounded-xl border-2 transition-all duration-300 bg-white text-gray-900 ${
          error 
            ? 'border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-200' 
            : 'border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200'
        }`}>
          <SelectValue placeholder="Välj din bank" />
        </SelectTrigger>
        <SelectContent className="max-h-60 bg-white border-2 border-gray-200 rounded-xl shadow-xl z-50">
          <div className="p-3 sticky top-0 bg-white border-b border-gray-200 z-10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Sök bank..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-10 text-sm border-gray-300 rounded-lg bg-white"
              />
            </div>
          </div>
          <div className="max-h-48 overflow-y-auto bg-white">
            {filteredBanks.map((bank) => (
              <SelectItem 
                key={bank} 
                value={bank}
                className="text-base py-3 px-4 hover:bg-blue-50 cursor-pointer bg-white border-0"
              >
                {bank}
              </SelectItem>
            ))}
          </div>
        </SelectContent>
      </Select>
      {error && (
        <div className="flex items-center mt-2 text-red-700 text-sm font-medium">
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default BankSelector;
