
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Calculator, TrendingUp } from "lucide-react";

interface LoanCalculatorProps {
  onAmountChange?: (amount: number) => void;
}

const LoanCalculator = ({ onAmountChange }: LoanCalculatorProps) => {
  const [income, setIncome] = useState(300000);
  const [expenses, setExpenses] = useState(15000);
  const [existingLoans, setExistingLoans] = useState(0);
  const [loanTerm, setLoanTerm] = useState(60);
  const [calculatedAmount, setCalculatedAmount] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  useEffect(() => {
    // Avancerad lånelogik
    const monthlyIncome = income / 12;
    const availableIncome = monthlyIncome - expenses - existingLoans;
    const maxMonthlyPayment = availableIncome * 0.25; // Max 25% av disponibel inkomst
    
    // Beräkna maximal lånbelopp baserat på ränta (antag 8% årsränta)
    const monthlyRate = 0.08 / 12;
    const maxLoanAmount = maxMonthlyPayment * ((1 - Math.pow(1 + monthlyRate, -loanTerm)) / monthlyRate);
    
    const finalAmount = Math.min(Math.max(maxLoanAmount, 30000), 500000);
    const payment = finalAmount * (monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / (Math.pow(1 + monthlyRate, loanTerm) - 1);
    
    setCalculatedAmount(Math.round(finalAmount));
    setMonthlyPayment(Math.round(payment));
    
    if (onAmountChange) {
      onAmountChange(Math.round(finalAmount));
    }
  }, [income, expenses, existingLoans, loanTerm, onAmountChange]);

  return (
    <Card className="w-full max-w-2xl mx-auto mb-8 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
            <Calculator className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold">Interaktiv Lånekalkylatorer</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Årsinkomst: {income.toLocaleString('sv-SE')} kr</Label>
              <Slider
                value={[income]}
                onValueChange={(value) => setIncome(value[0])}
                max={800000}
                min={200000}
                step={10000}
                className="mt-2"
              />
            </div>

            <div>
              <Label className="text-sm font-medium">Månadskostnader: {expenses.toLocaleString('sv-SE')} kr</Label>
              <Slider
                value={[expenses]}
                onValueChange={(value) => setExpenses(value[0])}
                max={30000}
                min={5000}
                step={1000}
                className="mt-2"
              />
            </div>

            <div>
              <Label className="text-sm font-medium">Befintliga lån (månad): {existingLoans.toLocaleString('sv-SE')} kr</Label>
              <Slider
                value={[existingLoans]}
                onValueChange={(value) => setExistingLoans(value[0])}
                max={10000}
                min={0}
                step={500}
                className="mt-2"
              />
            </div>

            <div>
              <Label className="text-sm font-medium">Lånetid: {loanTerm} månader</Label>
              <Slider
                value={[loanTerm]}
                onValueChange={(value) => setLoanTerm(value[0])}
                max={120}
                min={12}
                step={12}
                className="mt-2"
              />
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-lg">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-sm font-medium text-gray-600">Du kan låna upp till</span>
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {calculatedAmount.toLocaleString('sv-SE')} kr
              </div>
              <div className="text-sm text-gray-600 mb-4">
                Månadskostnad: <span className="font-semibold">{monthlyPayment.toLocaleString('sv-SE')} kr</span>
              </div>
              <div className="text-xs text-gray-500">
                * Baserat på 8% årsränta och {loanTerm} månaders löptid
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoanCalculator;
