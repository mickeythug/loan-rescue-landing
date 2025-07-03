
import { Users, Activity, FileCheck, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface StatsCardsProps {
  stats: {
    totalVisitors: number;
    activeUsers: number;
    formsCompleted: number;
    conversionRate: number;
  };
}

export const StatsCards = ({ stats }: StatsCardsProps) => {
  const cards = [
    {
      title: "Totala Besökare",
      value: stats.totalVisitors.toLocaleString(),
      icon: Users,
      change: "+12%",
      changeType: "positive" as const,
    },
    {
      title: "Aktiva Användare",
      value: stats.activeUsers.toString(),
      icon: Activity,
      change: "+5%",
      changeType: "positive" as const,
    },
    {
      title: "Formulär Slutförda",
      value: stats.formsCompleted.toString(),
      icon: FileCheck,
      change: "+8%",
      changeType: "positive" as const,
    },
    {
      title: "Konverteringsgrad",
      value: `${stats.conversionRate}%`,
      icon: TrendingUp,
      change: "+2.1%",
      changeType: "positive" as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {card.title}
            </CardTitle>
            <card.icon className="h-5 w-5 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{card.value}</div>
            <p className="text-xs text-green-600 mt-1">
              {card.change} från förra månaden
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
